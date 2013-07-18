
    var editor = ace.edit("editor");

    sharejs.open('hello', 'text', 'http://127.0.0.1:8000', function(doc, error) {
        doc.attach_ace(editor);
    });
