import React, { useState, useEffect, useCallback } from "react";

// state managment
import { connect } from "react-redux";
import { increaseCurrentScore } from "../../actions/gameActions";

// components
import Tile from "../Tile";

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
  const directions = { "38": "UP", "40": "DOWN", "37": "LEFT", "39": "RIGHT" };

  // move the tiles based on user's input
  const handleInput = useCallback(event => {
    if (directions[event.keyCode] !== undefined) {
      setTileMap(scopedTileMap =>
        handleMovement(scopedTileMap, directions[event.keyCode])
      );
    }
  }, []);

  // this function is used in order to draw more details from the movement apart from the
  // new state of the tileMap (e.g victory condition, movement took place e.t.c)
  function handleMovement(tileMap, direction) {
    var newGameCondition = moveTileMap(tileMap, direction);
    if (newGameCondition.tilesMoved) {
      props.increaseCurrentScore();
    }
    return newGameCondition.tileMap;
  }

  // component will mount
  useEffect(() => {
    // initialize the map
    setTileMap(initializeTiles(size));
  }, []);

  useEffect(() => {
    document.addEventListener(
      "keyup",
      (e, tileMap) => handleInput(e, tileMap),
      false
    );

    return () => {
      window.removeEventListener("keyup", handleInput, false);
    };
  }, [handleInput]);

  return (
    <div className={"flexcontainer color-pallete2 " + styles.tileContainer}>
      {tileMap.map(row => {
        return row.map((value, index) => {
          return (
            <Tile key={"tile-block-" + index} size={size} value={value}></Tile>
          );
        });
      })}
    </div>
  );
};

Tiles.propTypes = {};

Tiles.defaultProps = {};

export default connect(
  null,
  { increaseCurrentScore }
)(Tiles);
