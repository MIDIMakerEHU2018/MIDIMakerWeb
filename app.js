const express = require('express');
const multer = require('multer');
const ejs = require ('ejs');
const path = require('path');
const PythonShell = require('python-shell');
const EventEmitter = require('events');
const bodyParser = require("body-parser");

//Global variables
let actualFile = null;
const myEmitter = new EventEmitter();

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('MyFile');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /wav|mp3|m4a/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: solo se permiten ficheros de audio');
  }
}

// Init App
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function (req, res) {
  res.render('index');
});

//Application Route
app.post('/application', function (req, res) {
  res.render('application', {
    etapa: 'subir'
  });
});

// Upload Route
app.post('/upload', function (req, res) {
  upload(req, res, function(err) {
    if(err) {
      res.render('application', {
        err: err,
        etapa: 'subir'
      });
    } else {
      if(req.file == undefined) {
        res.render('application', {
          err: 'Error: no ha seleccionado ningún fichero',
          etapa: 'subir'
        });
      } else {
        let upFile = req.file;
        actualFile = upFile;
        console.log(upFile);
        res.render('application', {
          msg: 'Fichero subido correctamente',
          etapa: 'traducir',
          file: upFile.filename
        });  
      }
    }
  });
});

// Traduce Route
app.post('/traduce', function (req, res) {
  let oldFile = actualFile.filename;
  let extension = path.extname(actualFile.filename);
  let newFile = path.basename(actualFile.filename, extension) + '.mid';
  actualFile = newFile;

  let instrumento = req.body.instrumento

  midimakerpy(oldFile, instrumento);
  
  myEmitter.on('scriptEnd', function() {
    res.render('application', {
      msg: 'Traducción completada',
      etapa: 'bajar',
      file: newFile
    });
  });
});

// Execute Python script
function midimakerpy(wavfile, instrument) {
  console.log("Ejecutando script python");
  var options = {
    pythonPath: '/usr/bin/python3',
    scriptPath: './scripts/midimaker',
    args: [wavfile, instrument]
  };

  PythonShell.run('midimaker.py', options, function (err, results) {
    if(err) throw err
    else {
      console.log("Script end!!!"),
      myEmitter.emit('scriptEnd')
    }
  });
}

// Download Route
app.get('/download', function (req, res) {
  let downFile = './public/downloads/' + actualFile;
  res.download(downFile, function(err) {
    if(err) {
      console.log('Error en la descarga del fichero');
    } else {
      console.log('Fichero descargado correctamente');
    }
  });
});

app.post('/download', function (req, res) {
  res.render('application', {
    etapa: 'finalizar'
  });
});

// Back Home Route
app.get('/home', function (req, res) {
  res.render('index');
});

// Start Server
app.listen(3000, function() {
  console.log('Server started on port 3000...');
})
