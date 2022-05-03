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
var numOfBlocks;
var ceeLocation = [];
window.addEventListener(
  "touchstart",
  function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  },
  false
);

window.addEventListener(
  "touchend",
  function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  },
  false
);
function consecutiveEqualElements(elements) {
  ceeLocation = [];
  var currentNum = elements[0];
  var currentConsecutive = 1;
  var maxConsecutive = 1;
  for (let i = 1; i < elements.length; i++) {
    if (elements[i] == currentNum) {
      ceeLocation.push(i - 1);
      ceeLocation.push(i);
      currentConsecutive++;
      maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
    } else {
      currentNum = elements[i];
      currentConsecutive = 1;
    }
  }
  return maxConsecutive;
}
function handleGesture() {
  gameOver = true;
  blankSpaces = false;
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
    if (touchendY > touchstartY) {
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
    }
    if (touchendY < touchstartY) {
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
    }
    if (touchendX < touchstartX) {
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
    }
    if (touchendX > touchstartX) {
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
}
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
  for (let i = 0; i < numOfBlocks; i++) {
    for (let j = 0; j < numOfBlocks; j++) {
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
function reload() {
  window.onload();
}
window.onload = function () {
  numOfBlocks = parseInt(document.getElementById("rowLen").value);
  backendGame = [];
  rowCreation = [];
  rowSeperation = [];
  elementRow = [];
  for (let i = 0; i < numOfBlocks; i++) {
    for (let i = 0; i < numOfBlocks; i++) {
      rowCreation.push(" ");
    }
    backendGame.push(rowCreation);
    rowCreation = [];
  }
  var myCanvasEl = document.getElementById("board");
  myCanvasEl.innerHTML = "<div></div>".repeat(numOfBlocks ** 2);
  myCanvasEl.style.gridTemplateColumns = (
    (100 / numOfBlocks).toFixed(1).toString() + "%"
  ).repeat(numOfBlocks);
  children = myCanvasEl.children;
  width = children[0].offsetWidth;
  var listChildren = Array.from(children);
  for (let i = 0; i < numOfBlocks ** 2; i++) {
    if (i % numOfBlocks == 0 && elementRow.length != 0) {
      rowSeperation.push(elementRow);
      elementRow = [];
      elementRow.push(listChildren[i]);
    } else if (i == numOfBlocks ** 2 - 1) {
      elementRow.push(listChildren[i]);
      rowSeperation.push(elementRow);
      elementRow = [];
    } else {
      elementRow.push(listChildren[i]);
    }
  }
  for (let i = 0; i < children.length; i++) {
    currentChild = children[i];
    currentChild.style.height = width - 10;
  }
  startingSquares = getRandomIntInclusive(2, 3);
  for (let i = 0; i < startingSquares; i++) {
    blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
    blockRColum = getRandomIntInclusive(0, numOfBlocks - 1);
    while (backendGame[blockRColum][blockRow] != " ") {
      blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
      blockRColum = getRandomIntInclusive(0, numOfBlocks - 1);
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
  for (let i = 0; i < numOfBlocks; i++) {
    currentColumn = [];
    for (let j = 0; j < numOfBlocks; j++) {
      currentColumn.push(backendGame[j][i]);
    }
    currentRow = backendGame[i];
    if (consecutiveEqualElements(currentColumn) > 1) {
      gameOver = false;
    }
    if (consecutiveEqualElements(currentRow) > 1) {
      gameOver = false;
    }
    if (backendGame[i].includes(" ")) {
      gameOver = false;
    }
  }
  if (!gameOver) {
    if (keys["ArrowDown"]) {
      for (let i = 0; i < numOfBlocks; i++) {
        currentColumn = [];
        for (let j = 0; j < numOfBlocks; j++) {
          currentColumn.push(backendGame[j][i]);
        }
        sortedColumn = [...currentColumn].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[numOfBlocks - 1];
        for (let j = highestVal; j >= 2; j /= 2) {
          const noSpaceCol = currentColumn.filter(function (x) {
            return x !== " ";
          });
          if (consecutiveEqualElements(noSpaceCol) > 1)
            for (let k = ceeLocation.length - 1; k > 0; k = k - 2) {
              if (ceeLocation[k + 1] != ceeLocation[k]) {
                noSpaceCol[k] = noSpaceCol[k] * 2;
                noSpaceCol[k - 1] = " ";
              }
            }
          currentColumn = [];
          for (let p = 0; p < numOfBlocks - noSpaceCol.length; p++) {
            currentColumn.push(" ");
          }
          for (let p = 0; p < noSpaceCol.length; p++) {
            currentColumn.push(noSpaceCol[p]);
          }
        }

        for (let j = 0; j < numOfBlocks; j++) {
          backendGame[j][i] = currentColumn[j];
        }
      }
      blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
      blockRColumn = getRandomIntInclusive(0, numOfBlocks - 1);
      for (let i = 0; i < numOfBlocks; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < numOfBlocks; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
          blockRColum = getRandomIntInclusive(0, numOfBlocks - 1);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["ArrowUp"]) {
      for (let i = 0; i < 4; i++) {
        currentColumn = [];
        for (let j = 0; j < numOfBlocks; j++) {
          currentColumn.push(backendGame[j][i]);
        }
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
      for (let i = 0; i < numOfBlocks; i++) {
        currentColumn = [];
        for (let j = 0; j < numOfBlocks; j++) {
          currentColumn.push(backendGame[j][i]);
        }
        sortedColumn = [...currentColumn].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[numOfBlocks - 1];
        const noSpaceCol = currentColumn.filter(function (x) {
          return x !== " ";
        });
        if (consecutiveEqualElements(noSpaceCol) > 1) {
          for (let k = ceeLocation.length - 1; k > 0; k = k - 2) {
            if (ceeLocation[k] != ceeLocation[k + 1]) {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k]] * 2;
              noSpaceCol[ceeLocation[k - 1]] = " ";
            } else {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k - 1]];
              noSpaceCol[ceeLocation[k - 1]] = " ";
            }
          }
        }
        currentColumn = [];
        for (let p = 0; p < numOfBlocks - noSpaceCol.length; p++) {
          currentColumn.push(" ");
        }
        for (let p = 0; p < noSpaceCol.length; p++) {
          currentColumn.push(noSpaceCol[p]);
        }

        for (let j = 0; j < numOfBlocks; j++) {
          backendGame[j][i] = currentColumn[j];
        }
      }
      blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
      blockRColumn = getRandomIntInclusive(0, numOfBlocks - 1);
      for (let i = 0; i < numOfBlocks; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < numOfBlocks; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
          blockRColum = getRandomIntInclusive(0, numOfBlocks - 1);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["w"]) {
      for (let i = 0; i < numOfBlocks; i++) {
        currentColumn = [];
        for (let j = 0; j < numOfBlocks; j++) {
          currentColumn.push(backendGame[j][i]);
        }
        sortedColumn = [...currentColumn].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[numOfBlocks - 1];
        const noSpaceCol = currentColumn.filter(function (x) {
          return x !== " ";
        });
        if (consecutiveEqualElements(noSpaceCol) > 1)
          for (let k = 0; k < ceeLocation.length - 1; k = k + 2) {
            if (ceeLocation[k] != ceeLocation[k - 1]) {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k]] * 2;
              noSpaceCol[ceeLocation[k + 1]] = " ";
            } else {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k + 1]];
              noSpaceCol[ceeLocation[k + 1]] = " ";
            }
          }
        currentColumn = [];
        for (let p = 0; p < noSpaceCol.length; p++) {
          currentColumn.push(noSpaceCol[p]);
        }
        for (let p = 0; p < numOfBlocks - noSpaceCol.length; p++) {
          currentColumn.push(" ");
        }

        for (let j = 0; j < numOfBlocks; j++) {
          backendGame[j][i] = currentColumn[j];
        }
      }
      blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
      blockRColumn = getRandomIntInclusive(0, numOfBlocks - 1);
      for (let i = 0; i < numOfBlocks; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < numOfBlocks; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
          blockRColum = getRandomIntInclusive(0, numOfBlocks - 1);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["a"]) {
      for (let i = 0; i < numOfBlocks; i++) {
        currentRow = backendGame[i]
        sortedColumn = [...currentRow].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[numOfBlocks - 1];
        const noSpaceCol = currentRow.filter(function (x) {
          return x !== " ";
        });
        if (consecutiveEqualElements(noSpaceCol) > 1)
          for (let k = 0; k < ceeLocation.length - 1; k = k + 2) {
            if (ceeLocation[k] != ceeLocation[k - 1]) {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k]] * 2;
              noSpaceCol[ceeLocation[k + 1]] = " ";
            } else {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k + 1]];
              noSpaceCol[ceeLocation[k + 1]] = " ";
            }
          }
        currentRow = [];
        for (let p = 0; p < noSpaceCol.length; p++) {
          currentRow.push(noSpaceCol[p]);
        }
        for (let p = 0; p < numOfBlocks - noSpaceCol.length; p++) {
          currentRow.push(" ");
        }
        backendGame[i] = currentRow
      }
      blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
      blockRColumn = getRandomIntInclusive(0, numOfBlocks - 1);
      for (let i = 0; i < numOfBlocks; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < numOfBlocks; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
          blockRColum = getRandomIntInclusive(0, numOfBlocks - 1);
        }
        backendGame[blockRColum][blockRow] =
          evenStartingBlocks[getRandomIntInclusive(0, 2)];
      }
      refreshScreen(backendGame, rowSeperation);
    } else if (keys["d"]) {
      for (let i = 0; i < numOfBlocks; i++) {
        currentRow = backendGame[i]
        sortedColumn = [...currentRow].sort(function (a, b) {
          return a - b;
        });
        highestVal = sortedColumn[numOfBlocks - 1];
        const noSpaceCol = currentRow.filter(function (x) {
          return x !== " ";
        });
        if (consecutiveEqualElements(noSpaceCol) > 1) {
          for (let k = ceeLocation.length - 1; k > 0; k = k - 2) {
            if (ceeLocation[k] != ceeLocation[k + 1]) {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k]] * 2;
              noSpaceCol[ceeLocation[k - 1]] = " ";
            } else {
              noSpaceCol[ceeLocation[k]] = noSpaceCol[ceeLocation[k - 1]];
              noSpaceCol[ceeLocation[k - 1]] = " ";
            }
          }
        }
        currentRow = [];
        for (let p = 0; p < numOfBlocks - noSpaceCol.length; p++) {
          currentRow.push(" ");
        }
        for (let p = 0; p < noSpaceCol.length; p++) {
          currentRow.push(noSpaceCol[p]);
        }
        backendGame[i] = currentRow;
      }
      blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
      blockRColumn = getRandomIntInclusive(0, numOfBlocks - 1);
      for (let i = 0; i < numOfBlocks; i++) {
        if (backendGame[i].includes(" ")) {
          blankSpaces = true;
        }
      }
      if (blankSpaces) {
        while (backendGame[blockRColum][blockRow] != " " && blankSpaces) {
          blankSpaces = false;
          for (let i = 0; i < numOfBlocks; i++) {
            if (backendGame[i].includes(" ")) {
              blankSpaces = true;
            }
          }
          blockRow = getRandomIntInclusive(0, numOfBlocks - 1);
          blockRColum = getRandomIntInclusive(0, numOfBlocks - 1);
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
    reload();
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
