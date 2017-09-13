/**
 * Created by iago on 02/09/2016.
 * * No Controller:
 *   $scope.uploader = new FileUploader({
        autoUpload: false,
        queueLimit: 1,
        url : '/cit-tabelas-corp-web/rest/anexo/uploadAnexo?idDocumento='
    });
 *
 * No html :
 * <componente-associar-documentos ng-documentos="entrada.documentos" ng-edit="edit" ng-uploader="uploader"
 *      ng-workspace="$parent.workspace" form="documentosEntradaForm" ng-obrigatorio="true">
 * </componente-associar-documentos>
 */
angular.module('app').directive("componenteAssociarDocumentos", ["$translate", "FileUploader", "$uibModal", "$filter",
    function ($translate, FileUploader, $uibModal, $filter) {
        return {
            scope: {
                documentos: "=ngDocumentos",
                edit: "=ngEdit",
                form: "=form",
                uploader: "=ngUploader",
                obrigatorio: "=ngObrigatorio",
                labelAlertTooltip: '@',
                onDeleteDocumento: '&ngOnDeleteDocumento',
                onDownloadItem: '&ngOnDownloadItem',
                documentoUnico: "=ngDocumentoUnico",
                tiposDocumento: "=ngTiposDocumento",
                extensoes: "=",
                maxSize: '@'
            },
            replace: true,
            restrict: "E",
            templateUrl: 'node_modules/arq-front/directive/associarDocumentos/associarDocumentos.html',
            controller: ['$scope', function ($scope) {

                if ($scope.uploader && $scope.extensoes && $scope.extensoes.length > 0 && $scope.maxSize) {

                    $scope.extensoesPermitidasLabel = '';
                    var extensoesPermitidas = '|';

                    angular.forEach($scope.extensoes, function (extensao) {
                        extensoesPermitidas = extensoesPermitidas + extensao + '|';

                        // a variavel abaixo está sendo usada para mostrar ao usuario as extensoes permitidas
                        $scope.extensoesPermitidasLabel = $scope.extensoesPermitidasLabel + extensao + ', '
                    });

                    // remover a ultima ',' e adicionar um ponto
                    $scope.extensoesPermitidasLabel = $scope.extensoesPermitidasLabel.substring(0, $scope.extensoesPermitidasLabel.length - 2) + ".";

                    $scope.uploader.filters.push({
                        name: 'enforceExtensionTypeFilter',
                        fn: function (item) {
                            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                            return extensoesPermitidas.indexOf(type) !== -1;
                        }
                    });

                    $scope.uploader.filters.push({
                        name: 'enforceMaxFileSizeFilter',
                        'fn': function (item) {
                            return item.size <= (1048576 * $scope.maxSize);
                        }
                    });
                }

                // Define um 'labelAlertTooltip' caso não tenha definido um
                $scope.labelAlertTooltipCopy = $scope.labelAlertTooltip;
                if ($scope.labelAlertTooltip === undefined) {
                    $scope.labelAlertTooltipCopy = $translate.instant('CORPORATIVO.LABEL.ASSOCIAR_DOCUMENTOS') + ' ' +
                        $translate.instant('LABEL.CAMPO_OBRIGATORIO');
                }

            }],
            link: function ($scope) {

                //FUNCAO PARA ADICIONAR O DOCUMENTO
                $scope.acionarInputFile = function (idInputFile) {
                    document.getElementById(idInputFile).click();
                };

                $scope.inicializarModalDocumentos = function () {
                    $scope.editDocumento = true;
                    $scope.documento = {};
                    $scope.uploader.clearQueue();

                    getScopeBody().openModal('modal-documentos.html', 'md', this);
                };

                $scope.uploader.onCompleteAll = function () {
                    $scope.uploader.clearQueue();
                };

                $scope.uploader.onWhenAddingFileFailed = function (item, filter, options) {
                    if (filter.name === 'enforceExtensionTypeFilter') {
                        getScopeBody().showMessageError($translate.instant('MSG.SELECIONE_ARQUIVO_FORMATO') + $scope.extensoesPermitidasLabel);
                    }

                    if (filter.name === 'enforceMaxFileSizeFilter') {
                        getScopeBody().showMessageError($translate.instant('MSG.SELECIONE_ARQUIVO_TAMANHO') + $scope.maxSize + ' MB.');
                    }
                };

                $scope.salvarAdicionarDocumento = function (formDialogDocumentos) {
                    formDialogDocumentos.$submitted = true;

                    if (formDialogDocumentos.$valid && $scope.uploader.getNotUploadedItems().length > 0) {

                        if ($scope.documentos == undefined || $scope.documentos == null) {
                            $scope.documentos = [];
                        }

                        var doc = {
                            arquivo: null,
                            tipoDocumento: null
                        };

                        doc.arquivo = $scope.uploader.getNotUploadedItems()[0];
                        doc.tipoDocumento = $filter('filter')($scope.tiposDocumento, {id: $scope.documento.tipoDocumento.id})[0];

                        $scope.documentos.unshift(doc);

                        getScopeBody().modalInstance.dismiss('cancel');
                    } else {

                        if (!formDialogDocumentos.$valid) {
                            goFocus("documento.tipoDocumento.id");
                            getScopeBody().showMessageObrigatoriedade();
                        } else if (!$scope.uploader.getNotUploadedItems().length > 0) {
                            getScopeBody().showMessageError($translate.instant("VALIDACAO.MENSAGEM_M0012"));
                        }
                    }
                };

                $scope.removerDocumento = function (documento) {
                    if (documento) {
                        getScopeBody().openModalConfirm({

                            callback: function (retorno) {

                                if (retorno) {
                                    if (documento.id) {

                                        if ($scope.onDeleteDocumento) {
                                            $scope.onDeleteDocumento({documento: documento});
                                        }
                                    }

                                    $scope.documentos.splice(documento.$index, 1);
                                    getScopeBody().showMessageSuccess($translate.instant('MSG.MENSAGEM_M011'));
                                }
                            }
                        });
                    }
                };

                $scope.visualizarDocumento = function (download, documento) {
                    if (documento.id) {

                        if ($scope.onDownloadItem) {
                            $scope.onDownloadItem({donwload: download, idDocFow: documento.idDocFow});
                        }

                    } else {
                        var file = new Blob([documento.arquivo._file], {type: documento.arquivo._file.type});
                        var url = (window.URL || window.webkitURL).createObjectURL(file);

                        if (download) {
                            var anchor = document.createElement("a");
                            anchor.download = documento.arquivo._file.name;
                            anchor.href = url;
                            anchor.click();

                        } else {
                            var popupWindow = window.open(url, '_blank');

                            if (!popupWindow || popupWindow.closed || typeof popupWindow.closed == 'undefined') {
                                $scope.showMessageAlert($translate.instant('MSG.POPUP_BLOQUEADA'));
                            }
                        }
                    }
                };

                $scope.documentosIsEmpty = function () {
                    return ($scope.documentos == undefined || $scope.documentos == null || $scope.documentos.length == 0);
                };

                // remove o anexo que ainda está na dialog e ainda não sofreu o upload
                $scope.removerAnexo = function () {
                    $scope.uploader.clearQueue();
                    limparInputUpload();
                };

                // a função abaixo limpa o input, para resolver o bug, nos casos,
                // onde eu adicionava um arquivo, removia, e queria adicionar novamente, o componente não permitia
                function limparInputUpload() {
                    document.getElementById('uploadArquivos').value = null;
                }
            }
        };
    }]);

