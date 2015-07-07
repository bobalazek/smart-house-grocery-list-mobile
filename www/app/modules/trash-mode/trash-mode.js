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
        function TrashModeController($rootScope, $scope) {
            var vm = this;

            return vm;
        }
    )
;
