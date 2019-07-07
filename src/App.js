import React, {Component} from 'react';
import './App.css';

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
    ;   
  } 
  handleHeight = ({target:{value}}) => this.setState({height: value});
  handleWeight = ({target:{value}}) => this.setState({weight: value});
  handleName = ({target:{value}}) => this.setState({name: value});

  calculateIndex = () => {
    const {height, weight, userData, id} = this.state;
    let index = (parseInt(weight) / Math.pow(parseInt(height)/100, 2))
                .toFixed(1);     
    this.setState({bmi: index});

    Object.keys(userData).length || id > 1 ? this.setState({id: ++nextId}) : nextId = 1;

    this.setState({type: this.setType(index)});
    setTimeout(this.handleState, 50);  
  }

  setType = (index) => {   
    let bmiType;
    if (index) {
      let floatNum = parseInt(index);      
      switch (true) {
        case floatNum <= 18.5:          
          bmiType = "Underweight"
          break;
        case floatNum <= 24.9:          
          bmiType = "Normal"
          break;
        case floatNum <= 29.9:          
          bmiType = "Overweight"
          break;
        case floatNum >= 30:          
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
    this.props.callbackFromParent(this.state);
  }

  getMessage = (index) => {
    let message;    
    if (index) {
      let floatNum = parseInt(index);      
      switch (true) {
        case floatNum <= 18.5:
          message = "Underweight, Your BMI is ";         
          break;
        case floatNum <= 24.9:
          message = "Normal, Your BMI is ";         
          break;
        case floatNum <= 29.9:
          message = "Overweight, Your BMI is ";         
          break;
        case floatNum >= 30:
          message = "Obesity, Your BMI is ";          
          break;
        default:
          message = "Please, enter valid data";
      }      
      return message; 
    }
    return "";    
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
    const {bmi, name, height, weight} = this.state;
    const enabled = name && height && weight ;
    return (      
      <div>
        <h2>Healthy Weight Calculator</h2>
        <h3>Body Mass Index (BMI)</h3>
        <h3 className = "index">{this.getMessage(bmi) + " " + bmi}</h3>
        <form>          
          <label>
            Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="input" type="text" value={name} onChange={this.handleName} />
          </label>
          </form>
          <form>          
            <label>
              Height (sm)&nbsp;&nbsp;
              <input className="input" type="number" value={height} onChange={this.handleHeight} />
            </label>
          </form>
        <form>
          <label>
            Weight (kg)&nbsp;
            <input className="input weight" type="number" value={weight} onChange={this.handleWeight}/>
          </label>                  
        </form>
        <button  disabled={ !enabled } onClick={ this.calculateIndex }>Calculate</button><br></br>
        <button onClick={ this.resetState }>Reset</button>
        <button onClick={ this.handleResetAll }>Reset All</button>
      </div>
    );
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRows: []
    };
  }
 
  getTableData = (prevProps) => {
    const {tableRows} = this.state;
    const {userData} = this.props.user;
    let {id: currentID} = this.props.user.userData;
    let previousID;

    prevProps.user ? previousID = prevProps.user.userData.id : previousID = 0;

    Object.keys(userData).length === 0 ? 
    previousID !== currentID && this.setState({ tableRows: [] }) :
    previousID !== currentID && this.setState({ tableRows: [...tableRows, userData] });
    // console.log("Prev_props: ", prevProps);
    // console.log("Prev_state: ", prevState);
    // console.log("Prev_id: ", previousID);
    // console.log("Curr_id: ", currentID);
  }

  componentDidUpdate(prevProps, prevState) {
    this.getTableData(prevProps);
  }

  setTableData = () => {
    const {tableRows} = this.state;    
      return tableRows.map( ({id, name, height, weight, bmi, type}) => {
        return (
          <tr key = {id}>
            <td className="id">{id}</td>
            <td className="name">{name}</td>
            <td>{height}</td> 
            <td>{weight}</td>
            <td>{bmi}</td>
            <td>{type}</td>
          </tr>
        )
      }) 
  }

  render() {
    return (
      <div>
        <table border={1}>
        <tbody>
          <tr>
            <th className="id">ID</th>
            <th>Name</th>
            <th>Height</th> 
            <th>Weight</th>
            <th>BMI</th>
            <th>Type</th>
          </tr>
          {this.setTableData()}
          </tbody>         
        </table>
      </div>
    )
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }
   
  myCallback = (dataFromChild) => {    
    this.setState(dataFromChild);  
  }  

  render() {
    const userData = this.state;
    return (
      <div>
        <div className="inputForm">        
          <InputForm callbackFromParent={this.myCallback}/>      
        </div>
        <div className="table">
          <Table user={userData}/>
        </div>
      </div>
    )
  }  
}

function App() {
  return (
    <div className="wrapper">
      <Calculator />      
    </div>
  )
}

export default App;