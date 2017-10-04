(function() {
 
 angular.module('app', ['ui.router','ngMap']);
 angular
 .module('app')
 .config(['$stateProvider', '$urlRouterProvider', routeConfig]);
 function routeConfig($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state('Home', {
        url: '/',
        views: {
            'content': {
                templateUrl: 'index.html',
                controller: 'app/SearchController.js',
                controllerAs: 'ct'
            }
        }
    });
    $urlRouterProvider.otherwise('/');
}
})();