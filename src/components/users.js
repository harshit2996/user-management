import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class Users extends React.Component {

  
  componentDidMount(){
    if(this.props.users.length===0){
      axios.get('https://reqres.in/api/users')
      .then(res=>{      
        this.props.update(res.data.data)

      })
      .catch(err=>{
        console.log(err.message)
      })

    }
  }

  deleteUser(id){
    axios.delete('https://reqres.in/api/users/'+id)
    .then(res=>{
      this.props.delete(id)
      this.props.history.push("/users")
    })
    .catch(err=>{
      console.log(err)
    })
  }

  handleSearch(){
    let searchQuery=document.getElementById('search_bar').value.toLocaleLowerCase()
    let found=false
    let records=document.getElementsByClassName('record')
    for (const record of records) {
      let recData=record.getElementsByClassName('data')
      for(const r of recData){
        let data = r.innerHTML.toLocaleLowerCase()
        if(data.indexOf(searchQuery)!==-1){
          found=true
          record.style.display=("table-row")
        }
      }
      
      if(!found){
        record.style.display=("none")
      }
      found=false
      
    }
    
  }
  
  render() {
    let contents=this.props.users.map(user=>{
      return (
        <tr key={user.id} className="record">
          <td className="data">{user.id}</td>
          <td className="data">{user.first_name + ' '+user.last_name }</td>
          <td className="data">{user.email}</td>
          <td><Link to={location => `/edit/${user.id}`}>Edit</Link></td>
          <td><Link to="#" onClick={()=>{
            this.deleteUser(user.id)
            }}>Delete</Link></td>
          
        </tr>
      )
    })
    
    return (
      <div className="container my-5">
        <h1 className="mt-5 mb-4">All Users</h1>
        <div className="container p-0">
          <div className="mb-4 d-flex">
            <div className="flex-grow-1  p-0 input-group">
              <div className="input-group-prepend  border-right-0">
                <span className="input-group-text bg-transparent"><i className="material-icons">search</i></span>
              </div>
              <input className="form-control border-left-0 m-0" type="text" id="search_bar" placeholder="Filter results by Name, Email, ID" onKeyUp={this.handleSearch}></input>
            </div>
            <div className="pl-2">
              <button className="btn btn-success"><Link to="/add">Add User</Link></button>
            </div>
          </div>

        </div>
        <table id='users' className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th colSpan="2">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {contents}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <button className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token")
              this.props.history.push('/')
            }}
          >Logout</button>
        </div>
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
    update: (users) =>{dispatch({
        type: 'UPDATE',
        payload: users
      })
    },
    delete:(id) =>{dispatch({
      type:'DELETE',
      payload:id
    })

    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Users)

