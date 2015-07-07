angular
    .module(
        'smartHouseGroceryList',
        [
            'ionic',
            'smartHouseGroceryList.home',
            'smartHouseGroceryList.dashboard',
            'smartHouseGroceryList.stockManager',
            'smartHouseGroceryList.buyMode',
            'smartHouseGroceryList.trashMode',
        ]
    )
    .constant(
        'API_URL',
        'https://localhost/bitbucket/bobalazek/silex-web-application-boilerplate/web/api/v1' // WITHOUT leading slash!
    )
    .config( function($urlRouterProvider) {
        // Routes
        $urlRouterProvider.otherwise('/');
    })
    .run( function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .controller (
        'ApplicationController',
        function ApplicationController($rootScope, $scope) {
            var vm = this;

            return vm;
        }
    )
;
