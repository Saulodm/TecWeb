angular.module('app')
.controller('SearchController', ['$scope', 'NgMap', 'GeoCoder', function($scope, NgMap, GeoCoder){
    var listaPostos = [];
    //url base do servidor.
    const urlBase = "http://localhost:3000/";
    //inicializando os combo box.
    $scope.regiaoSelecionada = $scope.postoSelecionado = "0";
    $scope.Regioes = [{cod: 1, nome: "Barreiro"}, {cod: 2, nome: "Centro-Sul"},{cod: 3, nome: "Leste"}, 
                        {cod: 4, nome: "Norte"},{cod: 5, nome: "Nordeste"},{cod: 6, nome: "Norte"},
                        {cod: 7, nome: "Oeste"},{cod: 8, nome: "Pampulha"},{cod: 9, nome: "Venda Nova"}];
    $scope.Postos = [];
    //deixando mapa escondido
    $scope.showMap = false;
    //funcção que retorna um marker novo para colocar no mapa.
    var marker=function(){
      return { nomePosto:"", position:""}
    }
    //função que executa requisição http assincrona.
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

    //função que executa requisição http sincrona. 
    function httpGet(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
       
        xmlHttp.open("GET", theUrl, false); // true for asynchronous 
        xmlHttp.send();
    }
    //função que filtra os postos com base na região selecionada.
    this.getPostos = function(nome){
        $scope.postoSelecionado = "0";
        if($scope.regiaoSelecionada != "0")
        {        
            var regiao = "";
            for(i=0;i< $scope.Regioes.length;i++){
                if($scope.regiaoSelecionada== $scope.Regioes[i].cod){
                    regiao =  $scope.Regioes[i].nome;
                }
            }
            httpGet(urlBase+"Regiao/" + regiao.toUpperCase().replace("-",""),function(res){
                $scope.Postos = JSON.parse(res);
            }) 
        }      
    }
    //função que exibe todos os detalhes de acordo com o posto selecionado.
    this.verDetalhes = function(){
        $scope.Markers = [];
        if(parseInt($scope.postoSelecionado)>1)
        {
            $scope.Zoom = 15;
            $scope.showMap = true;
            $("#map").addClass("map-size");
            angular.forEach($scope.Postos, function(v, k){
                if(v.cod == parseInt($scope.postoSelecionado)) {
                    $scope.detalhesPosto = v;
                    $scope.mostrarDetalhes = true;
                    var novoMarker = marker();
                    novoMarker.nomePosto = v.nome;
                    novoMarker.position = v.position;
                    $scope.Markers.push(novoMarker);                    
                    $scope.Position = v.position;                   
                }
            });
        }else
        {          
            $scope.showMap = true;               
            $("#map").removeClass("map-size");
            $scope.Zoom = 12;  
            $scope.mostrarDetalhes = false;
            angular.forEach($scope.Postos, function(v, k){    
                var novoMarker = marker();
                novoMarker.nomePosto = v.nome;
                novoMarker.position = v.position;
                $scope.Markers.push(novoMarker);                
            });
            $scope.Position = $scope.Markers[0].position;
        }
    }
}]);