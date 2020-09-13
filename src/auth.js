class Auth{
  constructor(props) {
    
      this.isAuthenticated=false
      
  }

  login(cb){

    this.isAuthenticated=true
    cb()
  }

  logout(cb){
    this.isAuthenticated=false
    cb()
  }

  isAuthenticated(){
    return (this.state.isAuthenticated)
  }

}

export default new Auth()