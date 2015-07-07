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
        function BuyModeController($rootScope, $scope, $ionicPlatform, $cordovaBarcodeScanner, $http, $ionicLoading, API_URL, IS_DESKTOP) {
            var vm = this;

            vm.productScanned = false;
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
                                var format = barcodeData.format;

                                if(format == 'EAN_8' || format == 'EAN_13') {
                                    var eanCode = parseInt(barcodeData.text);

                                    vm.product.eanCode = eanCode;

                                    $http
                                        .get(API_URL + '/my/products/' + eanCode + '?byEanCode=true')
                                        .success( function(data, status, headers, config) {
                                            vm.product = data.product;
                                        })
                                        .error( function(data, status, headers, config) {
                                            // No product with this EAN Code found (yet)
                                        })
                                        .finally( function() {

                                        })
                                    ;

                                    vm.productScanned = true;
                                } else {
                                    alert('This is not a EAN Code!');
                                }
                            },
                            function(error) {
                                alert(error);
                            }
                        )
                        .finally( function() {

                        })
                    ;
                });
            };

            vm.save = function() {
                var valid = true;

                vm.product.nonExpiring = ! vm.product.expires;

                // To-Do: Do some validations ...

                if(valid) {
                    $ionicLoading.show({
                        template: 'Loading...',
                    });

                    $http
                        .post(
                            API_URL + '/my/products',
                            vm.product
                        )
                        .success( function(data, status, headers, config) {
                            $ionicPopup.alert({
                                title: 'Product saved',
                                template: 'The product was successfully saved!',
                            });
                        })
                        .error( function(data, status, headers, config) {
                            $ionicPopup.alert({
                                title: 'Saving error',
                                template: 'Whoops, something went wrong! Error: ' + data.error.message,
                            });
                        })
                        .finally( function() {
                            $ionicLoading.hide();
                        })
                    ;
                }
            };

            vm.saveAndNew = function() {
                vm.save();

                vm.productScanned = false;
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
