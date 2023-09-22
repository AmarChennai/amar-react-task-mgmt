// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import HomePage     from './components/HomePage'
import Header       from './components/Header'
import Footer       from './components/Footer'
import PageNotFound from './components/PageNotFound'
import TaskList     from './components/task/TaskList'
import TaskAdd      from './components/task/TaskAdd'
import TaskEdit     from './components/task/TaskEdit'
import TaskBoard     from './components/task/TaskBoard'

function App() {
  return (
    <Router>
      <Header />
      <div style={{border: "1px solid green", backgroundColor: "lightyellow", minHeight: "425px", padding: "0px 2px"}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task-add" element={<TaskAdd />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/task-edit/:id" element={<TaskEdit />} />
          <Route path="/task-board" element={<TaskBoard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
