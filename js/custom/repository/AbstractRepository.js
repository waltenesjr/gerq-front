'use strict';

angular.module('app').factory('AbstractRepository', [function () {
    AbstractRepository

    function AbstractRepository(restangular, route) {
        this.restangular = restangular;
        this.route = route;
    }

    AbstractRepository.prototype = {
        getList: function () {
            return this.restangular.all(this.route).getList();
        },
        getListPage: function (params) {
            return this.restangular.all(this.route + '/getPage').post(params);
        },
        get: function (id) {
            return this.restangular.one(this.route, id).get();
        },
        getView: function (id) {
            return this.restangular.one(this.route, id).one(this.route + 'view').get();
        },
        save: function (resource) {
            return resource.id ? this.update(resource) : this.create(resource);
        },
        update: function (updatedResource) {
            return this.restangular.all(this.route + '/update').post(updatedResource);
        },
        create: function (newResource) {
            return this.restangular.all(this.route + '/save').post(newResource);
        },
        remove: function (resource) {
            return this.restangular.one(this.route, resource.id).remove();
        },
        removeAll: function (listIds) {
            return this.restangular.all(this.route + "/removeAll").post(listIds);
        }
    };

    AbstractRepository.extend = function (repository) {
        repository.prototype = Object.create(AbstractRepository.prototype);
        repository.prototype.constructor = repository;
    };

    return AbstractRepository;
}]);