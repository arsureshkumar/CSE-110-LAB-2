import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "./App.css";
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { StickyNotes } from "./stickyNotes";
import { Navbar } from "./navbar";

const App = () => {
 return (
   <div>
    <Navbar />
     <Routes>
       <Route path="/" element={<StickyNotes />} />
       <Route path="/todolist/:name" element={<ToDoList />} />
       <Route path="*" element={<h1>something</h1>} />
     </Routes>
   </div>
 );
};

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
