import { useState, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./components/About";
import Home from "./components/Home";

function App() {
  const [tasks,setTasks] = useState([]);
  const [pageTitle,setPageTitle] = useState([
    {
      location: '/',
      title: 'Home'
    },
    {
      location: '/about',
      title: 'About'
    }
  ]);
  useEffect(()=>{
      const getTasks = async ()=>{
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }

      getTasks()
  },[]);

  //Fetch Tasks
  
  const fetchTasks = async ()=> {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data;
  }

  //Fetch Task
  
  const fetchTask = async (id)=> {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }

  //show add form 
  const [showAddTask, setShowAddTask] = useState(false);

  const showAddForm = ()=>{
     setShowAddTask(!showAddTask);
  }

  // Add Task
  const addTask = async (task) =>{
      // console.log(task);
      // const id = tasks.length + 1
      // const newTask = { id,...task }
      // setTasks([...tasks,newTask])
      const res = await fetch('http://localhost:5000/tasks',{
        method:'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify(task)
      })
      const data = await res.json()
      setTasks([...tasks, data])

  }

  // delete Task

  const deleteTask= async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  // toggle Reminder

  const toggleReminder = async (id) => {
    const taskToToggel = await fetchTask(id);
    const updTask = {...taskToToggel, reminder: !taskToToggel.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)
    })
    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }
  return (
    <Router>
      
      <div className="container">
        <Header title={"Task Traker"}  pageTitle={pageTitle} showForm = {showAddForm} showAddTask={showAddTask}/>
       
        <Routes>
          <Route path='/' element={
            <Home 
              addTask={addTask} 
              tasks={tasks} 
              showAddTask={showAddTask}
              deleteTask={deleteTask} toggleReminder={toggleReminder}
              
            />
            } /> 

          <Route path='about' element={<About />} />
        </Routes>

        <Footer />
      </div>
     
    </Router>
  );
}

export default App;
