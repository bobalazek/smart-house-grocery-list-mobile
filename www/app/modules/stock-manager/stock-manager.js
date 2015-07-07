angular
    .module(
        'smartHouseGroceryList.stockManager',
        [
            'ui.router',
        ]
    )
    .config( function($stateProvider) {
        $stateProvider
            .state('stock-manager', {
                url : '/stock-manager',
                templateUrl : 'app/modules/stock-manager/stock-manager.tpl.html',
            })
        ;
    })
    .controller (
        'StockManagerController',
        function StockManagerController($rootScope, $scope) {
            var vm = this;

            return vm;
        }
    )
;
