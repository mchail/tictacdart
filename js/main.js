$(document).ready(function() {
	window.TTD = (function() {
		var $boards = $('.board');

		var nums = [];
		for (var i = 1; i <= 20; i++) {
			nums.push(i);
		}
		nums.push('B');

		function ticTac() {
			var shuffled = _.sample(nums, 9);
			return [
				shuffled.slice(0, 3),
				shuffled.slice(3, 6),
				shuffled.slice(6, 9)
			];
		}

		function init() {
			var rawNames = document.cookie.replace(/(?:(?:^|.*;\s*)names\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if (rawNames !== undefined) {
				names = JSON.parse(rawNames);
				$('#p1 .name').text(names[0]);
				$('#p2 .name').text(names[1]);
			}
		}

		function render() {
			var tic = ticTac();
			$boards.empty();
			_.each(tic, function(set, rowIndex) {
				$boards.each(function(index, board) {
					var $board = $(board);
					var $row = $('<div>').addClass('row');
					_.each(set, function(wedge, wedgeIndex) {
						var squareIndex = "" + (rowIndex + 1) + (wedgeIndex + 1);
						$row.append(
							$('<div>').addClass('square').attr('data-index', squareIndex).append(
								$('<div>').addClass('wedge').text(wedge)
							)
						);
					});
					$board.append($row);
				});
			});
		}

		function setupHandlers() {
			$('.player-boards .square').on('click', function() {
				var $square = $(this);
				window.square = $square;
				var score = $square.attr('data-score') || 0;
				score = (parseInt(score) + 1) % 4;
				var player = $square.parents('.board').attr('id').substr(-1, 1);
				var index = $square.data('index');
				var mainSquare = $('#main-board .square[data-index="' + index + '"]');
				if (score === 3) {
					if (mainSquare.data('win') === undefined) {
						mainSquare.attr('data-win', player);
					}
				} else if (score === 0) {
					var otherPlayer = 3 - parseInt(player);
					var otherPlayerSquare = $('#player' + otherPlayer + ' .square[data-index=' + index + ']');
					var otherPlayerScore = otherPlayerSquare.data('score');
					if (otherPlayerScore === 3) {
						mainSquare.attr('data-win', otherPlayer);
					} else {
						mainSquare.removeAttr('data-win');
					}
				}
				$square.attr('data-score', score);
			});

			$('.name').on('blur', function() {
				var names = JSON.stringify(
					_.map(
						$('.name'),
						function(el) {
							return $(el).text()
						}
					)
				);
				document.cookie = "names=" + names;
			});
		}

		return {
			init: init,
			render: render,
			setupHandlers: setupHandlers
		};
	})();
	TTD.init();
	TTD.render();
	TTD.setupHandlers();
});
