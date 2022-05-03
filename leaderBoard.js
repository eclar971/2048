(keys["a"]) {
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
}