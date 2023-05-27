import React from "react";
import { Link, Navigate } from "react-router-dom";
import { apiUrl } from "../../services/apiUrl";
import axios from "axios";

export default class Login extends React.Component{
    state = {
        form: {
            email: "",
            password: ""
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
        const url = apiUrl + "auth/login"
        axios.post(url, this.state.form)
        .then(res => {
            if(res.data !== null){
                console.log(res.data)
                localStorage.setItem("access_token", res.data.access_token)
                localStorage.setItem("refresh_token", res.data.refresh_token)
                this.setState({
                    error: false,
                    errorMsg: "user login!"
                })
            }
            console.log(res.data)
        })
        .catch((err) => {
            this.setState({
                error: true,
                errorMsg: "Invalid email or password. Check your credentials!"
            })
        })
    }

    render(){
        return (
            <section className='register'>
                <h2>Log in here!</h2>
                <form onSubmit={this.handleSubmit} className='register-form'>
                    <div className='flex-column'>
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handleChange} className='input-email register-input' type="email" name='email' required />
                    </div>
        
                    <div className='flex-column'>
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} type="password" className='login-input-pass register-input' name='password' required/>
                    </div>
                    {this.state.error == true && this.state.errorMsg !== "" ? <p className='error-alert'>{this.state.errorMsg}</p> : null}
                    {this.state.error == false && this.state.errorMsg === "user login!" ? <Navigate to="/"/> : null}
                    <button onClick={this.handleButton} className='form-btn'>Log in</button>
                </form>
                <Link to="/register"><button className="redirect-btn">You still do not have an account? Sign up here!</button></Link>
            </section>
        )
    }
}