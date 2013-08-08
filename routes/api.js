var generator = require('static_site_generator').db;
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
  //change to use getFile
    generator.getFiles({name: req.params.name}, function(files){
      console.log(files);
      if(files.length === 0) {
        res.json({
          content: []
        })
      } else {
        res.json({
          content: files[0].content
        }) 
      }
   
  });
};
