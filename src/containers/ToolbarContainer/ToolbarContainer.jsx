import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Toolbar } from "components";
import { selectToolLeft } from "redux/actions/svgActions";

function mapStateToProps(state) {
  return {
    tools: state.svg.toolsLeft,
    selectedTool: state.svg.selectedToolLeft
  };
}

@connect(mapStateToProps)
class ToolbarContainer extends Component {
  constructor(props) {
    super(props);
    this.toolPicked = this.toolPicked.bind(this);
  }

  toolPicked(tool) {
    const { dispatch } = this.props;
    dispatch(selectToolLeft(tool));
  }
  render() {
    return (
      <Toolbar
        tools={this.props.tools}
        selectedTool={this.props.selectedTool}
        toolPicked={this.toolPicked}
        horizontal={false}
      />
    );
  }
}

export default ToolbarContainer;