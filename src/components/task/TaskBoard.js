// src/components/task/TaskBoard.js
import React from 'react'
// import axios from 'axios';
import './TaskBoard.css'

class TaskBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tasks: []};
  }

  componentDidMount() {
    // axios.get('http://localhost:5555/tasks')
    //   .then(response => {
    //     this.setState({ tasks: response.data });
    //     console.log(this.state.tasks);
    //   })
    //   .catch(error => console.log(error))
    if (localStorage.getItem("taskArray") === null || localStorage.getItem("taskArray") === "") {
      localStorage.setItem("taskArray", JSON.stringify([]));
    } else {
      this.setState({tasks:JSON.parse(localStorage.getItem("taskArray"))});
    }

  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  
  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  render() {
    return (
    <div className='container-fluid'>
    <h1 className='center'>TaskBoard</h1>
    <div className='row'>
      <div className='col-md-3' style={{border: "1px solid red", minHeight: "300px"}} id="div1" onDrop={this.drop} onDragOver={this.allowDrop}>
        <h4 className='center'>Open Tasks</h4>
        {this.state.tasks.map(record => {
          if(record.status === 'open') {
            return <p key={record.id} id={record.id} style={{border: "1px solid aqua"}} draggable="true" onDragStart={this.drag}>
                     <span style={{color: "blue"}}>{record.taskName}</span> - <span style={{color: "red"}}>{record.status}</span>
                   </p>
          } else {
            return <></>
          }
        })}
      </div>
      <div className='col-md-3' style={{border: "1px solid grey"}} id="div2" onDrop={this.drop} onDragOver={this.allowDrop}>
        <h4 className='center'>In Progress</h4>
        {this.state.tasks.map(record => {
          if(record.status === 'progressing') {
            return <p key={record.id} id={record.id} style={{border: "1px solid aqua"}} draggable="true" onDragStart={this.drag}>
                     <span style={{color: "blue"}}>{record.taskName}</span> - <span style={{color: "red"}}>{record.status}</span>
                   </p>
          } else {
            return <></>
          }
        })}
      </div>
      <div className='col-md-3' style={{border: "1px solid blue"}} id="div3" onDrop={this.drop} onDragOver={this.allowDrop}>
        <h4 className='center'>Testing</h4>
        {this.state.tasks.map(record => {
          if(record.status === 'testing') {
            return <p key={record.id} id={record.id} style={{border: "1px solid aqua"}} draggable="true" onDragStart={this.drag}>
                     <span style={{color: "blue"}}>{record.taskName}</span> - <span style={{color: "red"}}>{record.status}</span>
                   </p>
          } else {
            return <></>
          }
        })}
      </div>
      <div className='col-md-3' style={{border: "1px solid green"}} id="div4" onDrop={this.drop} onDragOver={this.allowDrop}>
        <h4 className='center'>Completed</h4>
        {this.state.tasks.map(record => {
          if(record.status === 'done') {
            return <p key={record.id} id={record.id} style={{border: "1px solid aqua"}} draggable="true" onDragStart={this.drag}>
                     <span style={{color: "blue"}}>{record.taskName}</span> - <span style={{color: "red"}}>{record.status}</span>
                   </p>
          } else {
            return <></>
          }
        })}
      </div>
    </div>
    </div>
    )
  }
}

export default TaskBoard
