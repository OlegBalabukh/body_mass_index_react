import React, {Component} from 'react';

let nextId = 1;
const initialState = {
  id: nextId,
  name: "",
  height: "",
  weight: "",
  bmi: "",
  type: "",
  resetAll: false,
  userData: {}
};

class InputForm extends Component {
   
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  handleHeight = ({target:{value}}) => this.setState({height: value});
  handleWeight = ({target:{value}}) => this.setState({weight: value});
  handleName = ({target:{value}}) => this.setState({name: value});

  calculateIndex = () => {
    const {height, weight, userData, id} = this.state;
    let BMI = (parseInt(weight) / Math.pow(parseInt(height)/100, 2)).toFixed(1);
    this.setState({bmi: Number(BMI)});

    Object.keys(userData).length || id > 1
      ? this.setState({id: ++nextId})
      : nextId = 1;

    this.setState({type: this.setType(Number(BMI))});
    setTimeout(this.handleState, 50);
  }  

  setType = (BMI) => {
    let bmiType;
    if (BMI) {
      switch (true) {
        case BMI <= 18.5:
          bmiType = "Underweight"
          break;
        case BMI <= 24.9:
          bmiType = "Normal"
          break;
        case BMI <= 29.9:  
          bmiType = "Overweight"
          break;
        case BMI >= 30:
          bmiType= "Obesity"
          break;
        default:
          bmiType = "Wrong input";
      }      
      return bmiType;
    }
    
    return "";
  }

  handleState = () => {
    if (this.state && this.state.resetAll === false) {
      this.setState({
        userData: {
          id: this.state.id,
          name: this.state.name,
          height: this.state.height,
          weight: this.state.weight,
          bmi: this.state.bmi,
          type: this.state.type
        }
      });
    }
    if (this.state.resetAll) {
      this.setState({...initialState});
    }
    this.props.inputData(this.state);
  }

  resetState = () => {
    this.setState({...initialState});
    this.setState({id: nextId});
  }
  
  handleResetAll = () => {
    this.setState({resetAll: true, id: 1});
    setTimeout(this.handleState, 50);
  }

  render() {
    const {bmi, name, height, weight, type} = this.state;
    const enabled = name && height && weight ;
    return (
      <div>
        <h4>Healthy Weight Calculator</h4>
        <h5>Body Mass Index (BMI)</h5>
        <h5 className = "index">{ type && type + ", Your BMI is " + bmi }</h5>
        <div id="inputSection">
          <form id="nameForm">
            <label>
              <span className="input">Name</span>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={this.handleName}
              />
            </label>
            </form>
            <form>
              <label>
                <span className="input">Height (sm)</span>
                <input
                  className="form-control"
                  type="number"
                  value={height}
                  onChange={this.handleHeight}
                />
              </label>
            </form>
          <form>
            <label>
              <span className="input">Weight (kg)</span>
              <input
                type="text"
                className="form-control"
                value={weight}
                onChange={this.handleWeight}
              />
            </label>
          </form>
        </div>
        <div id="buttonSection">
          <button
            className="btn btn-success"
            type="button"
            disabled={ !enabled }
            onClick={ this.calculateIndex }
          > Calculate
          </button>
          <button
            className="btn btn-warning"
            onClick={ this.resetState }
          > Reset
          </button>
          <button
            className="btn btn-danger"
            onClick={ this.handleResetAll }
          > Reset All
          </button>
        </div>
      </div>
    );
  }
}

export default InputForm;