'use strict';

gerqApp.factory('AbstractRepository', [function() {
    AbstractRepository

    function AbstractRepository(restangular, route) {
        this.restangular = restangular;
        this.route = route;
    }

    AbstractRepository.prototype = {
        getList: function (pagination) {
            return this.restangular.all(this.route + '/list').post(pagination);
        },

        get: function (id) {
            return this.restangular.one(this.route + '/get', id).get();
        },

        all: function () {
            return this.restangular.one(this.route + '/all').get();
        },

        save: function (resource) {
            return resource.id ? this.update(resource) : this.create(resource);
        },

        update: function (updatedResource) {
            return this.restangular.all(this.route + '/update').customPUT(updatedResource);
        },

        create: function (newResource) {
            return this.restangular.all(this.route + '/add').post(newResource);
        },

        remove: function (id) {
            return this.restangular.one(this.route + '/delete', id).remove();
        }
    };

    AbstractRepository.extend = function (repository) {
        repository.prototype = Object.create(AbstractRepository.prototype);
        repository.prototype.constructor = repository;
    };

    return AbstractRepository;
}]);