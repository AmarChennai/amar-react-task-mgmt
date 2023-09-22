// src\components\HomePage.js
import { useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    console.log("localStorage.taskArray: ", JSON.parse(localStorage.getItem("taskArray")));
  }, []);

  function clearLocalStorage() {
    localStorage.clear()
  }

  return (
    <>
    <h1>Home Page</h1>
    <button onClick={clearLocalStorage}>Clear Local Storage Completely</button>
    </>
  )
}

export default HomePage;
