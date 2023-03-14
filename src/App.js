import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import {
  Stack,
  Typography,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';


const App = () => {

  const [newTodo, setNewTodo] = useState({
    task: ""
  });
  const [todos, setTodos] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const addTask = () => {

    axios.post('http://localhost:8080/Todo', newTodo)
      .then(res => console.log(res.data))
    setNewTodo({ task: "" })
    fetchData()
  }

  function fetchData() {
    axios.get('http://localhost:8080/Todo')
      .then(res => setTodos(res.data))
    console.log(todos)
  }

  function deleteTask(id) {
    axios.delete(`http://localhost:8080/Todo/${id}`)
      .then(res => console.log(res.data))
    fetchData()
  }

  function selectTask(index) {
    let edit = todos[index]
    setTaskId(edit.id)
    setNewTodo({task:edit.task})
    setEdit(true)
  }

  function updateTask() {

    axios.put(`http://localhost:8080/Todo/${taskId}`, newTodo)
    fetchData()
    setNewTodo({task:""})
    setEdit(null)
  }

  return (
    <div className='App'>
      <Stack spacing={4}>
        <Typography variant='h3'>Todo App</Typography>
        <TextField
          label={edit ? "Edit Your Task" : "Enter New Task"}
          required value={newTodo.task}
          onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })} />

        <Button variant='contained' color='warning'
          onClick={
            edit ? updateTask : addTask
          }>
          {edit ? "Edit Task" : "Add Task"}
        </Button>



        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>TODOS</TableCell>
                <TableCell>Delete Task</TableCell>
                <TableCell>Edit Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                todos.map((todo, index) => (
                  <TableRow key={todo.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{todo.task}</TableCell>
                    <TableCell><Button onClick={() => { deleteTask(todo.id) }}><CloseRoundedIcon /></Button></TableCell>
                    <TableCell><Button onClick={() => { selectTask(index) }}><BorderColorRoundedIcon /></Button></TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

    </div>
  )
}

export default App