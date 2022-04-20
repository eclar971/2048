var keys;
var children;
var evenStartingBlocks = [2, 4, 2];
var emptyBlocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var blankSpaces = false;
var backendGame = [
  [" ", " ", " ", " "],
  [" ", " ", " ", " "],
  [" ", " ", " ", " "],
  [" ", " ", " ", " "],
];
var loop = 0;
var highScore = 0;
var rowSeperation;
var indices = [];
var score = 0;
function chunkArrayInGroups(arr, size) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function checkForDupe(arr, num) {
  indices = [];
  arr.filter(function (yourArray, index) {
    if (num == " ") {
    } else {
      if (yourArray == num) {
        indices.push(index);
      }
    }
  });
}
function refreshScreen(back, front) {
  score = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (" " == back[i][j]) {
        front[i][j].style.backgroundColor = "";
      } else if (2 == back[i][j]) {
        front[i][j].style.backgroundColor = "#00c9c9";
        front[i][j].style.color = "";
      } else if (4 == back[i][j]) {
        front[i][j].style.backgroundColor = "cadetblue";
        front[i][j].style.color = "";
      } else if (8 == back[i][j]) {
        front[i][j].style.backgroundColor = "#3b7375";
        front[i][j].style.color = "lightgrey";
      } else if (16 == back[i][j]) {
        front[i][j].style.backgroundColor = "#26494b";
        front[i][j].style.color = "lightgrey";
      } else if (32 == back[i][j]) {
        front[i][j].style.backgroundColor = "#26364b";
        front[i][j].style.color = "lightgrey";
      } else if (64 == back[i][j]) {
        front[i][j].style.backgroundColor = "#31264b";
        front[i][j].style.color = "lightgrey";
      } else if (128 == back[i][j]) {
        front[i][j].style.backgroundColor = "indigo";
        front[i][j].style.color = "lightgrey";
      } else if (256 == back[i][j]) {
        front[i][j].style.backgroundColor = "purple";
        front[i][j].style.color = "lightgrey";
      } else if (512 == back[i][j]) {
        front[i][j].style.backgroundColor = "#cc8994";
        front[i][j].style.color = "";
      } else if (1024 == back[i][j]) {
        front[i][j].style.backgroundColor = "pink";
        front[i][j].style.color = "";
      } else if (2048 == back[i][j]) {
        front[i][j].style.backgroundColor = "goldenrod";
        front[i][j].style.color = "";
      } else {
        front[i][j].style.backgroundColor = "black";
        front[i][j].style.color = "lightgrey";
      }
      front[i][j].innerHTML = back[i][j];
      if (back[i][j] != " ") {
        score += back[i][j];
      }
    }
  }
  document.getElementById("currentScore").innerHTML = "Score: " + score;
}
window.onload = function () {
  var myCanvasEl = document.getElementById("board");
  children = myCanvasEl.children;
  width = children[0].offsetWidth;
  var listChildren = Array.from(children);
  rowSeperation = [
    [listChildren[0], listChildren[1], listChildren[2], listChildren[3]],
    [listChildren[4], listChildren[5], listChildren[6], listChildren[7]],
    [listChildren[8], listChildren[9], listChildren[10], listChildren[11]],
    [listChildren[12], listChildren[13], listChildren[14], listChildren[15]],
  ];
  for (let i = 0; i < children.length; i++) {
    currentChild = children[i];
    currentChild.style.height = width - 10;
  }
  startingSquares = getRandomIntInclusive(2, 3);
  for (let i = 0; i < startingSquares; i++) {
    blockRow = getRandomIntInclusive(0, 3);
    blockRColum = getRandomIntInclusive(0, 3);
    while (backendGame[blockRColum][blockRow] != " ") {
      blockRow = getRandomIntInclusive(0, 3);
      blockRColum = getRandomIntInclusive(0, 3);
    }
    backendGame[blockRColum][blockRow] =
      evenStartingBlocks[getRandomIntInclusive(0, 2)];
    refreshScreen(backendGame, rowSeperation);
  }
};
window.addEventListener("resize", function () {
  var myCanvasEl = document.getElementById("board");
  children = myCanvasEl.children;
  width = children[0].offsetWidth;
  for (let i = 0; i < children.length; i++) {
    currentChild = children[i];
    currentChild.style.height = width - 10;
  }
});
///setInterval(function () {
///  directions = ['w','a','s','d']
///  for (let ji = 0; ji < 4; ji++){
///    keys[directions[ji]] = false
///  }
///  if (loop > 4){
///    loop = 0
///  }
///  gameOver = true;
///  for (let ik = 0; ik < 4; ik++) {
///    currentColumn = [
///      backendGame[0][ik],
///      backendGame[1][ik],
///      backendGame[2][ik],
///      backendGame[3][ik],
///    ];
///    currentRow = backendGame[ik];
///    if (
///      currentColumn[0] == currentColumn[1] ||
///      currentColumn[1] == currentColumn[2] ||
///      currentColumn[2] == currentColumn[3]
///    ) {
///      gameOver = false;
///    }
///    if (
///      currentRow[0] == currentRow[1] ||
///      currentRow[1] == currentRow[2] ||
///      currentRow[2] == currentRow[3]
///    ) {
///      gameOver = false;
///    }
///    if (backendGame[ik].includes(" ")) {
///      gameOver = false;
///    }
///  }
///  if (!gameOver) {
///    keys[directions[loop]] = true
///  }
///  loop++
///}, 4);
window.addEventListener("keydown", function movement(obj) {
  gameOver = true;
  blankSpaces = false;
  keys = keys || [];
  keys[obj.key] = true;
  for (let i = 0; i < 4; i++) {
    currentColumn = [
      backendGame[0][i],
      backendGame[1][i],
      backendGame[2][i],
      backendGame[3][i],
    ];
    currentRow = backendGame[i];
    if (
      currentColumn[0] == currentColumn[1] ||
      currentColumn[1] == currentColumn[2] ||
      currentColumn[2] == currentColumn[3]
    ) {
      gameOver = false;
    }
    if (
      currentRow[0] == currentRow[1] ||
      currentRow[1] == currentRow[2] ||
      currentRow[2] == currentRow[3]
    ) {
      gameOver = false;
    }
    if (backendGame[i].includes(" ")) {
      gameOver = false;
    }
  }
  if (!gameOver) {
    if (keys["ArrowDown"]) {
      for (let i = 0; i < 4; i++) {
        currentColumn = [
          backendGame[0][i],
          backendGame[1][i],
          backendGame[2][i],
          backendGame[3][i],
        ];
        sortedColumn = [...currentColumn].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentColumn, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[2] - hasDupes[1] == 1) {
                currentColumn[hasDupes[2]] =
                  currentColumn[hasDupes[1]] + currentColumn[hasDupes[2]];
                currentColumn[hasDupes[1]] = " ";
              } else if (currentRow[hasDupes[2] - 1] == " ") {
                currentColumn[hasDupes[2]] =
                  currentColumn[hasDupes[1]] + currentColumn[hasDupes[2]];
                currentColumn[hasDupes[1]] = " ";
              } else if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentColumn[hasDupes[3]] =
                currentColumn[hasDupes[2]] + currentColumn[hasDupes[3]];
              currentColumn[hasDupes[2]] = " ";
              currentColumn[hasDupes[1]] =
                currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
              currentColumn[hasDupes[0]] = " ";
            } else if (
              currentColumn[hasDupes[0]] == currentColumn[hasDupes[1]]
            ) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == " " &&
                currentColumn[hasDupes[0] + 3] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentColumn.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 0; j < 3; j++) {
            if (currentColumn[j] != " " && currentColumn[j + 1] == " ") {
              currentColumn[j + 1] = currentColumn[j];
              currentColumn[j] = " ";
            }
          }
        }
        backendGame[0][i] = currentColumn[0];
        backendGame[1][i] = currentColumn[1];
        backendGame[2][i] = currentColumn[2];
        backendGame[3][i] = currentColumn[3];
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColumn = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < 4; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["ArrowUp"]) {
      for (let i = 0; i < 4; i++) {
        currentColumn = [
          backendGame[0][i],
          backendGame[1][i],
          backendGame[2][i],
          backendGame[3][i],
        ];
        sortedColumn = [...currentColumn].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentColumn, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              } else if (currentColumn[hasDupes[0] + 1] == " ") {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              } else if (hasDupes[2] - hasDupes[1] == 1) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[1]] + currentColumn[hasDupes[2]];
                currentColumn[hasDupes[2]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentColumn[hasDupes[0]] =
                currentColumn[hasDupes[1]] + currentColumn[hasDupes[0]];
              currentColumn[hasDupes[1]] = " ";
              currentColumn[hasDupes[2]] =
                currentColumn[hasDupes[2]] + currentColumn[hasDupes[3]];
              currentColumn[hasDupes[3]] = " ";
            } else if (
              currentColumn[hasDupes[0]] == currentColumn[hasDupes[1]]
            ) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == " " &&
                currentColumn[hasDupes[0] + 3] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentColumn.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 3; j > 0; j = j - 1) {
            if (currentColumn[j] != " " && currentColumn[j - 1] == " ") {
              currentColumn[j - 1] = currentColumn[j];
              currentColumn[j] = " ";
            }
          }
        }
        backendGame[0][i] = currentColumn[0];
        backendGame[1][i] = currentColumn[1];
        backendGame[2][i] = currentColumn[2];
        backendGame[3][i] = currentColumn[3];
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColumn = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < 4; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["ArrowLeft"]) {
      for (let i = 0; i < 4; i++) {
        currentRow = backendGame[i];
        sortedRow = [...currentRow].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedRow[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentRow, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (currentRow[hasDupes[0] + 1] == " ") {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (hasDupes[2] - hasDupes[1] == 1) {
                currentRow[hasDupes[2]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[2]];
                currentRow[hasDupes[1]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentRow[hasDupes[0]] =
                currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
              currentRow[hasDupes[1]] = " ";
              currentRow[hasDupes[2]] =
                currentRow[hasDupes[2]] + currentRow[hasDupes[3]];
              currentRow[hasDupes[3]] = " ";
            } else if (currentRow[hasDupes[0]] == currentRow[hasDupes[1]]) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[0]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
                currentRow[hasDupes[1]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[0]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
                currentRow[hasDupes[1]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == " " &&
                currentRow[hasDupes[0] + 3] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[0]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
                currentRow[hasDupes[1]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentRow.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 3; j > 0; j = j - 1) {
            if (currentRow[j] != " " && currentRow[j - 1] == " ") {
              currentRow[j - 1] = currentRow[j];
              currentRow[j] = " ";
            }
          }
        }
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColum = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < 4; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["ArrowRight"]) {
      for (let i = 0; i < 4; i++) {
        currentRow = backendGame[i];
        sortedRow = [...currentRow].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedRow[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentRow, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[2] - hasDupes[1] == 1) {
                currentRow[hasDupes[2]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[2]];
                currentRow[hasDupes[1]] = " ";
              } else if (currentRow[hasDupes[2] - 1] == " ") {
                currentRow[hasDupes[2]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[2]];
                currentRow[hasDupes[1]] = " ";
              } else if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentRow[hasDupes[3]] =
                currentRow[hasDupes[2]] + currentRow[hasDupes[3]];
              currentRow[hasDupes[2]] = " ";
              currentRow[hasDupes[1]] =
                currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
              currentRow[hasDupes[0]] = " ";
            } else if (currentRow[hasDupes[0]] == currentRow[hasDupes[1]]) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == " " &&
                currentRow[hasDupes[0] + 3] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentRow.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 0; j < 3; j++) {
            if (currentRow[j] != " " && currentRow[j + 1] == " ") {
              currentRow[j + 1] = currentRow[j];
              currentRow[j] = " ";
            }
          }
        }
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColum = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < 4; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["s"]) {
      for (let i = 0; i < 4; i++) {
        currentColumn = [
          backendGame[0][i],
          backendGame[1][i],
          backendGame[2][i],
          backendGame[3][i],
        ];
        sortedColumn = [...currentColumn].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentColumn, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[2] - hasDupes[1] == 1) {
                currentColumn[hasDupes[2]] =
                  currentColumn[hasDupes[1]] + currentColumn[hasDupes[2]];
                currentColumn[hasDupes[1]] = " ";
              } else if (currentRow[hasDupes[2] - 1] == " ") {
                currentColumn[hasDupes[2]] =
                  currentColumn[hasDupes[1]] + currentColumn[hasDupes[2]];
                currentColumn[hasDupes[1]] = " ";
              } else if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentColumn[hasDupes[3]] =
                currentColumn[hasDupes[2]] + currentColumn[hasDupes[3]];
              currentColumn[hasDupes[2]] = " ";
              currentColumn[hasDupes[1]] =
                currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
              currentColumn[hasDupes[0]] = " ";
            } else if (
              currentColumn[hasDupes[0]] == currentColumn[hasDupes[1]]
            ) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == " " &&
                currentColumn[hasDupes[0] + 3] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentColumn.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 0; j < 3; j++) {
            if (currentColumn[j] != " " && currentColumn[j + 1] == " ") {
              currentColumn[j + 1] = currentColumn[j];
              currentColumn[j] = " ";
            }
          }
        }
        backendGame[0][i] = currentColumn[0];
        backendGame[1][i] = currentColumn[1];
        backendGame[2][i] = currentColumn[2];
        backendGame[3][i] = currentColumn[3];
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColumn = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < 4; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["w"]) {
      for (let i = 0; i < 4; i++) {
        currentColumn = [
          backendGame[0][i],
          backendGame[1][i],
          backendGame[2][i],
          backendGame[3][i],
        ];
        sortedColumn = [...currentColumn].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentColumn, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              } else if (currentColumn[hasDupes[0] + 1] == " ") {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[0]] = " ";
              } else if (hasDupes[2] - hasDupes[1] == 1) {
                currentColumn[hasDupes[1]] =
                  currentColumn[hasDupes[1]] + currentColumn[hasDupes[2]];
                currentColumn[hasDupes[2]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentColumn[hasDupes[0]] =
                currentColumn[hasDupes[1]] + currentColumn[hasDupes[0]];
              currentColumn[hasDupes[1]] = " ";
              currentColumn[hasDupes[2]] =
                currentColumn[hasDupes[2]] + currentColumn[hasDupes[3]];
              currentColumn[hasDupes[3]] = " ";
            } else if (
              currentColumn[hasDupes[0]] == currentColumn[hasDupes[1]]
            ) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              } else if (
                currentColumn[hasDupes[0] + 1] == " " &&
                currentColumn[hasDupes[0] + 2] == " " &&
                currentColumn[hasDupes[0] + 3] == currentColumn[hasDupes[1]]
              ) {
                currentColumn[hasDupes[0]] =
                  currentColumn[hasDupes[0]] + currentColumn[hasDupes[1]];
                currentColumn[hasDupes[1]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentColumn.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 3; j > 0; j = j - 1) {
            if (currentColumn[j] != " " && currentColumn[j - 1] == " ") {
              currentColumn[j - 1] = currentColumn[j];
              currentColumn[j] = " ";
            }
          }
        }
        backendGame[0][i] = currentColumn[0];
        backendGame[1][i] = currentColumn[1];
        backendGame[2][i] = currentColumn[2];
        backendGame[3][i] = currentColumn[3];
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColumn = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < 4; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["a"]) {
      for (let i = 0; i < 4; i++) {
        currentRow = backendGame[i];
        sortedRow = [...currentRow].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedRow[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentRow, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (currentRow[hasDupes[0] + 1] == " ") {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (hasDupes[2] - hasDupes[1] == 1) {
                currentRow[hasDupes[2]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[2]];
                currentRow[hasDupes[1]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentRow[hasDupes[0]] =
                currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
              currentRow[hasDupes[1]] = " ";
              currentRow[hasDupes[2]] =
                currentRow[hasDupes[2]] + currentRow[hasDupes[3]];
              currentRow[hasDupes[3]] = " ";
            } else if (currentRow[hasDupes[0]] == currentRow[hasDupes[1]]) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[0]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
                currentRow[hasDupes[1]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[0]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
                currentRow[hasDupes[1]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == " " &&
                currentRow[hasDupes[0] + 3] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[0]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[0]];
                currentRow[hasDupes[1]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentRow.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 3; j > 0; j = j - 1) {
            if (currentRow[j] != " " && currentRow[j - 1] == " ") {
              currentRow[j - 1] = currentRow[j];
              currentRow[j] = " ";
            }
          }
        }
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColum = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < 4; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["d"]) {
      for (let i = 0; i < 4; i++) {
        currentRow = backendGame[i];
        sortedRow = [...currentRow].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedRow[3];
        for (let j = highestVal; j >= 2; j /= 2) {
          checkForDupe(currentRow, j);
          hasDupes = [...indices];
          hasDupes.sort();
          if (hasDupes.length > 1) {
            if (hasDupes.length == 3) {
              if (hasDupes[2] - hasDupes[1] == 1) {
                currentRow[hasDupes[2]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[2]];
                currentRow[hasDupes[1]] = " ";
              } else if (currentRow[hasDupes[2] - 1] == " ") {
                currentRow[hasDupes[2]] =
                  currentRow[hasDupes[1]] + currentRow[hasDupes[2]];
                currentRow[hasDupes[1]] = " ";
              } else if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              }
            } else if (hasDupes.length == 4) {
              currentRow[hasDupes[3]] =
                currentRow[hasDupes[2]] + currentRow[hasDupes[3]];
              currentRow[hasDupes[2]] = " ";
              currentRow[hasDupes[1]] =
                currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
              currentRow[hasDupes[0]] = " ";
            } else if (currentRow[hasDupes[0]] == currentRow[hasDupes[1]]) {
              if (hasDupes[1] - hasDupes[0] == 1) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              } else if (
                currentRow[hasDupes[0] + 1] == " " &&
                currentRow[hasDupes[0] + 2] == " " &&
                currentRow[hasDupes[0] + 3] == currentRow[hasDupes[1]]
              ) {
                currentRow[hasDupes[1]] =
                  currentRow[hasDupes[0]] + currentRow[hasDupes[1]];
                currentRow[hasDupes[0]] = " ";
              }
            }
          }
        }
        for (
          let k = 0;
          k < 4 - currentRow.filter((x) => x == " ").length;
          k++
        ) {
          for (let j = 0; j < 3; j++) {
            if (currentRow[j] != " " && currentRow[j + 1] == " ") {
              currentRow[j + 1] = currentRow[j];
              currentRow[j] = " ";
            }
          }
        }
      }
      blockRow = getRandomIntInclusive(0, 3);
      blockRColum = getRandomIntInclusive(0, 3);
      for (let i = 0; i < 4; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " ") {
          blockRow = getRandomIntInclusive(0, 3);
          blockRColum = getRandomIntInclusive(0, 3);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    }
  } else {
    if (score > highScore) {
      highScore = score;
      document.getElementById("highScore").innerHTML =
        "High Score: " + highScore;
    }
    window.alert("Game Over");
    keys = [];
    backendGame = [
      [" ", " ", " ", " "],
      [" ", " ", " ", " "],
      [" ", " ", " ", " "],
      [" ", " ", " ", " "],
    ];
    var myCanvasEl = document.getElementById("board");
    children = myCanvasEl.children;
    width = children[0].offsetWidth;
    var listChildren = Array.from(children);
    rowSeperation = [
      [listChildren[0], listChildren[1], listChildren[2], listChildren[3]],
      [listChildren[4], listChildren[5], listChildren[6], listChildren[7]],
      [listChildren[8], listChildren[9], listChildren[10], listChildren[11]],
      [listChildren[12], listChildren[13], listChildren[14], listChildren[15]],
    ];
    for (let i = 0; i < children.length; i++) {
      currentChild = children[i];
      currentChild.style.height = width - 10;
    }
    startingSquares = getRandomIntInclusive(2, 3);
    for (let i = 0; i < startingSquares; i++) {
      blockRow = getRandomIntInclusive(0, 3);
      blockRColum = getRandomIntInclusive(0, 3);
      while (backendGame[blockRColum][blockRow] != " ") {
        blockRow = getRandomIntInclusive(0, 3);
        blockRColum = getRandomIntInclusive(0, 3);
      }
      backendGame[blockRColum][blockRow] =
        evenStartingBlocks[getRandomIntInclusive(0, 2)];
      refreshScreen(backendGame, rowSeperation);
    }
  }
});
document.addEventListener(
  "keyup",
  function movement(obj) {
    keys[obj.key] = false;
    stop();
  },
  false
);