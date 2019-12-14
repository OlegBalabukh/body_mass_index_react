import React, {Component} from 'react';

import InputForm from '../InputForm/InputForm';
import Table from '../Table/Table';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }
   
  getInput = (inputData) => {
    this.setState(inputData);
  }

  render() {
    const userData = this.state;
    return (
      <div className="container">
        <div className="inputForm">
          <InputForm inputData={this.getInput}/>
        </div>
        <div className="table">
          <Table user={userData}/>
        </div>
      </div>
    )
  }
}

export default Calculator;