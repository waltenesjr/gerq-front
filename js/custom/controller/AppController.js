'use strict';

angular.module('app').controller('AppController', ['$scope', '$timeout', '$translate', '$uibModal', '$sce', 'toastr',
    function ($scope, $timeout, $translate, $uibModal, $sce, toastr) {

        $scope.controllerBodyElement = document.querySelector('body');

        //###################### INICIO FUNCOES GENERICAS PARA MENSAGENS ######################
        /**
         * Metodo para mostrar mensagens para o usuario
         *
         * type: success|info|warning|error
         * message: texto do toastr
         * title: titulo do toastr
         */
        $scope.showMessage = function (type, message, title) {

            $timeout(function () {
                if (toastr[type] !== undefined) {
                    toastr[type](message, title);
                }
            }, 400);
        };

        /**
         * Metodo para mostrar mensagem de obrigatoriedade de campos
         */
        $scope.showMessageObrigatoriedade = function () {
            var message = $translate.instant('VALIDACAO.MENSAGEM_M002');
            if (message && message !== "") {
                $scope.showMessage('error', message);
            } else {
                console.log("texto da mensagem de campos obrigatorios nao configurada");
            }
        };

        /**
         * Metodo para mostrar mensagem de campos invalidos
         */
        $scope.showMessageErrorCampoInvalido = function (campo) {
            var message = campo + " ".concat($translate.instant('VALIDACAO.MENSAGEM_M004'));
            if (message && message !== "") {
                $scope.showMessage('error', message);
            } else {
                console.log("texto da mensagem de campos invalidos nao configurada");
            }
        };

        /**
         * Metodo para mostrar mensagem de campos invalidos
         */
        $scope.showMessageError = function (dataError) {
            var message = (dataError) ? dataError : $translate.instant('MSG.MENSAGEM_ERROR');
            if (message && message !== "") {
                $scope.showMessage('error', message);
            } else {
                console.log("texto da mensagem de erros genericos nao configurada");
            }
        };

        /**
         * Metodo para mostrar mensagem de sucesso das operacoes
         */
        $scope.showMessageSuccess = function (dataSuccess) {
            var message;
            if (dataSuccess){
                message = dataSuccess;
            } else {
                message = $translate.instant('MSG.MENSAGEM_M001');
            }
            $scope.showMessage('success', message);
        };

        /**
         * Metodo para mostrar mensagem de alerta
         */
        $scope.showMessageAlert = function (dataAlert) {
            console.log(dataAlert);
            var message = angular.copy(dataAlert);
            if (message && message !== "") {
                $scope.showMessage('warning', message);
            } else {
                console.log("texto da mensagem de alerta nao configurado");
            }
        };
        /**
         * Metodo para mostrar mensagem de exception tratada
         */
        $scope.showMessageTreatedExcept = function (exception) {
            toastr.error($translate.instant(exception.message) + (exception.msgComplemento ? exception.msgComplemento : ''), $translate.instant('MSG.TITULO_EXCECAO_TRATADA'));
        };

        /**
         * Metodo para mostrar mensagem de exception nao tratada unhandled
         */
        $scope.showMessageUnhandledExcept = function (exception) {
            var messageException = null;
            if (exception.ex && exception.ex.message) {
                messageException = exception.ex.message;
            } else if (exception.ex && !exception.ex.message && exception.ex.localizedMessage) {
                messageException = exception.ex.localizedMessage;
            }
            toastr.error($translate.instant(messageException ? messageException : 'MSG.MENSAGEM_ERROR'), $translate.instant('MSG.TITULO_EXCECAO_NAO_TRATADA'));
        };

        /**
         * Metodo para remover toastr quando presente na tela
         */
        $scope.limparMensagemTela = function () {
            toastr.clear();
        };
        //###################### FIM FUNCOES GENERICAS PARA MENSAGENS ######################


        //###################### INICIO FUNCOES GENERICAS DE CONTROLE DAS MODAIS ######################

        /**
         * Metodo padrão de abertura de modais criadas no sistema
         *
         * modalId: id do modal html implementado
         * size: sm|md|lg
         */
        $scope.openModal= function (modalId, size, scope) {

            if(!modalId) {
                console.log('passe o id do html implementado');
                return;
            }

            if (!size){
                size = 'md';
            }

            this.modalInstance = $uibModal.open({
                templateUrl: modalId,
                backdrop : 'static',
                size: size,
                scope: scope
            });
        };

        /**
         * Metodo padrão de confirmação de mensagens
         */
        $scope.openModalConfirm = function (options) {
            var settings = {
                title: $translate.instant('LABEL.CONFIRMACAO'),
                message: $translate.instant('MSG.MENSAGEM_M010'),
                confirmText: $translate.instant('LABEL.CONFIRMAR'),
                cancelText: $translate.instant('LABEL.CANCELAR'),
                callback: function () { }
            };

            angular.extend(settings, options);

            this.modalConfirmInfo = settings;

            this.modalConfirmInstance = $uibModal.open({
                templateUrl: 'dialogTemplateConfimacao.html',
                backdrop : 'static',
                keyboard : false,
                scope: this
            });
        };

        /**
         * Metodo para abrir modal com help da pagina
         */
        var LIMITFIELDHELP = 50;
        $scope.openModalHelp = function (helpPageContentKey) {

            if (helpPageContentKey) {

                var camposPrincipais = [];
                for (var i = 1; i <= LIMITFIELDHELP; i++) {
                    // nomeCampo e descricaoCampo sao obrigatorios, toda pagina de help terá, ao contrario do importanteCampo
                    var nomeCampo = $translate.instant(helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.NOME_CAMPO_').concat(i.toString()));
                    var descricaoCampo = $translate.instant(helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.DESCRICAO_CAMPO_').concat(i.toString()));
                    var importanteCampo = $translate.instant(helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.IMPORTANTE_CAMPO_').concat(i.toString()));

                    if ((nomeCampo !== helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.NOME_CAMPO_').concat(i.toString())
                        || descricaoCampo !== helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.DESCRICAO_CAMPO_').concat(i.toString()))
                        && (nomeCampo && nomeCampo !== '' && descricaoCampo && descricaoCampo !== '')) {

                        if (importanteCampo === helpPageContentKey.concat('.CAMPOS_PRINCIPAIS').concat('.IMPORTANTE_CAMPO_').concat(i.toString())) {
                            camposPrincipais.push({nome: nomeCampo, descricao: descricaoCampo});
                        } else {
                            camposPrincipais.push({
                                nome: nomeCampo,
                                descricao: descricaoCampo,
                                importante: importanteCampo
                            });
                        }

                    } else {
                        break;
                    }
                }

                var settings = {
                    title: $translate.instant('LABEL.HELP_ONLINE'),
                    funcionalidade: $translate.instant(helpPageContentKey.concat('.FUNCIONALIDADE')),
                    objetivo: $translate.instant(helpPageContentKey.concat('.OBJETIVO')),
                    camposPrincipais: camposPrincipais,
                    paragrafoPadraoOne: $translate.instant('HELP.PARAGRAFO_PADRAO_1'),
                    paragrafoPadraoTwo: $translate.instant('HELP.PARAGRAFO_PADRAO_2'),
                    item: {},
                    items: [],
                    callback: function () {
                    }
                };

                this.modalHelpInfo = settings;

                this.modalHelpInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modalHelpTemplate',
                    size: 'lg',
                    scope: this
                });
            }
        };
        //###################### FIM FUNCOES GENERICAS DE CONTROLE DAS MODAIS ######################

        $scope.getSanitizeHtml = function (content, isTranslate) {

            if (isTranslate) {
                return $sce.trustAsHtml($translate.instant(content));
            }

            return $sce.trustAsHtml(content);
        };
    }]);