angular
    .module(
        'smartHouseGroceryList.buyMode',
        [
            'ui.router',
            'ngCordova',
            'ionic-datepicker',
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

            vm.product = {
                name: '',
                description: '',
                eanCode: '',
                price: 1.99,
                quantity: 1,
                nonExpiring: false, // We'll probably use this varible ...
                expires: true, // ... and reverse this one on send / save
                timeExpiring: moment().format('YYYY-MM-DD'),
            };

            vm.scan = function() {
                if(IS_DESKTOP) {
                    alert('This functionality does NOT work on desktop!');

                    return false;
                }

                $ionicPlatform.ready( function() {
                    $cordovaBarcodeScanner
                        .scan()
                        .then(
                            function(barcodeData) {
                                // TO-DO: Request on the server and check if the product already exists (to hydrate the data)
                            },
                            function(error) {
                                alert(error);
                            }
                        )
                    ;
                });
            };

            vm.save = function() {

            };

            vm.saveAndNew = function() {

            };

            vm.timeExpiringCallback = function(val) {
                if(typeof(val) === 'undefined') {
                    // Not selected...
                } else {
                    var dateObj = moment(val);
                    vm.product.timeExpiring = dateObj.format('YYYY-MM-DD');
                }
            };

            return vm;
        }
    )
;
