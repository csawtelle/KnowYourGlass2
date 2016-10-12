angular.module('app').service('modalService', ['$uibModal',
    function ($uibModal) {
    this.show = function({}, response) {
        var options = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/partials/modal.html',
            controller: 'modalCtrl'
        };

        return $uibModal.open(options);
    };

}]);
