(function () {
	'use strict';

	angular
		.module('app')
		.controller("MainController", MainController);

	/* @ngInject */
	function MainController($state, GameService, WordsData) {

		var vm = this;

		// vm.tests = [GameService.Generate(),GameService.Generate(),GameService.Generate()];

	}


} ());
