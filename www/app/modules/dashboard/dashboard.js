angular
    .module(
        'smartHouseGroceryList.dashboard',
        [
            'ui.router',
        ]
    )
    .config( function($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url : '/dashboard',
                templateUrl : 'app/modules/dashboard/dashboard.tpl.html',
            })
        ;
    })
    .controller (
        'DashboardController',
        function DashboardController($rootScope, $scope) {
            var vm = this;

            return vm;
        }
    )
;
