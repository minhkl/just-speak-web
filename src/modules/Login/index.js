import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <button type="button">Login</button>
      </div>
    </div>
  )
}

export default Login