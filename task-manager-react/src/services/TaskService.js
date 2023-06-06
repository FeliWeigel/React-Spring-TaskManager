import axios from "axios";
import { apiUrl } from "./apiUrl"

export const addTask = (task) => {
    const URL = apiUrl + "task_list/add"
    let token = localStorage.getItem("access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.post(URL, task, config)
    .then(res => {
        return res.data
    })
}

export const deleteTask = (taskId) => {
    const URL = apiUrl + "task_list/delete/" + taskId 
    let token = localStorage.getItem("access_token")
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.delete(URL, config)
    .then(res => {
        console.log(res.data)
    })
}