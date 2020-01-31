import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { initHousingData } from './actions/SimpleAction';
import data from './sfgovdata.json';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  initHousingData: (data) => dispatch(initHousingData(data))
});


export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initHousingData(data);
  }

  render() {
    return (
      <div>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);