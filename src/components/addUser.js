import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class AddUser extends React.Component{
  
  constructor(props){
    super(props)
    this.state={
      first_name:'',
      last_name:'',
      email: '',
    }
  }

  id = this.props.match.params.id

  componentDidMount(){
    console.log(this.props)
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };
    axios.post('https://reqres.in/api/users', { email: user.email, first_name: user.first_name, last_name: user.last_name })
    .then(
      res=>{
        console.log(res.data)
        this.store.dispatch({
          type:'UPDATE',
          payload:res.data
        })
        this.props.history.push("/users")
      })
    .catch(err=>{
      console.log(err.message)
    })
  }

  handleEmail = event => {
    this.setState({ email: event.target.value });
  }
  handleFName = event => {
    this.setState({ first_name: event.target.value });
  }
  handleLName = event => {
    this.setState({ last_name: event.target.value });
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
                <input name="first_name" className="form-control" value={this.state.first_name} onChange={this.handleFName} required />
              <br/>
              <label>
                Last Name:
              </label>
                <input name="last_name" className="form-control" value={this.state.last_name} onChange={this.handleLName} required/>
              </div>
              <div>
                <label>
                  Email:
                </label>
                  <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleEmail} required />
    
              </div>

              <div className="d-flex justify-content-between my-4">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="btn btn-danger" onClick={() => {
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

export default connect(mapStateToProps)(AddUser)