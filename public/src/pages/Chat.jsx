import React, {useEffect, useState, useRef} from 'react';
import styled from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {userContacts, host} from "../Routes";
import {io} from "socket.io-client"

function Chat() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined)
    const [contacts, setContacts] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)
    const socket = useRef(null)


    useEffect(()=>{
        async function fetchUserData(){
            if (!localStorage.getItem("Chat-App")) navigate("/login");
            else {
                setCurrentUser(await JSON.parse(localStorage.getItem("Chat-App")));
            }
        }
        fetchUserData();
    }, [])

    useEffect(()=>{
        async function fetchUserContacts(){
            if (currentUser){
                const data = await axios.get(`${userContacts}/${currentUser._id}`)
                setContacts(data.data)
                setIsLoaded(true)
            }
        }
        fetchUserContacts();
    }, [currentUser])

    useEffect(()=>{
        function handleNewCurrentUser(){
            if (currentUser){
                socket.current = io(host);
                socket.current?.emit("add-user", currentUser._id);
            }
        }
        handleNewCurrentUser()
        }, [currentUser])

    function handelChatChange(contactData){
        setCurrentChat(contactData)
    }

    return (
        <>
            <Container>
                <div className="container">
                    {isLoaded ? (<Contacts contacts={contacts} handelChatChange={handelChatChange}/>) : null}
                    {currentChat === undefined ? <Welcome/> : <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket}/>}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: rgba(21, 21, 28, 0.87);

  .container {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 25% 75%;
    background-color: rgba(120, 131, 154, 0.33);
  }
`

export default Chat;