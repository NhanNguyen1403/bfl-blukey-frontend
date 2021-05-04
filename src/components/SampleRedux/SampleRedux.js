import React, {Component} from 'react';
import {connect} from "react-redux";
import {doSample} from "../../redux";

class SampleRedux extends Component {
  render() {
    return (
      <div>
        <h1>Click to Count: {this.props.count}</h1>
        <button onClick={this.props.doSample}>Increase</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    count: state.sample.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doSample: () => dispatch(doSample())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleRedux);
