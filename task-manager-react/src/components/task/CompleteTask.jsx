import axios from "axios";
import { apiUrl } from "../../services/apiUrl";
import { useState } from "react";

export default function CompleteTask({task}){

    function handleComplete() {
        const url = apiUrl + "task_list/task/complete";
        let token = localStorage.getItem("access_token");
        const completeBtn = document.getElementById("complete-btn")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.put(url, task, config)
            .then(res => {  
                location.reload()      
            })
    }
    
    return (
        <div>
            <button onClick={handleComplete} className="btn-complete">
                {task.isCompleted == false ? 
                <i id="complete-btn" className='bx bxs-check-circle action-complete completed'></i> 
                : <i class='bx bxs-x-circle action-complete incompleted'></i>}
            </button>
        </div>
    )
}