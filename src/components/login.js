import React from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
class Login extends React.Component {
    state = {
      email: '',
      password: '',
    } 
  handleEmail = event => {
    this.setState({ email: event.target.value });
  }
  handlePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('https://reqres.in/api/login', { email: user.email, password: user.password })
    .then(
      res=>{
        this.isAuthenticated=true 
        localStorage.setItem("token",res.data.token)   
        // console.log(localStorage.getItem("token"))
        this.props.history.push("/users")
      })
    .catch(err=>{
      console.log(err.message)
    })
  }

  render() {
    if(localStorage.getItem("token")!=null){
      return <Redirect
      to="/users"
    />
    }
    else{
      return (
        <div className="container my-5">
          <div className="card p-5">
            <div className="d-flex m-4">
              <h2>Login Form</h2>
            </div>
            <form onSubmit={this.handleSubmit}>
            

              <div className="form-group mx-4">

                <label htmlFor="email">Email:</label>
                  <input className="form-control" type="email" name="email" id="email" onChange={this.handleEmail} />
                </div>
              <div className="form-group mx-4">
              <label >Password:</label>
                <input className="form-control" type="password" name="password" onChange={this.handlePassword} />

              </div>

              <div className="d-flex m-4">
                <button className="btn btn-primary" type="submit">Login</button>
              </div>

            </form>

          </div>
        </div>
      )

    }
  }
}

export default Login
