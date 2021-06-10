import {React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const name = 'Task Tracker'
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3001/tasks')
    const data = await res.json()

    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`)
    const data = await res.json()

    return data;
  }

  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 10000) + 1

    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...task, id})
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  const onDeleteTask = (id) => {
    setTasks(deleteTask(id, tasks))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task))
  }

  return (
    <Router>
      <div className="container">
        <Header showAddTask={showAddTask} onAdd={ () => setShowAddTask(!showAddTask) } title={name}></Header>
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}></AddTask>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={onDeleteTask} onToggle={toggleReminder}></Tasks> : 'No Tasks'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer></Footer>
      </div>  
    </Router>
  );
}

export default App;
