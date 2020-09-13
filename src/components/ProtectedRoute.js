import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// import auth from '../auth'

export const ProtectedRoute=({ children, ...rest })=> {
  return(
    <Route
      {...rest}
      render={({ location }) =>
        (localStorage.getItem("token")!=null) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}