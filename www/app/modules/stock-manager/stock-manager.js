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
        function StockManagerController($rootScope, $scope, $http, API_URL) {
            var vm = this;

            vm.products = [];
            vm.productsLoaded = false;
            vm.productsLoading = false;
            vm.productsLoadingError = false;

            vm.loadProducts = function() {
                vm.productsLoaded = false;
                vm.productsLoading = true;
                vm.productsLoadingError = false;

                $http
                    .get(
                        // API_URL + '/my/products'
                        'https://localhost/bitbucket/bobalazek/silex-web-application-boilerplate/web/api/v1' // just some tmp url, so we don't get 404's
                    )
                    .success( function(data, status, headers, config) {
                        // For now, just a placeholder...
                        vm.products = [
                            {
                                id: 1,
                                eanCode: '123456789',
                                name: 'Coca-cola',
                                description: null,
                                price: 1.99,
                                imageUrl: 'https://yt3.ggpht.com/-3o0qMaMvuwc/AAAAAAAAAAI/AAAAAAAAAAA/CycJ2hpRKvA/s900-c-k-no/photo.jpg',
                                quantity: 1,
                                nonExpiring: false,
                                timeCreated: '2015-07-01 15:00',
                                timeExpiring: '2016-07-01 15:00',
                            }
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
