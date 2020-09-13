import React from 'react'
import axios from 'axios'
class EditUser extends React.Component{
  
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
    axios.get('https://reqres.in/api/users/'+ this.id)
    .then(res=>{
      let user=res.data.data
      this.setState({first_name: user.first_name})
      this.setState({last_name: user.last_name})
      this.setState({email: user.email})
    })
    .catch(err=>{
      console.log(err.message)
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };
    axios.put('https://reqres.in/api/user/'+this.id, { email: user.email, first_name: user.first_name, last_name: user.last_name })
    .then(
      res=>{
        console.log(res.data)
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
            <h1>Edit User</h1>
            <div className="form-group">
              <label>
                First Name:
              </label>
                <input name="first_name" className="form-control" value={this.state.first_name} onChange={this.handleFName} />
              <br/>
              <label>
                Last Name:
              </label>
                <input name="last_name" className="form-control" value={this.state.last_name} onChange={this.handleLName} />
              </div>
              <div>
                <label>
                  Email:
                </label>
                  <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleEmail}  />
    
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

export default EditUser