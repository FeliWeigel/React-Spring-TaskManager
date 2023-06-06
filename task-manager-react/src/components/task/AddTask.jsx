import React from 'react'
import Nav from '../Nav'
import "../../../index.css"
import "./AddTask.css"
import { addTask } from '../../services/TaskService'
import { Link } from 'react-router-dom'

export default class AddTask extends React.Component{
  state = {
    task: {
      name: "",
      expirationDate: "",
      isCompleted: false
    },
    errorName: false,
    errorDate: false,
    errorMsg: ""
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  handleChange = async e => {
    await this.setState({
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value
      }
    })
  }

  addTaskToList = () => {
    const inputName = document.getElementById("name");
    const inputDate = document.getElementById("date");
    let date = new Date();

    if(this.state.task.name == ""){
      this.setState({
        errorName: true,
        errorMsg: "Careful! This field cannot be null"
      })
      inputName.classList.add('invalid-input')
    }else{
      this.setState({
        errorName: false
      })
      inputName.classList.remove('invalid-input')
    }

    if(this.state.task.expirationDate == ""){
      this.setState({
        errorDate: true,
        errorMsg: "Careful! This field cannot be null"
      })
      inputDate.classList.add('invalid-input')
    }else {
      this.setState({
        errorDate: false
      })
      inputDate.classList.remove('invalid-input')
    }

    addTask(this.state.task)
  }


  render(){
    return (
      <section className='add-tasks'>
          <Nav/>
          <div className='add-content'>
              <form onSubmit={this.handleSubmit}>
                <Link to="/"><i class='bx bx-undo back-logo'></i></Link>
                <h3>Add a new task!</h3>

                <label htmlFor="taskName">What should you do?</label>
                <input onChange={this.handleChange} type="text" name='name' className='task-name' id='name' placeholder='Enter task to be done'/>
                  {this.state.task.name == "" && this.state.errorName == true ? <p className='error-msj'>{this.state.errorMsg}</p> : null}
                  
                <label htmlFor="taskDate">Task expiration date</label>
                <input onChange={this.handleChange} type="date" name='expirationDate' id='date' className='task-date'/>
                  {this.state.task.expirationDate == "" && this.state.errorDate == true ? <p className='error-msj'>{this.state.errorMsg}</p> : null}
              
                <button onClick={this.addTaskToList}>Save</button>
              </form>
          </div>
      </section>
    )
  }
}
