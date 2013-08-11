var db = require('../lib/db')
/*
 * Serve JSON to our AngularJS client
 */

/*
* Returns an object containing all sites
*/
exports.name = function (req, res) {
  	db.getSites({}, function(sites){
  		res.json({
  			name: sites
  		})		
	});
};

exports.content = function (req, res) {
  	db.getFiles({}, function(files){
  		res.json({
  			content: files
  		})		
	});
};

exports.markdown = function (req, res) {
  //change to use getFile
    db.getFiles({name: req.params.name}, function(files){
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
  db.getFiles({name: req.params.name}, function(files){
      if(files.length === 0) {
        //insert SiteFile
        db.insertFile(req.body, function(){
          console.log('complete');
        })
      } else {
        console.log(req.body.name + req.body.type + req.body.path)
        db.updateFile({name: req.body.name, type: 'html', path: req.body.path},{content: req.body.content}, function(){
          console.log('complete');
        })
      }  
  });
};
