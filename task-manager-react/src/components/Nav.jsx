import React from "react"
import "../../index.css"
import axios from "axios"
import { apiUrl } from "../services/apiUrl"
export default class Nav extends React.Component{

    handleLogout = () => {
        const url = apiUrl + "auth/logout"
        axios.post(url)
        .then(res => {
            console.log(res.data)
        })
    }

    render(){
        return(
            <nav className="nav">
                <div className="nav-user">
                    <h2 className="nav-logo">FW</h2>
                    <h3>Felipe Weigel Munioz</h3>
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

                <button onClick={this.handleLogout} className="nav-logout"><i className='bx bx-log-out-circle logout-logo'></i>Log out</button>
            </nav>
        )
    }
}