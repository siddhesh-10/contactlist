    import React,{useEffect,useContext,useReducer, createContext} from "react";
   
    import {
      BrowserRouter ,
      Routes ,
      Route,
      Link
    } from "react-router-dom";

    import './App.css';
   
    import { useNavigate } from 'react-router-dom';

    import Login from './components/screens/Login.jsx';
    import Signup from './components/screens/Signup.jsx';
  

    import Home from './components/screens/Home'
    import Profile from './components/screens/Profile'

  
    
   import {reducer,initialState} from './reducers/userReducer.js'

   export const UserContext = createContext();

const Routing=()=>{
  const navigate = useNavigate();
 
  
  const {state,dispatch}=useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  

  useEffect(()=>{
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else
    {
      navigate('/login');
    }
  },[]);

  return (
    <Routes>
    
    <Route path="/" element={<Login />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    
    <>
    
    <Route exact path="/home" element={<Home />}></Route>
    <Route exact path="/Profile" element={<Profile />}></Route>
    
    </>
  </Routes>
  )
}

    function App() {
      const initialStates = {
        user: {},
        error: null
    };
    
      const [state, dispatch] = useReducer(reducer, initialStates);
     
      return (
        <UserContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>

            <Routing />

          </BrowserRouter>
        </UserContext.Provider>
      );
    }

    export default App;

    