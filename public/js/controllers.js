'use strict';

/* Controllers */
function AppCtrl($scope, $routeParams, $location, Sites) {

  $scope.load = function(p){
      prettyPrint();
      var converter = new Showdown.converter();
      var view = document.getElementById('view');
      var editor = ace.edit("editor",{intialContent: 'hello'});
      editor.setReadOnly(true);
      editor.session.setUseWrapMode(true);

      // add Markdown mode, this will eventually be selectable
      var MarkdownScriptMode = require("ace/mode/markdown").Mode;
      var session = editor.getSession();
      session.setMode(new MarkdownScriptMode());
      
      var filename = p.replace(/^.*[\\\/]/, '')
      var connection = sharejs.open(filename, 'text', function(error, doc) {
      if (error) {
        console.log(error);
      } else {

        doc.attach_ace(editor);
        editor.setReadOnly(false);

        if(p === "/" || p === undefined) return;
          Sites.markdown({path: p}, function(data){
            console.log(session);
            session.setValue(data.content);
        });  
        var render = function() {
          view.innerHTML = converter.makeHtml(doc.snapshot);
        };
      }

      window.doc = doc;
        render();
        doc.on('change', render);
      });

      // *** Connection status display
      var status = document.getElementById('status');
      var register = function(state, klass, text) {
        connection.on(state, function() {
        status.className = 'label ' + klass;
        status.innerHTML = text;
        });
      };

      register('ok', 'success', 'Online');
      register('connecting', 'warning', 'Connecting...');
      register('disconnected', 'important', 'Offline');
      register('stopped', 'important', 'Error');

  };

  (function(p){
    $scope.load(p);
  })($location.$$path);

  console.log($location.$$path);

	Sites.get(function(data){
    $scope.name = data.name;
  });

  Sites.content(function(data){
    $scope.content = data.content;
  });
}

function EditCtrl($scope, $route, $routeParams, Sites){
 console.log($route);

}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
