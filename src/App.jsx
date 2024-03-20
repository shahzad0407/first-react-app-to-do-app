import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const toggleCompleted = (e) => {
    setShowCompleted(!showCompleted)
  }
  


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleSave = () => {
    setTodos([...todos, { todo, isCompleted: false, uuid: uuidv4() }])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e) => {
    let edited = [...todos];
    let id = e.target.name;
    let index = edited.findIndex((item) => item.uuid == id);
    edited.splice(index, 1)
    setTodo(edited[index].todo)
    setTodos(edited)
    saveToLS()
  }

  const handleDelete = (e) => {
    let deleteTodo = [...todos];
    let id = e.target.name;
    let index = deleteTodo.findIndex((item) => item.uuid == id);
    deleteTodo.splice(index, 1);
    setTodos(deleteTodo);
    saveToLS()
  }

  const toggleChange = (e) => {
    let toggleTodo = [...todos];
    let index = toggleTodo.findIndex((item) => item.uuid == e.target.name);
    toggleTodo[index].isCompleted = !toggleTodo[index].isCompleted;
    setTodos(toggleTodo);
    saveToLS()
  }


  return (
    <>
      <div className='flex items-center justify-center'>
        <div className='w-2/4 shadow-lg h-[80vh]  flex flex-col items-center bg-gray-500 text-white rounded-md'>
          <h1 className='font-extrabold text-3xl my-4 '>To Do List</h1>
          <input onChange={toggleCompleted} value={todo} className='rounded-full w-5/6 text-black'></input>
          <button onClick={handleSave} disabled={todo.length<3} className='bg-indigo-700 text-sm px-2 py-1 my-2 rounded-md'>Save</button>
          <div className='flex items-center'>
            <input onChange={toggleCompleted} checked={showCompleted} type="checkbox" name="" />
            <div>Completed</div>
          </div>
          {todos.map((item) => {
            return (showCompleted || !item.isCompleted) && <div key={item.uuid} className='items-center justify-between w-11/12 m-2 h-[6vh] rounded-md bg-black flex'>

              <div className='flex gap-2 mx-2'>
                <input onChange={toggleChange} type="checkbox" name={item.uuid} />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div>
                <button name={item.uuid} onClick={handleEdit} className='bg-indigo-700 text-sm px-2 py-1 rounded-md'>Edit</button>
                <button name={item.uuid} onClick={handleDelete} className='bg-indigo-700 text-sm px-2 py-1 m-3 rounded-md'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App