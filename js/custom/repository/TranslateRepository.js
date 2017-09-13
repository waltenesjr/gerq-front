
'use strict';

angular.module('app').factory('TranslateRepository', ['Restangular', 'AbstractRepository',
    function (restangular, AbstractRepository) {

        function TranslateRepository() {

            AbstractRepository.call(this, restangular, '');

            this.getGlobalTranslate = function (lang) {
                return restangular.one(this.route + 'i18n/' + lang + '/global-locale.json').get();
            };

            this.getLocalTranslate = function (lang) {
                return restangular.one(this.route + 'i18n/' + lang + '/locale.json').get();
            };
        }

        AbstractRepository.extend(TranslateRepository);

        return new TranslateRepository();
    }]);