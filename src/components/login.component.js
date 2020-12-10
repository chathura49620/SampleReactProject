import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
                username:'',
                password:'',
                isChecked:false,
        }
    }

     async handleFormSubmit(event){
        event.preventDefault();
            let email = this.state.username,
                password = this.state.password;

           try{

              const res = await axios.post('http://127.0.0.1:4000/api/users/login',{
                  email,
                  password
              });
              console.log(res.data.token)
              if(res){
                  this.props.history.push('/dashbord');
                  localStorage.setItem('user_email', email);
                  localStorage.setItem('user_token', res.data.token);
              }
              if (res.data === "Fails"){
                 alert("please enter correct user name and password")
              }
           }catch (err){
               console.log(err)
         }
    }
    handleChecked(){
        this.setState({isChecked: !this.state.isChecked})
    }
    render() {
        const {username,password,isChecked} = this.state;
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={event => this.handleFormSubmit(event)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input
                        name="name"
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={username}
                        onChange={ event => this.setState({username: event.target.value})}
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

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            checked={isChecked}
                            onChange={() => this.handleChecked()}
                        />
                        <label className="custom-control-label" htmlFor="customCheck1" onClick={() => this.handleChecked()}>Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
            </div>
        );
    }
}