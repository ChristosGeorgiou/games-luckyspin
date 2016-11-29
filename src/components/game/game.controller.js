(function () {
	'use strict';

	angular
		.module('app')
		.controller("GameController", GameController);

	/* @ngInject */
	function GameController($timeout, WordsData, $stateParams, GameService, $interval) {

		var vm = this;

		vm.phrase = GameService.Generate();

		vm.alphabet = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
		vm.disabled = {};

		vm.Refresh = function () {
			vm.phrase = GameService.Generate();
			vm.disabled = {};
		};

		vm.GetLetter = function (_c) {
			vm.disabled[vm.alphabet.indexOf(_c)] = true;
			vm.phrase.lines.forEach(function (line) {
				line.forEach(function (char) {
					if (char && char.char == _c) {
						char.visible = true;
					}
				})
			})
		}
	}


} ());
