
angular.module('app').factory('TranslateAsyncLoader', ['TranslateService', '$q', function (TranslateService, $q) {

    // retorna loaderFn
    return function (options) {

        var deferred = $q.defer();

        TranslateService.getGlobalTranslate(options.key).then(function (responseGlobalTranslate) {

            if (responseGlobalTranslate && responseGlobalTranslate.plain()) {

                TranslateService.getLocalTranslate(options.key).then(function (responseLocalTranslate) {

                    if (responseLocalTranslate && responseLocalTranslate.plain()) {

                        var mergedTranslate = angular.merge(responseGlobalTranslate.plain(), responseLocalTranslate.plain());

                        // resolve com dados da traducao
                        return deferred.resolve(mergedTranslate);
                    }
                });
            }
        }, function (error) {
            // ou rejeita com a language key
            return deferred.reject(options.key);
            console.error(error);
        });

        return deferred.promise;
    };
}]);