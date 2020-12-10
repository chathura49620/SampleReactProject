import React, { Component } from "react";
import Axios from "axios";
import axios from "axios";

export default class SignUp extends Component {
    state ={
        first_name:'',
        last_name:'',
        gender:'',
        email:'',
        number:'',
        password:''
    }

    async handleFormSubmit(event){
        event.preventDefault();
        let first_name = this.state.first_name
        let last_name = this.state.last_name
        let gender = this.state.gender
        let email = this.state.email
        let number = this.state.number
        let password = this.state.password

        try{
            const res = await axios.post('http://localhost:4000/api/users',{
                first_name,
                last_name,
                gender,
                email,
                number,
                password,

            });
            console.log(res)
            if(res){
                this.props.history.push('/sign-in');
            }
        }catch (err){
            console.log("Error Occurred")
        }
    }
    render() {
        const {first_name,last_name,gender,email,number,password} = this.state;
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">

            <form onSubmit={event => this.handleFormSubmit(event)}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        name="first_name"
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={first_name}
                        onChange={ event => this.setState({first_name: event.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        name="last_name"
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={ event => this.setState({last_name: event.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <input
                        name="gender"
                        type="text"
                        className="form-control"
                        placeholder="Gender"
                        value={gender}
                        onChange={ event => this.setState({gender: event.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={ event => this.setState({email: event.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Contact No</label>
                    <input
                        name="number"
                        type="text"
                        className="form-control"
                        placeholder="Contact No"
                        value={number}
                        onChange={ event => this.setState({number: event.target.value})}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={ event => this.setState({password: event.target.value})}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
            </div>
            </div>
        );
    }
}