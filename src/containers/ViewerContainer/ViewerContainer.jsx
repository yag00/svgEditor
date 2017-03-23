import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Viewer } from "components";
import { Svg } from "units";
import { selectItem } from "redux/actions/svgActions";

class ViewerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 0, width: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    const { dispatch } = this.props;
    dispatch(selectItem(item));
  }

  componentDidMount() {
    window.addEventListener("resize", this.resetDimensions.bind(this));
    this.resetDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resetDimensions.bind(this));
  }

  resetDimensions() {
    var svgContainer = this.refs.svgContainer;
    this.state = {
      width: svgContainer.clientWidth,
      height: svgContainer.clientHeight
    };
    this.forceUpdate();
  }

  render() {
    return (
      <div ref="svgContainer" className="svgContainer">
        <Viewer
          {...this.props}
          height={this.state.height}
          width={this.state.width}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}
ViewerContainer.propTypes = {
  svg: PropTypes.instanceOf(Svg)
};

function mapStateToProps(state) {
  return state.svg;
}

export default connect(mapStateToProps)(ViewerContainer);
