
//INICIALIZANDO EXPRESS
var express = require("express");
var fs = require("fs");
var app = express();
var mongoxlsx = require('mongo-xlsx');
var MongoClient = require('mongodb');
const url = "mongodb://me:1234@ds149724.mlab.com:49724/my_data_base";

// var Mongo = MongoClient.MongoClient();

// Mongo.connect(url, function(err, db) {
//   // if (err) throw err;
//   // db.createCollection("postos", function(err, res) {
//   //   if (err) throw err;
//   //   console.log("Collection created!");
//   //   db.close();
//   // });
//   if (err) throw err;
//   console.log("Conectado");
//     console.log(db.getCollection("postos"));
//     var model = null;
//   var ods  = './Base de Postos de Saude.ods';
  
//  // console.log(db);
//   mongoxlsx.xlsx2MongoData(ods, model, function(err, data) {
//     //console.log(data);
//   });
// });
app.get("/Lista/",function(req,res){
  var model = null;
  var ods  = './Base de Postos de Saude.ods';
  mongoxlsx.xlsx2MongoData(ods, model, function(err, data) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end( JSON.stringify(data));
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
});

 