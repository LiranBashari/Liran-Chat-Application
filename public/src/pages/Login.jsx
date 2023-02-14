import React, {useState} from 'react';
import Logo from "../logo.svg";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {toast} from "react-toastify";
import axios from "axios";
import {login} from "../Routes";

function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username:"",
        password:"",
    })
    const toastOptions = {position:"bottom-right", pauseOnHover:true, draggable:true}

    async function handelSubmit(event) {
        event.preventDefault();
        if (isValid()) {
            const {username, password} = values;
            const {data} = await axios.post(login, {username, password})
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
        const {userName, password} = values;
        if (userName === "") {
            toast.error("user name and password are required", toastOptions)
            return false;
        } else if (password === "") {
            toast.error("user name and password are required", toastOptions)
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
                    <input type="text" placeholder="User name" name="username" onChange={(event => handelChange(event))}/>
                    <input type="password" placeholder="Password" name="password" onChange={(event => handelChange(event))}/>
                    <button type="submit">Login In</button>
                    <p>
                        DON'T HAVE AN ACCOUNT ? <Link className="link" to="/register"> Register</Link>
                    </p>
                </form>

            </FormContainer>
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
    display: flex;
    flex-direction: column;
    background-color: rgba(120, 131, 154, 0.33);
    border-radius: 2rem;
    gap: 2rem;
    padding: 3rem 5rem;
  }

  img {
    height: 5rem;
  }

  h1 {
    color: white;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #b7edfc;
    border-radius: 0.4rem;
    font-size: 1rem;
    color: white;
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
export default Login;