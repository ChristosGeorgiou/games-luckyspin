(function () {
    'use strict';

    angular
        .module('app')
        .factory('GameService', GameService);

    /* @ngInject */
    function GameService(WordsData) {

        var service = {
            _game: {
                _config: {
                    _lines: 6,
                    _cols: 18,
                }
            },
            Init: Init,
            Generate: Generate,
            SplitThePhrase: SplitThePhrase,
        };

        return service;

        function Init(config) {
            service._game._config = angular.extend(service._game._config, confg);
        }

        function Generate() {

            var _phrase = {
                text: WordsData[Math.floor(Math.random() * WordsData.length)],
                lines: _initLines(),
            };

            var _lines = SplitThePhrase(_phrase.text, service._game._config._cols - 2);
            var _col_start_index = Math.round((service._game._config._lines - _lines.length) / 2);

            _lines.forEach(function (line, index) {
                for (var i = 0; i < line.length; i++) {
                    if (line[i] != " ") {
                        _phrase.lines[_col_start_index + index][i + 1] = {
                            char: line[i],
                            visible: false,
                        };
                    }
                }
            });

            return _phrase;
        }

        function _initLines() {
            var _a = [];

            for (var i = 0; i < service._game._config._lines; i++) {
                var _l = []
                for (var j = 0; j < service._game._config._cols; j++) {
                    _l.push(null);
                }
                _a.push(_l);
            }
            return _a;
        }

        function SplitThePhrase(input, len) {

            var i;
            var output = [];
            var lineSoFar = "";
            var temp;
            var words = input.split(' ');
            for (i = 0; i < words.length;) {
                // check if adding this word would exceed the len
                temp = addWordOntoLine(lineSoFar, words[i]);
                if (temp.length > len) {
                    if (lineSoFar.length == 0) {
                        lineSoFar = temp;     // force to put at least one word in each line
                        i++;                  // skip past this word now
                    }
                    output.push(lineSoFar);   // put line into output
                    lineSoFar = "";           // init back to empty
                } else {
                    lineSoFar = temp;         // take the new word
                    i++;                      // skip past this word now
                }
            }
            if (lineSoFar.length > 0) {
                output.push(lineSoFar);
            }
            return (output);
        }

        function addWordOntoLine(line, word) {
            if (line.length != 0) {
                line += " ";
            }
            return (line += word);
        }



    }

} ());
