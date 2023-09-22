// src/components/task/TaskEdit.js        // This is to edit an existing Task
import React from 'react';
// import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TaskEdit.css'

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}

class TaskEdit extends React.Component {
  state = { id: '', taskName: '', description: '', status: '', deadline: '', redirect: null };

  componentDidMount() {
    // console.log("id")
    // console.log(this.props.params.id)
    let tempArray = [];
    let localStorageTaskArray = JSON.parse(localStorage.getItem('taskArray') || []);
    tempArray = localStorageTaskArray;
    const filteredArray = tempArray.filter((task) => task.id === Number(this.props.params.id));
    // console.log("filteredArray : ", filteredArray);
    this.setState({ 
      id: filteredArray[0].id,
      taskName: filteredArray[0].taskName, 
      description: filteredArray[0].description,
      deadline: filteredArray[0].deadline,
      status: filteredArray[0].status });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.taskName.trim() && this.state.description.trim()) {
      console.log("TaskEdit, this.state : ", this.state);
      let tempArray = [];
      let localStorageTaskArray = JSON.parse(localStorage.getItem('taskArray') || []);
      tempArray = localStorageTaskArray;

      for (var i in tempArray) {
        if (tempArray[i].id === Number(this.props.params.id)) {
          tempArray[i].taskName = this.state.taskName;
          tempArray[i].description = this.state.description;
          tempArray[i].deadline = this.state.deadline;
          tempArray[i].status = this.state.status;
           break; //Stop this loop, we found it!
        }
      }
      localStorage.setItem('taskArray', JSON.stringify(tempArray));
      window.location.pathname = '/task-list' // redirect to Task List page
    }
  };

  validateTaskName = () => {
    let isValid = true;
    let taskName = this.state.taskName.trim();
    this.setState({taskNameError: ''});

    if(!taskName) {
      isValid = false;
      this.setState({taskNameError: "Task name can not be empty!"});
    } else if(taskName.length < 3) {
      isValid = false;
      this.setState({taskNameError: "Task name should be minimum 3 characters long!"});
    }
    return isValid;
  }

  validateDescription = () => {
    let isValid = true;
    let description = this.state.description.trim();
    this.setState({descriptionError: ''});

    if(!description) {
      isValid = false;
      this.setState({descriptionError: "Task Description can not be empty!"});
    }
    return isValid;
  }

  validateDeadline = () => {
    let isValid = true;
    let deadline = this.state.deadline.trim();
    this.setState({deadlineError: ''});

    if(!deadline) {
      isValid = false;
      this.setState({deadlineError: "Deadline can not be empty!"});
    }
    return isValid;
  }

  validateStatus = () => {
    let isValid = true;
    let status = this.state.status.trim();
    this.setState({statusError: ''});

    if(!status) {
      isValid = false;
      this.setState({statusError: "Status can not be empty!"});
    } else if((status !== 'open') && (status !== 'progressing') && (status !== 'testing') && (status !== 'done')) {
      isValid = false;
      this.setState({statusError: "Please enter one among (open / progressing / testing / done)!"});
    }
    return isValid;
  }

  render() {
    return (
    <div style={{margin:"0px 300px", border: "1px solid green", padding: "5px"}}>
      <form onSubmit={ this.handleSubmit }>
        <h1 style={{textAlign:'center'}}>Edit Task</h1>
        <div className="form-group">
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" placeholder="Enter Task Name" className="form-control" onBlur={this.validateTaskName}
            name="taskName" onChange={this.handleInputChange} value={this.state.taskName} />
          <div><span style={{color:"red"}}> {this.state.taskNameError}</span>&nbsp;</div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description:</label>
          <input type="text" placeholder="Enter Description" className="form-control" onBlur={this.validateDescription}
            name="description" onChange={this.handleInputChange} value={this.state.description} />
          <div><span style={{color:"red"}}> {this.state.descriptionError}</span>&nbsp;</div>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline :</label>
          <input type="date" placeholder="Enter Deadline" className="form-control" onBlur={this.validateDeadline}
            name="deadline" onChange={this.handleInputChange} value={this.state.deadline} />
          <div><span style={{color:"red"}}> {this.state.deadlineError}</span>&nbsp;</div>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status: (open / progressing / testing / done)</label>
          <input type="text" placeholder="Enter Status" className="form-control" onBlur={this.validateStatus}
            name="status" onChange={this.handleInputChange} value={this.state.status} />
          <div><span style={{color:"red"}}> {this.state.statusError}</span>&nbsp;</div>
        </div><br/>
        <div className="form-group" style={{textAlign:'center'}}>
          <button type="submit" className="btn btn-primary">Update</button> &nbsp;
        </div>
      </form>
    </div>
    );
  }
}

//export default TaskEdit;
const HOCTaskEdit = withRouter(TaskEdit);// HOC - Higher Order Component

export default HOCTaskEdit;
