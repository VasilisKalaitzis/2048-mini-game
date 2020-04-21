import React, { useState, useEffect, useCallback } from "react";

// state managment
import { connect } from "react-redux";
import {
  increaseCurrentScore,
  changeGameStatus
} from "../../actions/gameActions";

// components
import Tile from "../Tile";
import { Swipeable } from "react-swipeable";

// libraries
import {
  initializeTiles,
  moveTileMap
} from "../../helperFunctions/gameMechanics";

// css
import styles from "./tiles.module.scss";

const Tiles = props => {
  const [size, setSize] = useState(4); // tech debt: allow the user to set up the size
  const [tileMap, setTileMap] = useState([]);
  // translations of the arrow keys
  const directions = { "38": "Up", "40": "Down", "37": "Left", "39": "Right" };

  // move the tiles based on user's input
  const handleInput = useCallback(event => {
    var direction = directions[event.keyCode];
    if (direction !== undefined) {
      submitMovement(direction);
    }
  }, []);

  function swiped(e) {
    submitMovement(e.dir);
  }

  function submitMovement(direction) {
    setTileMap(scopedTileMap => executeMovement(scopedTileMap, direction));
  }
  // this function is used in order to draw more details from the movement apart from the
  // new state of the tileMap (e.g victory condition, movement took place e.t.c)
  function executeMovement(tileMap, direction) {
    var newGameCondition = moveTileMap(tileMap, direction);
    if (newGameCondition.tilesMoved) {
      props.increaseCurrentScore();
      if (newGameCondition.gameStatus !== "running") {
        props.changeGameStatus(newGameCondition.gameStatus);
      }
    }
    return newGameCondition.tileMap;
  }

  // component will mount
  useEffect(() => {
    // initialize the map
    setTileMap(initializeTiles(size));
  }, []);

  useEffect(() => {
    // define the key listener so that we can remove it later
    var keyUpListener = event => {
      handleInput(event);
    };

    document.addEventListener("keyup", keyUpListener, false);

    return () => {
      document.removeEventListener("keyup", keyUpListener, false);
    };
  }, [handleInput]);

  return (
    <div className={"flexcontainer color-pallete2 " + styles.tileMap}>
      <div className={`${styles.tileContainer}`}>
        {tileMap.map(row => {
          return row.map((value, index) => {
            return (
              <Tile
                key={"tile-block-" + index}
                size={size}
                value={value}
              ></Tile>
            );
          });
        })}
        </div>
        <Swipeable className={`${styles.swipeContainer}`} onSwiped={swiped}>
      </Swipeable>
    </div>
  );
};

Tiles.propTypes = {};

Tiles.defaultProps = {};

export default connect(
  null,
  { increaseCurrentScore, changeGameStatus }
)(Tiles);
