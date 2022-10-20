import React from "react";
import './app-title.css'

const AppTitle = ({toDo, done}) => {
    return (
      <div className="app-header d-flex">
        <h1>My Todo List</h1>
        <h2>{toDo} more to do, {done}</h2>
      </div>
      
    )
}

export default AppTitle;