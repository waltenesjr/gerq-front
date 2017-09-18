"use strict";

gerqApp.factory('CategoriaRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function CategoriaRepository() {

            AbstractRepository.call(this, ServiceRestangular, '');

            this.list = function () {
                return ServiceRestangular.one('/categorias').getList();
            };

            this.add = function (categoria) {
                return ServiceRestangular.all('/addCategoria').post(categoria);
            }

            this.edit = function (categoria) {
                return ServiceRestangular.all('/updateCategoria').post(categoria);
            }

            this.delete = function (id) {
                return ServiceRestangular.one('/deleteCategoria', id).remove();
            }
        }

        AbstractRepository.extend(CategoriaRepository);

        return new CategoriaRepository();
    }]);