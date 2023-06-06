import axios from "axios";
import { apiUrl } from "../../services/apiUrl";
import "./AddTask.css"
import { Link, useParams } from "react-router-dom";
import Nav from "../Nav";
import React, { useState } from "react";

export default function UpdateTask(){
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    let taskUpdateId = useParams("taskId")

    async function handleOnChangeName (e) {
        await setTaskName(e.target.value)
        console.log(e.target.value)
    }

    async function handleOnChangeDate (e) {
        await setTaskDate(e.target.value)
        console.log(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault()
    }

    function handleUpdateTask(){
        const URL = apiUrl + "task_list/update" 
        let token = localStorage.getItem("access_token")
        let taskUpdated = {
            id: taskUpdateId.taskId,
            name: taskName,
            expirationDate: taskDate,
            isCompleted: false
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        console.log(taskUpdateId.taskId)

        axios.put(URL, taskUpdated, config)
        .then(res => {
            console.log(res.data)
        })
    }
    
    return (
        <section className="add-tasks">
            <Nav/>
            <div className='add-content update-content'>
                <form onSubmit={handleSubmit}>
                    <Link to="/"><i class='bx bx-undo back-logo'></i></Link>
                    <h3>Update task!</h3>
                    <label htmlFor="taskName">What should you do?</label>
                    <input onChange={handleOnChangeName} type="text" name='name' className='task-name' id='name' placeholder='Enter task to be done'/>
                  
                    <label htmlFor="taskDate">Task expiration date</label>
                    <input onChange={handleOnChangeDate} type="date" name='expirationDate' id='date' className='task-date'/>
                
                    <button onClick={handleUpdateTask}>Save</button>
                </form>
            </div>
        </section>
    )        


}