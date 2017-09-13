
'use strict';

angular.module('app').config(['$translateProvider', '$httpProvider', 'blockUIConfig', 'toastrConfig', 'uiDatetimePickerConfig',
    function ($translateProvider, $httpProvider, blockUIConfig, toastrConfig, uiDatetimePickerConfig) {

        //###################### INICIO DA CONFIGURACAO DO BLOQUEIO DA INTERFACE ######################
        blockUIConfig.message = 'Carregando ...';
        blockUIConfig.delay = 100;
        blockUIConfig.template = '<div class=\"block-ui-overlay\"></div><div class=\"block-ui-message-container\" ' +
            'aria-live=\"assertive\" aria-atomic=\"true\"><div class=\"block-ui-message\" ' +
            'ng-class=\"$_blockUiMessageClass\"><img src="node_modules/arq-front/img/loadBlock.gif"> ' +
            '{{ state.message }}</div></div>';
        //###################### FIM DA CONFIGURACAO DO BLOQUEIO DA INTERFACE ######################


        //###################### INICIO DA CONFIGURACAO DAS MENSAGENS ######################
        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: true,
            tapToDismiss: false,
            timeOut: 10000,
            titleClass: 'toast-title',
            toastClass: 'toast',
            preventDuplicates: false,
            preventOpenDuplicates: true,
            maxOpened: 0
        });
        //###################### FIM DA DA CONFIGURACAO DAS MENSAGENS ######################


        //###################### INICIO DA DEFINICAO DO PADRAO DE ANGULAR-TRANSLATE ######################

        // carrega 'pt_BR' no start
        $translateProvider.preferredLanguage('pt_BR');
        // usa factory para carregar a internacionalizacao
        $translateProvider.useLoader('TranslateAsyncLoader');

        // habilita o escaping do HTML
        $translateProvider.useSanitizeValueStrategy('escape');
        //###################### FINAL DA DEFINICAO DO PADRAO DE ANGULAR-TRANSLATE #######################


        //###################### INICIO DA DEFINICAO DO INTERCEPTOR DE REQUESTS HTTP ##################
        $httpProvider.interceptors.push(function ($q, $injector) {
            return {
                responseError: function (rejection) {

                    var controllerBodyElement = document.querySelector('body');

                    if (rejection.status <= 0) {
                        var translation = $injector.get('$translate');
                        angular.element(controllerBodyElement).scope().showMessageError(translation.instant('MSG.MENSAGEM_M007'));
                        return $q.reject(rejection);
                    }

                    if (rejection.data && rejection.data.ex) {

                        if (rejection.data.codigoErro) {

                            console.log(angular.toJson(rejection.data.ex));
                            angular.element(controllerBodyElement).scope().showMessageTreatedExcept(rejection.data.ex);
                        } else {

                            angular.element(controllerBodyElement).scope().showMessageUnhandledExcept(rejection.data);
                        }
                    }

                    console.log('Response received with HTTP error code: ' + rejection.status);
                    return $q.reject(rejection);
                }
            };
        });
        //###################### FIM DA DEFINICAO DO INTERCEPTOR DE REQUESTS HTTP ######################


        //###################### INICIO DA CONFIGURACAO DATE-TIME-PICKER ######################
        angular.extend(uiDatetimePickerConfig, {
            buttonBar: {
                show: true,
                now: {
                    show: true,
                    text: 'Agora',
                    cls: 'btn-sm btn-primary'
                },
                today: {
                    show: false,
                    text: 'Hoje',
                    cls: 'btn-sm btn-primary'
                },
                clear: {
                    show: true,
                    text: 'Limpar',
                    cls: 'btn-sm btn-primary'
                },
                date: {
                    show: false,
                    text: 'Data',
                    cls: 'btn-sm btn-primary'
                },
                time: {
                    show: false,
                    text: 'Hora',
                    cls: 'btn-sm btn-primary'
                },
                close: {
                    show: true,
                    text: 'Fechar',
                    cls: 'btn-sm btn-primary'
                }
            }
        });
        //###################### FIM DA CONFIGURACAO DATE-TIME-PICKER ######################

    }]);
