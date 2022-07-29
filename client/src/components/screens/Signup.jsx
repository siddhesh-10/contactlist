import React, { useState, useEffect, useContext } from "react";



import { UserContext } from '../../App'

import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function Signup() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");

  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  if(state && state._id)
    {
        navigate("/home")
    }

  const postData = (e) => {
    try {
      e.preventDefault();
      if (!Name || !Password || !Email) {
        return toast.warning("Please provide all details");

      }
     
       {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          },
          body: JSON.stringify({ 
              name: Name,
              email: Email,
              password: Password,
              
            
          })
        };
        fetch('/signup', requestOptions)
        .then(res => res.json())
        .then(data => {
          JSON.stringify(data)
  
          if (data.error) {
            toast.warning(data.error)
  
          }
          else {
            toast.success(data.message);
            navigate('/login')
          }
        }).catch(err => {
          return toast.warning("account not created2")
        });

      
       } 
    }
    catch (err) {
      return toast.warning("account not created3")
    }
  }
  return (
    <div>
     
      <div className="wcard">
        <Card style={{ width: '18rem' }} className="cards .input-field">
          <div className="auth-card">
            <h2>todo</h2>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="name" value={Name} />
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={Email} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={Password} />
          
            <button className="btn waves-effect waves-light #66bb6a green lighten-1"
              onClick={postData}
            >
              Signup
            </button>
            <h6>
              <Link to='/login'>Already have account?</Link>
            </h6>
            
          </div>
          {

          }
        </Card>

      </div>
    </div>
  )
}

export default Signup;