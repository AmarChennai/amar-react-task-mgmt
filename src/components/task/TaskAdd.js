// src/components/task/TaskAdd.js        // This is to Create a new Task
import React from 'react'
import './TaskAdd.css'

class TaskAdd extends React.Component {
  state = {taskName:'', description:'', status:'', taskNameError:'', descriptionError:'', statusError:'', deadline:'', deadlineError:'', taskArray:[]};

  componentDidMount() {
    if (localStorage.getItem("taskArray") === null || localStorage.getItem("taskArray") === "") {
      localStorage.setItem("taskArray", JSON.stringify([]));
    } else {
      this.setState({taskArray:localStorage.getItem("taskArray")});
    }
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.validateTaskName() && this.validateDescription() && this.validateDeadline()) {
      // console.log("Submitted Form Values : ", this.state);
      let taskObject = {id:new Date().getTime(), taskName:this.state.taskName, description:this.state.description, 
        deadline:this.state.deadline, status:'open'
      }
      console.log("Submitted Form Object : ", taskObject);
      let tempArray = [];
      let localStorageTaskArray = JSON.parse(localStorage.getItem('taskArray') || []);
      tempArray = localStorageTaskArray;
      tempArray.push(taskObject);
      localStorage.setItem('taskArray', JSON.stringify(tempArray));
      console.log("localStorage.taskArray after push: ", JSON.parse(localStorage.getItem("taskArray")));
      window.location.pathname = '/task-list' // redirect to Task List page
    }
  };

  handleReset = () => {
    this.setState({taskName:'', description:'', status:'', taskNameError:'', descriptionError:'', statusError:'', deadline:'', deadlineError:''});
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

  render() {
    return (
      <div style={{margin:"0px 300px", border: "1px solid green", padding: "5px"}}>
      <form onSubmit={ this.handleSubmit }>
        <h1 style={{textAlign:'center'}}>Add a new Task</h1>
        <div className="form-group">
          <label htmlFor="taskName">Task Name :</label>
          <input type="text" placeholder="Enter Task Name" className="form-control" onBlur={this.validateTaskName}
            name="taskName" onChange={this.handleInputChange} value={this.state.taskName} />
          <div><span style={{color:"red"}}> {this.state.taskNameError}</span>&nbsp;</div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Task Description :</label>
          <input type="text" placeholder="Enter Task Description" className="form-control" onBlur={this.validateDescription}
            name="description" onChange={this.handleInputChange} value={this.state.description} />
          <div><span style={{color:"red"}}> {this.state.descriptionError}</span>&nbsp;</div>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline :</label>
          <input type="date" placeholder="Enter Deadline" className="form-control" onBlur={this.validateDeadline}
            name="deadline" onChange={this.handleInputChange} value={this.state.deadline} />
          <div><span style={{color:"red"}}> {this.state.deadlineError}</span>&nbsp;</div>
        </div><br/>
        <div className="form-group" style={{textAlign:'center'}}>
          <button type="submit" className="btn btn-primary">Submit</button> &nbsp;
          <button type="button" className="btn btn-warning" onClick={ this.handleReset }>Reset</button>
        </div>
      </form>

      </div>
    );
  }
}

export default TaskAdd
