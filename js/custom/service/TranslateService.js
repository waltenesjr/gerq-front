'use strict';

angular.module('app').service('TranslateService', ['TranslateRepository', function (TranslateRepository) {

    return {
        getGlobalTranslate: function (lang) {
            return TranslateRepository.getGlobalTranslate(lang);
        },

        getLocalTranslate: function (lang) {
            return TranslateRepository.getLocalTranslate(lang);
        }
    };

}]);