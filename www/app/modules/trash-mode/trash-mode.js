angular
    .module(
        'smartHouseGroceryList.trashMode',
        [
            'ui.router',
        ]
    )
    .config( function($stateProvider) {
        $stateProvider
            .state('trash-mode', {
                url : '/trash-mode',
                templateUrl : 'app/modules/trash-mode/trash-mode.tpl.html',
            })
        ;
    })
    .controller (
        'TrashModeController',
        function TrashModeController(
            $rootScope, $scope, $cordovaBarcodeScanner, $ionicPopup,
            $state, $http, $ionicLoading, API_URL, IS_DESKTOP
        ) {
            var vm = this;

            vm.product = null; // Here we'll save the data of the scanned / fetched product
            vm.scannedProduct = { // Data of the currently / last scanned product
                eanCode: '',
                quantity: 1,
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

                                    vm.scannedProduct.eanCode = eanCode;

                                    // To-Do: We shall refactor this part. It's goes too deep. It's like inception ...
                                    $http
                                        .get(API_URL + '/my/products/' + eanCode + '?byEanCode=true')
                                        .success( function(data, status, headers, config) {
                                            vm.product = data.product;

                                            var quantityPopup = $ionicPopup.show({
                                                template: '<input type="number" step="1"  ng-model="trasnModeScope.scannedProduct.quantity" />',
                                                title: 'Enter the quantity',
                                                subTitle: 'How much of this product(-s) would you like to remove?',
                                                scope: $scope,
                                                buttons: [
                                                    {
                                                        text: 'Cancel' ,
                                                    },
                                                    {
                                                        text: '<b>Save</b>',
                                                        type: 'button-positive',
                                                        onTap: function(e) {
                                                            var valid = true;

                                                            // To-Do: Check if valid (integer) and quantity

                                                            if(! valid) {
                                                                // To-Do: Throw some invalid error or something ...
                                                                e.preventDefault();
                                                            } else {
                                                                return vm.scannedProduct.quantity;
                                                            }
                                                        },
                                                    },
                                                ]
                                            });

                                            quantityPopup.then( function(quantity) {
                                                $http
                                                    .delete(
                                                        API_URL + '/my/products/' + eanCode + '?byEanCode=true',
                                                        {
                                                            quantity: quantity,
                                                        }
                                                    )
                                                    .success( function(data, status, headers, config) {
                                                        $ionicPopup.alert({
                                                            title: 'Product removed',
                                                            template: 'The product was successfully removed',
                                                        });

                                                        vm.product = null;
                                                        vm.scannedProduct = {
                                                            eanCode: '',
                                                            quantity: 1,
                                                        };
                                                    })
                                                    .error( function(data, status, headers, config) {
                                                        $ionicPopup.alert({
                                                            title: 'Product not removed',
                                                            template: 'Whops, something went wrong. Error' + data.error.message,
                                                        });
                                                    })
                                                    .finally( function() {

                                                    })
                                                ;
                                            });
                                        })
                                        .error( function(data, status, headers, config) {
                                            $ionicPopup.alert({
                                                title: 'Product not found',
                                                template: 'No product was found with this EAN Code!',
                                            });
                                        })
                                        .finally( function() {

                                        })
                                    ;
                                } else {
                                    alert('This is not an EAN Code!');
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

            return vm;
        }
    )
;
