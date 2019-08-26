import React from "react";
import PropTypes from "prop-types";

// css
import styles from "./tile.module.scss";

const Tile = props => {
  // defines the size of the tile
  const scopedStyles = {
    blockSize: {
      width: 100 / (props.size + 1) + "%",
      height: 100 / (props.size + 1) + "%"
    }
  };

  return (
    <div
      className={`${styles.tileBlock} ${
        styles["tileBlockvalue" + props.value]
      } flexcontainer-block`}
      style={scopedStyles.blockSize}
    >
      <span className={`${styles.tileInner}`}>{props.value}</span>
    </div>
  );
};

Tile.propTypes = {
  size: PropTypes.number,
  value: PropTypes.number
};

Tile.defaultProps = {
  size: null,
  value: null
};

export default Tile;
