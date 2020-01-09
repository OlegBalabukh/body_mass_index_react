import React, {Component} from 'react';

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

    prevProps.user
      ? previousID = prevProps.user.userData.id
      : previousID = 0;

    Object.keys(userData).length === 0
      ? previousID !== currentID && this.setState({ tableRows: [] })
      : previousID !== currentID && this.setState({ tableRows: [...tableRows, userData] });
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
        <table>
        <tbody>
          <tr>
            <th className="id">ID</th>
            <th className="name">Name</th>
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

export default Table;