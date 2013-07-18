// Generated by CoffeeScript 1.6.3
var MongoDb, defaultOptions, mongodb;

mongodb = require('mongodb');

defaultOptions = {
  db: 'sharejs',
  hostname: '127.0.0.1',
  port: 27017,
  mongoOptions: {
    auto_reconnect: true
  },
  client: null,
  user: null,
  password: null,
  opsCollectionPerDoc: true
};

module.exports = MongoDb = function(options) {
  var client, k, opsCollectionForDoc, v;
  if (options == null) {
    options = {};
  }
  for (k in defaultOptions) {
    v = defaultOptions[k];
    if (options[k] == null) {
      options[k] = v;
    }
  }
  client = options.client || new mongodb.Db(options.db, new mongodb.Server(options.hostname, options.port, options.mongoOptions), {
    safe: true
  });
  if (options.user && options.password) {
    client.open(function(err, db) {
      if (!err) {
        client = db;
        return client.authenticate(options.user, options.password);
      }
    });
  }
  if (!options.opsCollectionPerDoc) {
    client.collection('ops', function(err, collection) {
      if (err) {
        console.warn("failed to create ops index: " + err);
        return;
      }
      return collection.ensureIndex({
        "_id.doc": 1,
        "_id.v": 1
      }, {
        background: true
      }, function() {});
    });
  }
  opsCollectionForDoc = function(docName) {
    if (options.opsCollectionPerDoc) {
      return 'ops.' + encodeURIComponent(docName).replace(/\./g, '%2E').replace(/-/g, '%2D');
    } else {
      return 'ops';
    }
  };
  this.create = function(docName, data, callback) {
    if (options.opsCollectionPerDoc) {
      if (opsCollectionForDoc(docName).length > 90) {
        return typeof callback === "function" ? callback("Document name too long: " + docName) : void 0;
      }
    }
    return client.collection('docs', function(err, collection) {
      var doc;
      if (err) {
        return typeof callback === "function" ? callback(err) : void 0;
      }
      doc = {
        _id: docName,
        data: data
      };
      return collection.insert(doc, {
        safe: true
      }, function(err, doc) {
        if ((err != null ? err.code : void 0) === 11000) {
          return typeof callback === "function" ? callback("Document already exists") : void 0;
        }
        if (err) {
          console.warn("failed to create new doc: " + err);
        }
        if (err) {
          return typeof callback === "function" ? callback(err) : void 0;
        }
        return typeof callback === "function" ? callback() : void 0;
      });
    });
  };
  this.getOps = function(docName, start, end, callback) {
    if (start === end) {
      callback(null, []);
      return;
    }
    return client.collection(opsCollectionForDoc(docName), function(err, collection) {
      var cursor, query;
      if (err) {
        return typeof callback === "function" ? callback(err) : void 0;
      }
      if (options.opsCollectionPerDoc) {
        query = {
          _id: {
            $gte: start
          }
        };
        if (end) {
          query._id.$lt = end;
        }
        cursor = collection.find(query).sort('_id');
      } else {
        query = {
          '_id.doc': docName,
          '_id.v': {
            $gte: start
          }
        };
        if (end) {
          query['_id.v'].$lt = end;
        }
        cursor = collection.find(query).sort('_id.v');
      }
      return cursor.toArray(function(err, docs) {
        var doc;
        if (err) {
          console.warn("failed to get ops for " + docName + ": " + err);
        }
        if (err) {
          return typeof callback === "function" ? callback(err) : void 0;
        }
        return typeof callback === "function" ? callback(null, (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = docs.length; _i < _len; _i++) {
            doc = docs[_i];
            _results.push(doc.opData);
          }
          return _results;
        })()) : void 0;
      });
    });
  };
  this.writeOp = function(docName, opData, callback) {
    return client.collection(opsCollectionForDoc(docName), function(err, collection) {
      var doc;
      if (err) {
        return typeof callback === "function" ? callback(err) : void 0;
      }
      doc = {
        opData: {
          op: opData.op,
          meta: opData.meta
        }
      };
      if (options.opsCollectionPerDoc) {
        doc._id = opData.v;
      } else {
        doc._id = {
          doc: docName,
          v: opData.v
        };
      }
      return collection.insert(doc, {
        safe: true
      }, function(err, doc) {
        if (err) {
          console.warn("failed to save op " + opData + " for " + docName + ": " + err);
        }
        if (err) {
          return typeof callback === "function" ? callback(err) : void 0;
        }
        return typeof callback === "function" ? callback(null, doc) : void 0;
      });
    });
  };
  this.writeSnapshot = function(docName, data, dbMeta, callback) {
    return client.collection('docs', function(err, collection) {
      var doc;
      if (err) {
        return typeof callback === "function" ? callback(err) : void 0;
      }
      doc = {
        _id: docName,
        data: data
      };
      return collection.update({
        _id: docName
      }, doc, {
        safe: true
      }, function(err, doc) {
        if (err) {
          console.warn("failed to save snapshot for doc " + docName + ": " + err);
        }
        if (err) {
          return typeof callback === "function" ? callback(err) : void 0;
        }
        return typeof callback === "function" ? callback() : void 0;
      });
    });
  };
  this.getSnapshot = function(docName, callback) {
    return client.collection('docs', function(err, collection) {
      if (err) {
        return typeof callback === "function" ? callback(err) : void 0;
      }
      return collection.findOne({
        _id: docName
      }, function(err, doc) {
        if (err) {
          return typeof callback === "function" ? callback(err) : void 0;
        }
        if (doc !== null) {
          return callback(null, doc.data);
        } else {
          return callback("Document does not exist");
        }
      });
    });
  };
  this["delete"] = function(docName, dbMeta, callback) {
    return client.collection('docs', function(err, collection) {
      if (err) {
        return typeof callback === "function" ? callback(err) : void 0;
      }
      return collection.remove({
        _id: docName
      }, {
        safe: true
      }, function(err, count) {
        if (err) {
          return typeof callback === "function" ? callback(err) : void 0;
        }
        if (count === 0) {
          return typeof callback === "function" ? callback("Document does not exist") : void 0;
        } else {
          return client.collection(opsCollectionForDoc(docName), function(err, opsCollection) {
            if (err) {
              return typeof callback === "function" ? callback(err) : void 0;
            }
            if (options.opsCollectionPerDoc) {
              return opsCollection.drop(function(err, reply) {
                if ((err != null ? err.errmsg : void 0) === 'ns not found') {
                  return typeof callback === "function" ? callback(null) : void 0;
                } else {
                  return typeof callback === "function" ? callback(err) : void 0;
                }
              });
            } else {
              return opsCollection.remove({
                '_id.doc': docName
              }, function(err, count) {
                return typeof callback === "function" ? callback(err) : void 0;
              });
            }
          });
        }
      });
    });
  };
  this.close = function() {
    return client.close();
  };
  return this;
};