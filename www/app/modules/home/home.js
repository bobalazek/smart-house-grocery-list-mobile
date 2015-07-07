angular
    .module(
        'smartHouseGroceryList.home',
        [
            'ui.router',
        ]
    )
    .config( function($stateProvider) {
        $stateProvider
            .state('home', {
                url : '/',
                templateUrl : 'app/modules/home/home.tpl.html',
            })
        ;
    })
    .controller (
        'HomeController',
        function HomeController($rootScope, $scope) {
            var vm = this;

            return vm;
        }
    )
;
