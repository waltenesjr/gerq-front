
'use strict';

angular.module('app').factory('TranslateRepository', ['Restangular',
    function (restangular) {
        function TranslateRepository() {
            this.getGlobalTranslate = function (lang) {
                return restangular.one('i18n/' + lang + '/global-locale.json').get();
            };
            this.getLocalTranslate = function (lang) {
                return restangular.one('i18n/' + lang + '/locale.json').get();
            };
        }
        return new TranslateRepository();
    }]);