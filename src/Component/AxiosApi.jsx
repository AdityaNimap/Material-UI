import React, { useEffect, useState } from 'react'
import axios from 'axios'
const AxiosApi = () => {
    const [allTask, setAllTask] = useState([]);
    const [task, setTask] = useState("");
    const [update, setUpdate] = useState(false);
    const [add, setAdd] = useState(true);
    const [taskId, setTaskId] = useState(null)

    useEffect(() => {
        fetchData();

    }, [])

    function fetchData() {
        axios
            .get("http://localhost:8080/Todo")
            .then((resp) => {
                console.log(resp.data)
                setAllTask(resp.data)
            })

    }

    function addTask() {
        let data = { task }
        console.log(data)
        axios.post("http://localhost:8080/Todo", { task })
            .then(resp => console.log(resp))
        setTask("")
        fetchData()
    }

    function deleteTask(id) {
        axios.delete(`http://localhost:8080/Todo/${id}`)
        fetchData()
    }

    function selectTask(id) {

        let item = allTask[id - 1]
        setTask(item.task)
        setTaskId(item.id)
        setUpdate(!update)
        setAdd(!add)
    }

    function updateUser() {
        // let data = {task,taskId}
        axios.put(`http://localhost:8080/Todo/${taskId}`, {
            task,
            id: taskId
        })
        fetchData()
        setUpdate(!update)
        setAdd(!add)
        setTask("")
    }
    return (
        <div>
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
        </div>
    )
}

export default AxiosApi
