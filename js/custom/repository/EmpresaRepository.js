"use strict";

gerqApp.factory('EmpresaRepository', ['AbstractRepository', 'ServiceRestangular',
    function (AbstractRepository, ServiceRestangular) {

        function EmpresaRepository() {
            AbstractRepository.call(this, ServiceRestangular, '/empresa');

            this.getListSelect = function () {
                return ServiceRestangular.one(this.route + '/getListSelect').get();
            };
        }

        AbstractRepository.extend(EmpresaRepository);

        return new EmpresaRepository();
    }]);