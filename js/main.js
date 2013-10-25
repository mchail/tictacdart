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
				if (score === 3) {
					var player = $square.parents('.board').attr('id').substr(-1, 1);
					var index = $square.data('index');
					var mainSquare = $('#main-board .square[data-index="' + index + '"]');
					window.m = mainSquare;
					if (mainSquare.data('win') === undefined) {
						mainSquare.attr('data-win', player);
					}
				}
				$square.attr('data-score', score);
			});
		}

		return {
			render: render,
			setupHandlers: setupHandlers
		};
	})();
	TTD.render();
	TTD.setupHandlers();
});
