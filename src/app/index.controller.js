(function() {
  'use strict';

  angular
    .module('insight-imaging-webapp')
    .controller('IndexController', IndexController);

  /** @ngInject */
  function IndexController($log, $window, firebaseService, mapService, surveySearch) {

    var vm = this;

    vm.authenticate = authenticate;
    vm.register = register;
    vm.deauthenticate = deauthenticate;
    vm.userAuth = firebaseService.auth.$getAuth();
    vm.searchCriteria = "";
    vm.searchMode = "surveyRequester";
    vm.searchSurveys = surveySearch.searchSurveys;

    /**
     * Authenticate a user.
     */
    function authenticate() {
      firebaseService.authenticate(vm.email, vm.password)
        .then(function (userAuth) { vm.userAuth = userAuth; });
    }

    /**
     * Register a user.
     */
    function register() {
      firebaseService.register(vm.email, vm.password)
        .then(function (userAuth) { vm.userAuth = userAuth; });
    }

    /**
     * Deauthenticate a user.
     */
    function deauthenticate() {
      vm.userAuth = firebaseService.deauthenticate();
      $window.location.reload();
    }

  }

})();
