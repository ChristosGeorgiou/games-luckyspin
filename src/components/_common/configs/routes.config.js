(function () {
    'use strict';

    angular
        .module('app')
        .config(RoutesConfig);

    /* @ngInject */
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider.state("app", {
            abstract: true,
            templateUrl: 'components/_common/views/layout.html',
            controller: 'AppController',
            controllerAs: 'vm',
        });

        $stateProvider.state("app.main", {
            url: "/",
            templateUrl: 'components/main/main.view.html',
            controllerAs: 'vm',
            controller: 'MainController',
        });

        $stateProvider.state("app.help", {
            url: "/help",
            templateUrl: 'components/help/help.view.html',
        });

        $stateProvider.state("app.game", {
            url: "/game",
            templateUrl: 'components/game/game.view.html',
            controller: 'GameController',
            controllerAs: 'vm',
        });

    }

})();