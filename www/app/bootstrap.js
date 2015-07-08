angular
    .module(
        'smartHouseGroceryList',
        [
            'ionic',
            'smartHouseGroceryList.home',
            'smartHouseGroceryList.dashboard',
            'smartHouseGroceryList.stockManager',
            'smartHouseGroceryList.buyMode',
            'smartHouseGroceryList.trashMode',
        ]
    )
    .constant(
        'API_URL',
        'https://localhost/bitbucket/bobalazek/silex-web-application-boilerplate/web/api/v1' // WITHOUT leading slash!
    )
    .constant(
        'IS_DESKTOP',
        window.location.protocol !== 'file:'
    )
    .config( function($urlRouterProvider) {
        // Routes
        $urlRouterProvider.otherwise('/');
    })
    .run( function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .controller (
        'ApplicationController',
        function ApplicationController($rootScope, $scope) {
            var vm = this;

            return vm;
        }
    )
    .config( function($httpProvider) {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
        * The workhorse; converts an object to x-www-form-urlencoded serialization.
        * @param {Object} obj
        * @return {String}
        */
        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for(name in obj) {
                value = obj[name];

                if(value instanceof Array) {
                    for(i=0; i<value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object) {
                    for(subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    })
;
