angular
    .module(
        'smartHouseGroceryList.buyMode',
        [
            'ui.router',
        ]
    )
    .config( function($stateProvider) {
        $stateProvider
            .state('buy-mode', {
                url : '/buy-mode',
                templateUrl : 'app/modules/buy-mode/buy-mode.tpl.html',
            })
        ;
    })
    .controller (
        'BuyModeController',
        function BuyModeController($rootScope, $scope) {
            var vm = this;

            return vm;
        }
    )
;
