var generator = require('static_site_generator');
/*
 * Serve JSON to our AngularJS client
 */

/*
* Returns an object containing all sites
*/
exports.name = function (req, res) {
  	generator.getSites({}, function(sites){
  		res.json({
  			name: sites
  		})		
	});
};

exports.content = function (req, res) {
  	generator.getFiles({}, function(files){
  		res.json({
  			content: files
  		})		
	});
};

exports.markdown = function (req, res) {
    generator.getFiles({}, function(files){
      res.json({
        content: files.content
      })    
  });
};
