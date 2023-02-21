import React, {useState} from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../logo.svg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {register} from "../Routes";
import {config} from 'cloudinary-react';

function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const toastOptions = {position:"bottom-right", pauseOnHover:true, draggable:true}

    async function handelSubmit(event) {
        event.preventDefault();
        if (isValid()) {
            // send to server for save in DB
            const {data} = await axios.post(register, values)
            if (data.status === false) toast.error(data.msg, toastOptions)
            else {
                localStorage.setItem("Chat-App", JSON.stringify(data.user))
                navigate("/")
            }
        }
    }

    function handelChange(event) {
        setValues({...values, [event.target.name]: event.target.value});
    }

    function isValid() {
        if (values.username.length < 3){
            toast.error("User name must have more than 3 characters", toastOptions)
            return false;
        } else if (values.email === ""){
            toast.error("Email is required", toastOptions)
            return false;
        } else if (values.password !== values.confirmPassword) {
            toast.error("Password and Confirm Password must be the same", toastOptions)
            return false;
        } else if (values.password.length < 8){
            toast.error("Password must have more than 8 characters", toastOptions)
            return false;
        }
        return true;
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event => handelSubmit(event))}>
                    <div className="brand">
                        <h1>Chat App</h1>
                        <img src={Logo} alt="logo"/>
                    </div>
                    <input className="input" type="text" placeholder="User name" name="username" onChange={(event => handelChange(event))}/>
                    <input className="input" type="text" placeholder="Email" name="email" onChange={(event => handelChange(event))}/>
                    <input className="input" type="password" placeholder="Password" name="password" onChange={(event => handelChange(event))}/>
                    <input className="input" type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(event => handelChange(event))}/>
                    <label htmlFor="image-file">Add a profile picture:</label>
                    <input type="file" id="image-file" name="image" accept="image/*"/>
                    <button type="submit">Create User</button>
                    <p>
                        ALREADY HAVE AN ACCOUNT ? <Link  className="link" to="/login"> Login</Link>
                    </p>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #15151c;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  form {
    max-width: 30rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: rgba(120, 131, 154, 0.33);
    border-radius: 2rem;
    gap: 1rem;
    padding: 3rem 5rem;
  }

  img {
    height: 5rem;
  }

  h1 {
    color: white;
  }

  .input {
    background-color: transparent;
    padding: 0.8rem;
    border: 0.1rem solid #b7edfc;
    border-radius: 0.4rem;
    font-size: 1rem;
    color: white;
  }
  label{
    color: #b7edfc;
  }
  button {
    background-color: #b7edfc;
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight : bold;
    &:hover {
      background-color: rgba(21, 21, 28, 0.46);
    }
  }

  p{
    color: white;
    font-family: Cursive,serif;
  }
  .link{
    color: #61dafb;
    &:hover {
      color: red;
    }
  }

`

export default Register;