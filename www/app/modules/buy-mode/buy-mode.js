angular
    .module(
        'smartHouseGroceryList.buyMode',
        [
            'ui.router',
            'ngCordova',
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
        function BuyModeController($rootScope, $scope, $ionicPlatform, $cordovaBarcodeScanner, IS_DESKTOP) {
            var vm = this;

            vm.scan = function() {
                if(IS_DESKTOP) {
                    alert('This functionality does NOT work on desktop!')
                    return false;
                }

                $ionicPlatform.ready( function() {
                    $cordovaBarcodeScanner
                        .scan()
                        .then(
                            function(barcodeData) {

                            }, function(error) {
                                alert(error);
                            }
                        )
                    ;
                });
            };

            return vm;
        }
    )
;
