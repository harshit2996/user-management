import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class AddUser extends React.Component{

  email=""
  first_name=""
  last_name=""

  componentDidMount(){
    // console.log(this.props)
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.post('https://reqres.in/api/users', { email: this.email, first_name: this.first_name, last_name: this.last_name })
    .then(
      res=>{
        console.log(res.data)
        this.props.add(res.data)

        this.props.history.push("/users")
      })
    .catch(err=>{
      console.log(err)
    })
  }

  handleEmail = event => {
    this.email= event.target.value
  }
  handleFName = event => {
    this.first_name = event.target.value
  }
  handleLName = event => {
    this.last_name = event.target.value
  }

  render(){
    return(
      <div className="container my-5">
        <form onSubmit={this.handleSubmit}>
          <div className="card p-5">
            <h1>Add User</h1>
            <div className="form-group">
              <label>
                First Name:
              </label>
                <input name="first_name" className="form-control" onChange={this.handleFName} value={this.last_name} required />
              <br/>
              <label>
                Last Name:
              </label>
                <input name="last_name" className="form-control"  onChange={this.handleLName} value={this.first_name} required/>
              </div>
              <div>
                <label>
                  Email:
                </label>
                  <input type="email" className="form-control" name="email" onChange={this.handleEmail} value={this.email} required />
    
              </div>

              <div className="d-flex justify-content-between my-4">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-danger" onClick={() => {
                  localStorage.removeItem("token")
                  this.props.history.push('/')
                }}
                >Logout</button>
                
              </div>

          </div>
        </form>


      </div>

    )
      
    
  }
}

const mapStateToProps = (state)=>{
  return{
    users:state
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    add: (user) =>{dispatch({
        type: 'ADD',
        payload: user
      })
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)