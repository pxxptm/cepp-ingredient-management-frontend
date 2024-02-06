import React, { useState } from "react";

function UserRegisterPage() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        const name = fname + " " + lname;
        console.log(fname, lname, username , password);
        
        fetch("http://localhost:3000/user-register", 
        {
            method: "POST",
            crossDomain: true,
            headers: 
            {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify (
            {
              name,
              username,
              password
            }),
        })
        .then((res) => res.json())
        .then((data) => 
        {
            console.log(data, "userRegister");
            if (data.status === "ok") 
            {
                alert("Registration Successful");
            } 
            else 
            {
                alert("Something went wrong");
            }
        });
    }

    return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserRegisterPage