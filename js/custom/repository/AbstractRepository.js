'use strict';

gerqApp.factory('AbstractRepository', [function() {
    AbstractRepository

    function AbstractRepository(restangular, route) {
        this.restangular = restangular;
        this.route = route;
    }

    AbstractRepository.prototype = {

    };

    AbstractRepository.extend = function (repository) {
        repository.prototype = Object.create(AbstractRepository.prototype);
        repository.prototype.constructor = repository;
    };

    return AbstractRepository;
}]);