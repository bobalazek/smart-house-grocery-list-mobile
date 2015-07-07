angular
    .module(
        'smartHouseGroceryList.stockManager',
        [
            'ui.router',
            'angularMoment',
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
        function StockManagerController($rootScope, $scope, $http, API_URL) {
            var vm = this;

            vm.products = [];
            vm.productsLoaded = false;
            vm.productsLoading = false;
            vm.productsLoadingError = false;
            vm.search = '';

            vm.loadProducts = function() {
                vm.productsLoaded = false;
                vm.productsLoading = true;
                vm.productsLoadingError = false;

                $http
                    .get(
                        API_URL + '/my/products'
                    )
                    .success( function(data, status, headers, config) {
                        // vm.products = data.products;
                        vm.products = [
                            {
                                id: 1,
                                eanCode: '123456789',
                                name: 'Coca-cola',
                                description: 'The good old cola!',
                                price: 1.99,
                                imageUrl: 'https://yt3.ggpht.com/-3o0qMaMvuwc/AAAAAAAAAAI/AAAAAAAAAAA/CycJ2hpRKvA/s900-c-k-no/photo.jpg',
                                quantity: 1,
                                nonExpiring: false,
                                timeCreated: '2015-07-01 15:00:00',
                                timeExpiring: '2016-07-01 15:00:00',
                            },
                            {
                                id: 2,
                                eanCode: '223456789',
                                name: 'Pepsi',
                                description: null,
                                price: 2.99,
                                imageUrl: 'http://www.bmstores.co.uk/images/hpcProductImage/imgFull/2059-Pepsi-330ml-Can.jpg',
                                quantity: 3,
                                nonExpiring: false,
                                timeCreated: '2015-07-06 15:00:00',
                                timeExpiring: '2015-08-01 15:00:00',
                            },
                        ];
                    })
                    .error( function(data, status, headers, config) {
                        vm.productsLoadingError = 'Whoops, something went wrong!'; // data.error.message;

                    })
                    .finally( function() {
                        vm.productsLoaded = true;
                        vm.productsLoading = false;
                    })
                ;
            };
            vm.loadProducts();

            return vm;
        }
    )
;
