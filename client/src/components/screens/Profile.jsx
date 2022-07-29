

import React, { useState, useEffect, useContext } from "react";


import { UserContext } from "../../App";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Button} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import Footer from "./Footer";

 
function Profile()
{
    const [showCom, setCom] = useState();
    const { state, dispatch } = useContext(UserContext);
    const [Password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
  const [name, setName] = useState("");
 
  const navigate=useNavigate();
  const postData = () => {
      if(name.length<3)
      {
       return toast.error("name length should greater than 2");
      }
    fetch('/upname', {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            name:name
        })
    }).then(res => res.json())
        .then(result => {
            //   console.log(result)
            
            toast.success("name updated");
            navigate('/home')
        }).catch(err => {
            console.log(err);
          return  toast.error("not updated");
        })
       return toast.success("name updated");
        }
       
    const upPass=()=>{
        if (!cPassword || !Password ) {
            return toast.warning("Please provide all details");
    
          }
         
            fetch('/uppass', {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    cpassword:cPassword,
                    password: Password,
                })
            })
            .then(res => res.json())
            .then(data => {
              JSON.stringify(data)
      
              if (data.error) {
                toast.warning(data.error)
      
              }
              else {
                toast.success(data.message);
                navigate('/Home')
              }
            }).catch(err => {
              return toast.warning("not updated ")
            });
    
          
           
    }
    return (
        <div>
        <Header />
        <h1></h1>
        <h1 className="brandb">Welcome {state.name}
        <Button className="blogout" onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                navigate('/')
            }} variant="primary">Logout</Button></h1>
        <div className="wcard">
       <Card  className="cards .input-field">
         <div className="auth-card">
         <h2>Edit Name</h2>
         <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} value={name}/>
         <button className="btn waves-effect waves-light #66bb6a green lighten-1 stdbtn" onClick={postData}>
         Update name
         </button>
         
         </div>
         </Card>
       <Card  className="cards .input-field">
         <div className="auth-card">
         <h2>Update password</h2>
         <input type="text" placeholder="current password" onChange={(e) => setcPassword(e.target.value)} value={cPassword}/>
         <input type="text" placeholder="New password" onChange={(e) => setPassword(e.target.value)} value={Password}/>
         <button className="btn waves-effect waves-light #66bb6a green lighten-1 stdbtn" onClick={upPass}>
         Update password
         </button>
         
         </div>
         </Card>
  
       </div>

        <Footer />
      </div>
    );
}


export  default Profile;