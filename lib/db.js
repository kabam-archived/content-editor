require( '../models/siteFile' );
SiteFile = require( 'mongoose' ).model( 'SiteFile' );

var dbInterface = function() {

	var getSites = function( opts, next ){
		SiteFile.find({}, {'_id': 0, 'siteID': 1}, function (err, sites){
			if(err) return;
			console.log( sites );
			next( sites );
		});
	};

	//return files in array
	var getFiles = function( opts, next ){
		if(!opts) opts = {};
		SiteFile.find(opts, function (err, files){
			var counter = files.length;
			var returnObject = [];
			files.forEach(function(file) {
				returnObject.push( file );
			});
			next( returnObject );
		});
	};

	var getFile = function( opts, next ){
		if (!opts || Object.keys(opts).length === 0) return;
		SiteFile.findOne(opts, function(err, obj){
			if( err ) return;
			console.log( obj );
			next();
		});		
	};

	var insertFile = function( doc, next ){
		if ( !doc || Object.keys(doc).length === 0 ) return;
		SiteFile.findOne({'name': doc.name, 'type': doc.type, 'path': doc.path}, function(err, file){
			if ( err ) {
				console.log( err.name );
				return;
			}
			if ( !file ){
				console.log( 'Creating file...' );
				doc.save();
			} else {
				console.log( 'File with same name already exists please rename your file' );	
			}
			next();
		});
	};

	var updateFile = function( query, opts, next ){
		if ( !opts || Object.keys(opts).length === 0 ) return;
		SiteFile.update(query,opts, function (err, numberAffected, raw) {
			if ( err ) return handleError(err);
			console.log( 'The number of updated documents was %d', numberAffected );
			console.log( 'The raw response from Mongo was ', raw );
			next();
		});
	};

	var deleteFile = function( query, next ){
		if( !query || Object.keys(query).length === 0 ) return;

	};

	return {

		getSites: getSites,

		getFiles: getFiles,

		getFile: getFile,

		insertFile: insertFile,

		updateFile: updateFile,

		deleteFile: deleteFile

	}
}();

module.exports = dbInterface;
