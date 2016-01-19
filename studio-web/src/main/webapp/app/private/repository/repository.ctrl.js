angular.module('Repository').controller('RepositoryCtrl', ['$scope', '$http', '$location', '$mdDialog', '$rootScope', 'RepositoryService', function($scope, $http, $location, $mdDialog, $rootScope, RepositoryService) {
    var NEW_REPOSITORY = window.location.origin + '/studio/session/rest/repository/create';
    var CONNECT_REPOSITORY = window.location.origin + '/studio/session/rest/repository/connect';
    var GET_REPOSITORY = window.location.origin + '/studio/session/rest/repository/get';
    var CHECK_CONNECTION_REPOSITORY = window.location.origin + '/studio/session/rest/repository/connectionStatus';
    var REPOSITORIES = window.location.origin + '/studio/session/rest/repository';
    var SUCCESS_MESSAGE = 'Repositório adicionado com sucesso.';
    var REPOSITORY_CONNECT_ACTION = 'CONNECT';
    var REPOSITORY_CREATE_ACTION = 'NEW';

    init();

    var self = this;

    $scope.pageMessage = angular.equals($scope.actionType, REPOSITORY_CREATE_ACTION) ? "Criação de Repositório" : "Adição de Repositório";
    self.connected = connected;

    function connected() {
        return RepositoryService.connectedRepository;
    }

    $scope.setRepository = function(name) {
        RepositoryService.updateConnectedRepository(name);
    };

    $scope.actionButton = function(repository) {
        buttonStateValidation();

        $http.post(CHECK_CONNECTION_REPOSITORY, repository).then(function(response) {
            if (response.data.data) {
                if (angular.equals($scope.actionType, REPOSITORY_CONNECT_ACTION)) {
                    connectRepository(repository);

                } else if (angular.equals($scope.actionType, REPOSITORY_CREATE_ACTION)) {
                    newRepository(repository);
                }
            } else {
                $scope.repositoryForm.host.$setValidity('connection', false);
                $scope.repositoryForm.$setValidity('connection', false);
            }
        });

        buttonStateWaiting();
    };

    $scope.existRepository = function(repository) {
        $http.get(GET_REPOSITORY, {
            params: {
                repositoryName: repository.name
            }
        }).then(function(response) {
            if (!response.data.data) {
                validateExisRepository(true);

            } else {
                validateExisRepository(false);
            }
        });
    };

    function init() {
        $scope.connectedRepository = RepositoryService.connectedRepository;
        getRepositories();

        $scope.actionType = $location.search().actionType;
        buttonStateWaiting();
    }

    function getRepositories() {
    	 $http.get(REPOSITORIES)
         .success(function(data) {
        	 $rootScope.repositories = data;
         })
         .error(function(data) {
             console.log('Erro + ', data)
         });
    }

    function validateExisRepository(valid) {
        $scope.repositoryForm.name.$setValidity('nameInUse', valid);
        $scope.repositoryForm.$setValidity('nameInUse', valid);
    }

    function connectRepository(repository) {
        buttonStateConnection();

        $http.post(CONNECT_REPOSITORY, repository).then(function(response) {
            buttonStateWaiting();

            if (response.data.data) {
                successMessage();
            }
        });
    };

    function newRepository(repository) {
        buttonCreateState();

        $http.post(NEW_REPOSITORY, repository).then(function(response) {
            if (response.data.data) {
            	getRepositories();
                successMessage();
            }
        });
    };

    function buttonStateWaiting() {
        $scope.connectButton = 'Adicionar';
        $scope.isLoading = false;
    };

    function buttonCreateState() {
        $scope.connectButton = 'Criar';
        $scope.isLoading = false;
    };

    function buttonStateValidation() {
        $scope.connectButton = 'Validando ...';
        $scope.isLoading = true;
    };

    function buttonStateConnection() {
        $scope.connectButton = 'Conectando ...';
        $scope.isLoading = true;
    };

    function successMessage() {
        alert = $mdDialog.alert()
            .title('Informação')
            .content(SUCCESS_MESSAGE)
            .ok('ok');

        $mdDialog.show(alert)
            .finally(function() {
                $scope.repository = null;
                $scope.repositoryForm.$setUntouched();
            });
    };

}]);