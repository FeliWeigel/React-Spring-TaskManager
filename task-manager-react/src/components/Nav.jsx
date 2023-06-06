import React, { useState } from "react"
import "../../index.css"
import axios from "axios"
import { apiUrl } from "../services/apiUrl"
import { Navigate } from "react-router-dom"

export default function Nav(){
    const [isLogged, setIsLogged] = useState(false)

    function handleLogout() {
        const url = apiUrl + "auth/logout"
        let token = localStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.post(url, config)
        .then(res => {
            localStorage.clear("access_token")
            location.reload()
        })
    }

    return(
        <nav className="nav">
            <div className="nav-user">
                <h2 className="nav-logo">ABC</h2>
                <h3>Username</h3>
            </div>
            <ul className="nav-menu">
                <li className="nav-link">
                    <i className='bx bx-home'></i>Home
                </li>
                <li className="nav-link">
                    <i className='bx bx-notepad nav-link-logo'></i>
                    <select required className="nav-select">
                        <option selected disabled>Tasks</option>
                        <option value="History">History</option>
                        <option value="History">Pending</option>
                        <option value="History">Completed</option>
                    </select>
                </li>
                <li className="nav-link">
                    <i className='bx bx-cog'></i>Configuration
                </li>
            </ul>

            <button onClick={handleLogout} className="nav-logout"><i className='bx bx-log-out-circle logout-logo'></i>Log out</button>
        </nav>
    )
}