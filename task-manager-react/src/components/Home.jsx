import Nav from "./Nav";
import "./Home.css"
import React from "react";;
import { apiUrl } from "../services/apiUrl";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends React.Component{
    state = {
        tasks: [],
    }    

    componentDidMount(){
        const url = apiUrl + "task_list/all";
        let token = localStorage.getItem("access_token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(url, config)
        .then(res => { 
            this.setState({
                tasks: res.data
            })
        })
    }

    render(){
        return(
            <div className="home">
                <Nav/>
                <div className="home-content">
                    <h2>Manage your tasks!</h2>
                    <table className="table">
                        <caption>Task table</caption>
                        <thead>
                            <tr className="table-head-row">
                                <th></th>
                                <th>Name</th>
                                <th>Expiration Date</th>
                                <th>State</th>
                                <th className="actions-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.length !== 0 ?  this.state.tasks.map((task) => {
                        
                                return(
                                    <tr className="table-body-row">
                                        <td className="td-id">{task.id}</td>
                                        <td className="td-name">{task.name}</td>
                                        <td className="td-expiration">{task.expirationDate}</td>
                                        <td className="td-state">{task.isCompleted === false ? "Pendiente" : "Completada"}</td>
                                        <td className="table-actions">
                                            <Link to="tasks/add"><i className='bx bx-list-plus action action-add'></i></Link>
                                            <i className='bx bxs-edit action action-edit'></i>
                                            <i className='bx bxs-trash action action-delete'></i>
                                        </td>
                                    </tr>
                                )
                            }) : (
                                <div className="list-alert">
                                    <h3>The task manager is empty. Add a new task!</h3>
                                    <Link to="tasks/add"><i class='bx bxs-plus-circle'></i></Link>
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}