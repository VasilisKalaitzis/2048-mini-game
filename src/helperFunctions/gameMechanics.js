// this file contains the functions to handle the game mechanics

// initialize the map tiles
// request: none
// parameters:
//        size          int             = (The size of the grid)
//        startingTiles int             = (The number of the tiles appear initially)
// returns:
//        tileMap  two-dimension array  = (The initialized form of the tileMap)
export function initializeTiles(size, startingTiles = 2) {
  var tileMap = getEmptyTileMap(size);

  // add randomTiles at the start of the game
  for (let i = 0; i < startingTiles; i++) {
    tileMap = addRandomTile(tileMap);
  }

  return tileMap;
}

// get empty tilemap
// request: none
// parameters:
//        size     int                  = (The size of the grid)
// returns:
//        tileMap  two-dimension array  = (An empty tileMap)
function getEmptyTileMap(size) {
  var tileMap = [];

  for (let i = 0; i < size; i++) {
    let row = [];

    for (let j = 0; j < size; j++) {
      row.push(null);
    }

    tileMap.push(row);
  }

  return tileMap;
}

// add random tile to the tilemap
// request: none
// parameters:
//        tileMap  two-dimension array  = (The current form of the tileMap)
// returns:
//        tileMap  two-dimension array  = (The tileMap with 1 more tile added to it)
function addRandomTile(tileMap) {
  var found = 0;
  var size = tileMap.length;

  if (availableTileExists(tileMap)) {
    while (!found) {
      let x = Math.floor(Math.random() * size);
      let y = Math.floor(Math.random() * size);

      if (tileMap[x][y] === null) {
        tileMap[x][y] = 2;
        found = 1;
      }
    }
  }
  return tileMap;
}

// check if available space exist on the tilemap
// request: none
// parameters:
//        tileMap       two-dimension array = (The current form of the tileMap)
// returns:
//        availability  bolean              = (Whether there is an available tile on the tileMap or not)
function availableTileExists(tileMap) {
  var availability = false;
  var size = tileMap.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (tileMap[i][j] === null) {
        availability = true;
      }
    }
  }

  return availability;
}

// move all tiles on the tilemap based on direction
// request: none
// parameters:
//        tileMap    two-dimension array    = (The current form of the tileMap)
//        direction  string                 = (The direction that the tiles will move)
// returns:
//        {tileMap, condition, moved}
//        tileMap    two-dimension array    = (The tileMap after the tiles have been moved)
//        condition  string                 = (The condition of the game after the movement)
//        moved      boolean                = (Whether any of the tiles has been moved)
export function moveTileMap(tileMap, direction) {
  // variables that define the length of the dimensions
  var size = tileMap.length;
  // variable that stores the footprint of the merges that took place
  var footprintMap = getEmptyTileMap(size);
  // variable that will let us know if any tile was moved
  var tilesMoved = false;
  // variable that will let us know if the game has been won
  var gameStatus = "running";

  // variables that defined the loop parse direction
  var x = [],
    y = [];
  for (let i = 0; i < size; i++) {
    x.push(i);
    y.push(i);
  }

  switch (direction) {
    case "Down":
      y = y.reverse();
      break;
    case "Right":
      x = x.reverse();
      break;
    default:
      break;
  }

  for (let i = 0; i < size; i++) {
    let realY = y[i];
    for (let j = 0; j < size; j++) {
      let realX = x[j];

      // if the current tile has a value
      if (tileMap[realY][realX] !== null) {
        let [newY, newX, action, value] = findFartherTile(
          tileMap[realY][realX],
          tileMap,
          footprintMap,
          realY,
          realX,
          direction
        );
        if (newY !== realY || newX !== realX) {
          tileMap[realY][realX] = null;
          tileMap[newY][newX] = value;

          if (action === "merge") {
            footprintMap[newY][newX] = "merged";
          }

          if (value === 2048) {
            gameStatus = "victory";
          }

          tilesMoved = true;
        }
      }
    }
  }

  if (tilesMoved) {
    addRandomTile(tileMap);
    // check available moves, if they don't exist at all then it's game over
    if (checkEndOfGame(tileMap)) {
      gameStatus = "defeat";
    }
  }

  return {
    tileMap: [...tileMap],
    gameStatus: gameStatus,
    tilesMoved: tilesMoved
  };
}

// find the farther tile that our tile can move toward one direction
// request: none
// parameters:
//        tileValue    int                     = (The value of the moving tile)
//        tileMap      two-dimension array     = (The mutated form of the tileMap)
//        footprintMap two-dimension array     = (The map that shows the merged tiles of the tileMap)
//        x            integer                 = (The mutated index on the x axis of the tile)
//        y            integer                 = (The mutated index on the y axis of the tile)
//        direction    string                  = (The direction based on the user's input)
// returns:
//        [newX integer, newY integer, action string, value integer]
function findFartherTile(tileValue, tileMap, footprintMap, y, x, direction) {
  var size = tileMap.length;
  var nextY = y;
  var nextX = x;
  switch (direction) {
    case "Up":
      nextY--;
      if (nextY < 0) {
        return [y, x, "bounded", tileValue];
      }
      break;
    case "Down":
      nextY++;
      if (nextY > size - 1) {
        return [y, x, "bounds", tileValue];
      }

      break;
    case "Left":
      nextX--;
      if (nextX < 0) {
        return [y, x, "bounded", tileValue];
      }
      break;
    case "Right":
      nextX++;
      if (nextX > size - 1) {
        return [y, x, "bounded", tileValue];
      }
      break;
    default:
      return [y, x, "wrongInput", tileValue];
  }

  if (
    footprintMap[nextY][nextX] === "merged" ||
    (tileMap[nextY][nextX] !== null && tileValue !== tileMap[nextY][nextX])
  ) {
    // the next space is occupied by a tile that has been merged
    return [y, x, "bounded", tileValue];
  } else if (tileValue === tileMap[nextY][nextX]) {
    // the next space is occupied by a tile that has the same value
    return [nextY, nextX, "merge", tileValue * 2];
  } else {
    // search farther away
    return findFartherTile(
      tileValue,
      tileMap,
      footprintMap,
      nextY,
      nextX,
      direction
    );
  }
}

function checkEndOfGame(tileMap) {
  var size = tileMap.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // to satisfy the condition there should:
      // 1) an available tile OR
      // 2) an adjasted tile with the same value
      if (
        tileMap[i][j] === null ||
        (i + 1 < size && tileMap[i][j] === tileMap[i + 1][j]) ||
        (j + 1 < size && tileMap[i][j] === tileMap[i][j + 1])
      ) {
        return false;
      }
    }
  }

  return true;
}
