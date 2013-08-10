var mongoose = require('mongoose')
var config = require('yaml-config');
var settings = config.readConfig('./config/config.yaml');
console.log(settings.db);
mongoose.connect(settings.db);


 var siteFileSchema = mongoose.Schema({ 	
    name: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    siteID: { type: String, required: true },
    path: { type: String, required: true }
},{ collection: 'siteFiles' });

var SiteFile = mongoose.model('SiteFile', siteFileSchema);

siteFileSchema.virtual('path.full').get(function () {
  return this.path + this.name + '.' + this.type;
});