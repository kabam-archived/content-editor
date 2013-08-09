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

exports.saveContent = function(req, res) {
  generator.getFiles({name: req.params.name}, function(files){
      if(files.length === 0) {
        generator.insertFile(req.body, function(){
          console.log('complete');
        })
      } else {
        console.log(req.body.name + req.body.type + req.body.path)
        generator.updateFile({name: req.body.name, type: 'html', path: req.body.path},{content: req.body.content}, function(){
          console.log('complete');
        })
      }  
  });
};
