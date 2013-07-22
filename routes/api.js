var generator = require('../static_site_generator');
/*
 * Serve JSON to our AngularJS client
 */

/*
* Returns an object containing all sites
*/
exports.sites = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};