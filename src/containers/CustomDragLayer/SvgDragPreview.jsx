import React, { Component, PropTypes } from "react";
import { SvgShape } from "units";
import shouldPureComponentUpdate from "./shouldPureComponentUpdate";
import setIntervalDecorator from "helpers/decorators";

@setIntervalDecorator
export default class SvgDragPreview extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { tickTock: false };
  }

  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.onSetInterval(this.tick, 400);
  }

  tick() {
    this.setState({ tickTock: !this.state.tickTock });
  }

  render() {
    const { tickTock } = this.state;
    const { currentOffset, ...rest } = this.props;
    if (!currentOffset) return null;
    const styles = {
      box: {
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: `${currentOffset.x}px`,
        top: `${currentOffset.y}px`,
        width: `${rest.item.data.calculatedWidth}px`,
        height: `${rest.item.data.calculatedHeight}px`,
        borderColor: "#2b90d9",
        transition: "border 0.1s linear, boxShadow 0.1s linear"
      },
      borderNormal: {
        borderColor: "#2b90d9",
        borderWidth: 5,
        boxShadow: "none"
      },
      borderGlowing: {
        borderColor: "#2b90d9",
        borderWidth: 5,
        boxShadow: "0 0 5px #2b90d9"
      },
      inner: {
        backgroundColor: "#30A9DE",
        opacity: 0.1,

        width: "100%",
        height: "100%"
      }
    };
    const stylesActive = tickTock ? styles.borderGlowing : styles.borderNormal;
    return (
      <div style={Object.assign({}, stylesActive, styles.box)}>
        <div style={styles.inner} />{" "}
      </div>
    );
  }
}
