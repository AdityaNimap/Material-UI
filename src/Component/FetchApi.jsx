import React, { useEffect, useState } from 'react'
import './Api.css'
const FetchApi = () => {
    const [allTask, setAllTask] = useState([]);
    const [task, setTask] = useState("");
    const [update, setUpdate] = useState(false);
    const [add, setAdd] = useState(true);
    const [taskId,setTaskId] = useState(null)
    useEffect(() => {
        fetchData();

    }, [])
    function fetchData() {
        fetch("http://localhost:8080/Todo")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setAllTask(data)
            })
    }
    function addTask() {
        let data = { task }
        console.log(data)
        fetch("http://localhost:8080/Todo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(resp => console.log(resp))
            setTask("")
        fetchData()
    }
    function deleteTask(id) {
        fetch(`http://localhost:8080/Todo/${id}`, {
            method: 'DELETE'
        })
        fetchData()
    }
    function selectTask(id) {
        
        let item = allTask[id-1]
        setTask(item.task)
        setTaskId(item.id)
        setUpdate(!update)
        setAdd(!add)
    }
    function updateUser(){
        let data = {task,taskId}
        fetch(`http://localhost:8080/Todo/${taskId}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        fetchData()
        setUpdate(!update)
        setAdd(!add)
        setTask("")
    }
    return (
        <div className='main'>
            <h2>TODO LIST</h2>
            <div className="card">
                {
                    add && <div className='input'>
                        <input type='text' name='task' value={task} onChange={(e) => setTask(e.target.value)} />
                        <button onClick={addTask}>Add Task</button>
                        </div>
                }
                {
                    update && <div className='input'>
                        <input type='text' name='updateTask' value={task} onChange={(e) => setTask(e.target.value)} />
                        <button onClick={updateUser}>update</button>
                    </div>

                }
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Task</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTask.map((item) => {
                                return <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.task}</td>

                                    <td><button onClick={() => deleteTask(item.id)}>Delete</button></td>
                                    <td><button onClick={() => selectTask(item.id)}>Edit</button></td>
                                </tr>
                            })

                        }
                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default FetchApi
