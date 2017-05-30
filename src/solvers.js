/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});

  var checkSolution = function(rowIndex, board) {
    //base case
    if (board.rows().length === rowIndex) {

      return board.rows();
    } else {

      for (var column = 0; column < board.rows().length; column++) {
        board.togglePiece(rowIndex, column);

        if (!board.hasAnyRooksConflicts()) {
          return checkSolution(rowIndex + 1, board);
        }
        board.togglePiece(rowIndex, column);
      }
    }
  };

  var solution = checkSolution(0, board);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // number of rooks solutions will always be factorial(n)
  result = 1;
  var rookCount = function(n) {
    if (n <= 0 ) {
      return;
    }
    result = result * n;
    rookCount(n - 1);
  };
  rookCount(n);
  return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var solution = undefined; //fixme
  var board = new Board({n: n});

  if (n === 2 || n === 3) {
    return board.rows();
  }

  var checkSolution = function(rowIndex, board) {

    //base case
    if (board.rows().length === rowIndex) {

      return board.rows();
    } else {

      for (var column = 0; column < board.rows().length; column++) {
        board.togglePiece(rowIndex, column);

        if (!board.hasAnyQueensConflicts()) {
          var result = checkSolution(rowIndex + 1, board);

          if (result !== undefined) {
            return result;
          }
        }
        board.togglePiece(rowIndex, column);
      }
    }
  };

  var solution = checkSolution(0, board);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var checkSolution = function(rowIndex) {

    //base case
    if (n === rowIndex) {
      solutionCount++;
      return;
    }

    for (var column = 0; column < n; column++) {
      board.togglePiece(rowIndex, column);

      if (!board.hasAnyQueensConflicts()) {
        checkSolution(rowIndex + 1);
      }

      board.togglePiece(rowIndex, column);
    }
  };

  checkSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};