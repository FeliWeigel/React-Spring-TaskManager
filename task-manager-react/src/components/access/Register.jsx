import axios from 'axios';
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { apiUrl } from '../../services/apiUrl';

export default class Register extends React.Component {
    state = {
        form: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            repeatPassword: ""
        },
        error: false,
        errorMsg:  ""
    }  

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(e.target.value)
    }

    handleButton = () => {
        const url = apiUrl + "auth/register"
        axios.post(url, this.state.form)
        .then(res => {
            if(res.data !== null){
                this.setState({
                    error: false,
                    errorMsg: "user save!"
                })
            }
            console.log(res.data)
        })
        .catch((err) => {
            this.setState({
                error: true,
                errorMsg: err.response.data.message
            })
        })
    }

    render(){
        return (
            <section className='register'>
                <h2>First step, register!</h2>
                <form onSubmit={this.handleSubmit} className='register-form'>
                    <div className='div-name'>
                        <div className='flex-column'>
                            <label htmlFor="firstname">Firstname</label>
                            <input onChange={this.handleChange} className='input-firstname register-input' type="text" name='firstname' required />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor="lastname">Lastname</label>
                            <input onChange={this.handleChange} className='input-lastname register-input' type="text" name='lastname' required />
                        </div>
                    </div>
        
                    <div className='flex-column'>
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handleChange} className='register-input' type="email" name='email' required />
                    </div>
        
                    <div className='div-password'>
                        <div className='flex-column'>
                            <label htmlFor="password">Password</label>
                            <input onChange={this.handleChange} type="password" className='input-password register-input' name='password' required/>
                        </div>
                        <div className='flex-column'>
                            <label htmlFor="repeatPassword">Repeat Password</label>
                            <input onChange={this.handleChange} type="password" className='input-repeat register-input' name='repeatPassword' required/>
                        </div>
                    </div>
                    {this.state.error == true && this.state.errorMsg !== "" ? <p className='error-alert'>{this.state.errorMsg}</p> : null}
                    <button onClick={this.handleButton} className='form-btn'>Register</button>
                </form>
                <Link to="/login"><button className="redirect-btn">Do you already have an account? Log in here</button></Link>
            </section>
        )
    }
}
