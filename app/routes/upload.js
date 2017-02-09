var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('upload', { title: 'Report' });
});

router.post('/', function(req, res, next) {
  var sampleFile;
 
  if (!req.files) {
    res.send('No files were uploaded.');
    return;
  }
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('/srv/uploads/'+req.files.sampleFile.name, function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send('File uploaded!');
    }
  });
});

module.exports = router;
