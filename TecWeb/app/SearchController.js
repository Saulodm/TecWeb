angular.module('app')
.controller('SearchController', ['$scope', 'NgMap', 'GeoCoder', function($scope, NgMap, GeoCoder){
    var listaPostos = [];
 
    const urlBase = "http://localhost:8081/";
    $scope.regiaoSelecionada = $scope.postoSelecionado = "0";
    $scope.Regioes = [{cod: 1, nome: "Barreiro"}, {cod: 2, nome: "Centro-Sul"},{cod: 3, nome: "Leste"}, 
                        {cod: 4, nome: "Norte"},{cod: 5, nome: "Nordeste"},{cod: 6, nome: "Norte"},
                        {cod: 7, nome: "Oeste"},{cod: 8, nome: "Pampulha"},{cod: 9, nome: "Venda Nova"}];
    $scope.Postos = [];
    $scope.showMap = false;


    httpGetAsync(urlBase+"Lista/",function(res){
        listaPostos = JSON.parse(res)[0];
    }) 

    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
       
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send();
    }

    this.getPostos = function(nome){
        $scope.postoSelecionado = "0";
        if(listaPostos.length >0)
            
            var result = [];
            var regiao = "";
            for(i=0;i< $scope.Regioes.length;i++){
                if($scope.regiaoSelecionada== $scope.Regioes[i].cod){
                    regiao =  $scope.Regioes[i].nome;
                }
            }
            for(i=0;i<listaPostos.length;i++){
                if(regiao != "" && regiao.toUpperCase().replace("-","")==listaPostos[i].Regiao){
                    result.push(listaPostos[i]);
                }
            }
            $scope.Postos= result;
              
        
    }

    this.verDetalhes = function(){
        angular.forEach($scope.Postos, function(v, k){
            if(v.Cod == parseInt($scope.postoSelecionado)) {
                $scope.detalhesPosto = v;
                $scope.mostrarDetalhes = true;
                $scope.NomePosto = v.Nome;
                $scope.Position = v.Endereco;
                $scope.showMap = true;
            }
        });
    }
}]);