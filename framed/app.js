var express = require('express');
var app = express();
var http = require('http');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var lev;
var filepath;
var fullfilepath;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "system",
  database: "framed"
});

/** Serving from the same express Server
No cors required */

app.use(express.static('./'));
app.use(bodyParser.json());

con.connect(function(err) {
if (err) throw err;


app.get('/levels/:level_name', printlevel)

// Level i image access --------------------------------- //

function printlevel (request, response) {

      var data = request.params;
      lev = data.level_name;
      console.log(lev);


      var get_link = "select link from ?? limit 2";
      con.query(get_link, [lev], function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      response.send(result);
      });




var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');

    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
       filepath = file.fieldname + '-' + lev + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1] ;
        cb(null, filepath);
       fullfilepath = '/uploads/' + filepath;
       console.log(fullfilepath);
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');

/** API that will upload the files */
app.post('/upload', function(req, res) {
    upload(req,res,function(err){

      // sql query to insert values in table named
      //as leveli where 'i' is the level number

        var store_link = "INSERT INTO ?? VALUES ( NULL, ?)";
        con.query(store_link, [lev,fullfilepath], function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });


      // sql query finish //

        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});

}

});


// ---------------------------------------------------------//
app.listen('3000', function(){
    console.log('running on 3000...');
});
