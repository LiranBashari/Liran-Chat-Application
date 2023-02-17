import React, {useEffect, useState} from 'react';
import hello from "../robot.gif";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function Welcome() {
    const [userName, setUserName] = useState(undefined);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchUserData(){
            if (!localStorage.getItem("Chat-App")) navigate("/login");
            else {
                setUserName(JSON.parse(localStorage.getItem("Chat-App")).username);
            }
        }
        fetchUserData();
    },[])

    return (
        <Container>
            <img src={hello} alt="robot"/>
            <h1>Welcome, {userName}!</h1>
            <h3>Please select a chat to start messaging</h3>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #b7edfc;;
  justify-content: center;
  align-items: center;
  
  img{
    height: 15rem;
  }
`
export default Welcome;