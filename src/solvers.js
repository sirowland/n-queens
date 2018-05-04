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
  var solution = new Board({n: n});
  
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i, j);

      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({n: n});

  var innerFunction = function(startRow) {
    if (startRow === n) {
      solutionCount++;
      return;
    } 

    for (var i = 0; i < n; i++) {
      // i in this case is columnIndex
      // put piece in 
      solution.togglePiece(startRow, i);
      
      // have to check if solution no conflicts BEFORE untoggling
      // checking if no conflicts skip next row right away
      if (!solution.hasAnyRooksConflicts()) {
        // go to next row & perform all the things neccessary
        innerFunction(startRow + 1);
      }
      solution.togglePiece(startRow, i);
      // else if conflict take piece out 
    }
  };

  innerFunction(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   var solution = new Board({n: n});
//   var queenCount = 0;
//   var found = false;

//   if (n < 4 && n > 1) {
//     return solution.rows();
//   } else if (n === 1) {
//     solution.togglePiece(0, 0);
//     return solution.rows();
//   }

//   var innerFunction = function(startRow) {

//     if (startRow === n & queenCount === n) {
//       found = true;
//       return solution.rows();
//     } else if (startRow === n) {
//       console.log('queencount!!!', queenCount);
//       queenCount = 1;
//     }


//     for (var i = 0; i < n; i++) {
//       // put piece in
//       queenCount++;
//       solution.togglePiece(startRow, i);
//       // startRow acts as our queenCount 
//       // have to check if no queen conflict before untoggling
//       // if solution has conflict
//       if (!solution.hasAnyQueensConflicts()) {

//         innerFunction(startRow + 1);
//       } else {
//         queenCount--;
//         solution.togglePiece(startRow, i);
//       } 
//     }

//     innerFunction(startRow + 1);
//   };

//   innerFunction(0);
//   return solution.rows();
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
// };

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({n: n});

  var innerFunction = function(startRow) {
    if (startRow === n) {
      solutionCount++;
      return;
    } 

    for (var i = 0; i < n; i++) {
      // put piece in
      solution.togglePiece(startRow, i);
      
      // have to check if solution no conflicts BEFORE untoggling
      // if you untoggle and then check if there's a conflict 
      if (!solution.hasAnyQueensConflicts()) {
        // go to next row
        innerFunction(startRow + 1);
      }
      // else if conflict take piece out 
      solution.togglePiece(startRow, i);
    }
  };

  innerFunction(0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
