// src/components/task/TaskList.js
import React from 'react'
import './TaskList.css'
// import axios from 'axios';
import { Link } from "react-router-dom";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tasks: []};
  }

  componentDidMount() {
    if (localStorage.getItem("taskArray") === null || localStorage.getItem("taskArray") === "") {
      localStorage.setItem("taskArray", JSON.stringify([]));
    } else {
      this.setState({tasks:JSON.parse(localStorage.getItem("taskArray"))});
    }

  }

  delete = (record) => {
    if(window.confirm(`Are you sure to delete the record with Task Name = ${record.taskName}?`)) {
      let tempArray = [];
      let localStorageTaskArray = JSON.parse(localStorage.getItem('taskArray') || []);
      tempArray = localStorageTaskArray;
      const filteredArray = tempArray.filter((task) => task.id !== record.id);
      localStorage.setItem('taskArray', JSON.stringify(filteredArray));
      console.log("localStorage.taskArray after filter: ", JSON.parse(localStorage.getItem("taskArray")));
      this.setState({tasks:JSON.parse(localStorage.getItem("taskArray"))});
    }
  }

  render() {
    return (
    <div className="table-responsive">
      <h3 align="center">Task List</h3>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr><th>Task Name</th><th>Task Description</th><th>Status</th><th>Deadline</th><th className="center">Edit</th><th className="center">Delete</th></tr>
        </thead>
        <tbody>
        {this.state.tasks.map(record => {
          return <tr key={record.id}>
            <td>{record.taskName}</td>
            <td>{record.description}</td>
            <td>{record.status}</td>
            <td>{record.deadline}</td>
            <td className="center"><Link to={"/task-edit/"+record.id}><i className="fa fa-pencil-square-o" style={{fontSize:"20px", color:"#007BFF"}} title="Edit"></i></Link></td>
            <td className="center"><i onClick={() => this.delete(record)} className="fa fa-trash" style={{fontSize:"20px", color:"red"}} title="Delete"></i></td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
    );
  }
}

export default TaskList
