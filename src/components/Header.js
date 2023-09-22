// src\components\Header.js
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div style={{border: "1px solid red", backgroundColor: "lavender", minHeight: "70px"}}>
      <br />
      <NavLink to="/">Home Page</NavLink> &nbsp; | &nbsp; 
      <NavLink to="/task-add">Add a new Task</NavLink> &nbsp; | &nbsp; 
      <NavLink to="/task-list">Task List</NavLink> &nbsp; | &nbsp;
      <NavLink to="/task-board">Task Board</NavLink>
    </div>
  )
}

export default Header;
