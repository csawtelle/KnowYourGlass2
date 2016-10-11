angular.module('app').service('modalService', ['$uibModal',
    function ($uibModal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/partials/modal.html'
        };

        this.show = function() {
            return $uibModal.open(modalDefaults).result;
        };

    }]);
