
//INICIALIZANDO EXPRESS
var express = require("express");
var app = express();
var mongoxlsx = require('mongo-xlsx');
var mongoose = require('mongoose');
const url = "mongodb://me:1234@ds149724.mlab.com:49724/my_data_base";

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function (callback) {
	console.log("Conexao com o banco aberta.");
});

var Schema = mongoose.Schema;

var postoSchema = new Schema({
  cod:  String,
  nome: String,
  regiao:   String,
  endereco:String ,
  telefones: String,
  acolhimento: String,
  farmacia: String,
  position:String
});
mongoose.Promise = global.Promise;
// mongoose.createConnection(url, {
//   useMongoClient: true  
// });

app.get("/Regiao/:id",function(req,res){ 
  var Posto = mongoose.model("Posto",postoSchema);
  Posto.find({regiao: req.params.id},function(err,result){
    if(err)
      console.log(err);
    console.log(result);    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end( JSON.stringify(result));
  }); 
});
  
app.get("/CreateBD/",function(req,res){
  console.log("connected");
  var Posto = mongoose.model("Posto",postoSchema);
  var model = null;
  var ods  = './Base de Postos de Saude.ods';
  
  mongoxlsx.xlsx2MongoData(ods, model, function(err, data) {    
    console.log('start');   
    data[0].forEach(function(element) {
      var posto = new Posto({
        cod: element.Cod,
        nome: element.Nome,
        regiao: element.Regiao,
        endereco: element.Endereco ,
        telefones: element.Telefones,
        acolhimento: element.Acolhimento,
        farmacia: element.Farmacia,
        position: element.Position
      });
      
      posto.save(function (err) {
        if (err) 
          return handleError(err);
        console.log("saved");

      })
    }, this);
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end( JSON.stringify("Created"));
  });
});

app.get("/Lista/",function(req,res){
  var model = null;
  var ods  = './Base de Postos de Saude.ods';
  mongoxlsx.xlsx2MongoData(ods, model, function(err, data) {
    dados = data;
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end( JSON.stringify(data));
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
});

