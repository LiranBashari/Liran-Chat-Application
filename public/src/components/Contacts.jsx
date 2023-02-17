import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Logo from "../logo.svg"

function Contacts({contacts, handelChatChange}) {
    const [username, setUsername] = useState(undefined)
    const [currentChatSelected, setCurrentChatSelected] = useState(undefined)

    useEffect(() => {
        async function fetchData() {
            setUsername(await JSON.parse(localStorage.getItem("Chat-App")).username);
        }
        fetchData();
    }, []);

    function handelChatSelected(contactData, index){
        handelChatChange(contactData)
        setCurrentChatSelected(index)
    }

    return (
        <Container>
            <div className="user-details">
                <img src={Logo} alt="logo"/>
                <h2>{username}</h2>
            </div>

            <div className="user-contacts">
                {Object.values(contacts).map((contact, index) => {
                    return (<div key={contact._id}
                                 onClick={()=> handelChatSelected(contact, index)}
                                 className={`contact ${index === currentChatSelected ? "selected" : ""}`}>
                        <div className="username">
                            <h3>{contact.username}</h3>
                        </div>
                    </div>)
                    }
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .user-details {
    display: flex;
    flex-direction: row;
    img {
      height: 2.5rem;
      padding: 1rem;
    }
    h2 {
      color: white;
      font-size: 25px;
    }
  }
  .user-contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    .contact {
      background-color: #ffffff34;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      cursor: pointer;
      width: 80%;
      border-radius: 0.2rem;
      padding: 0.1rem;
      display: flex;
      gap: 1rem;
    }
    .selected {
      justify-content: center;
      align-items: center;
      background-color: #b7edfc;
      h3{
        color: black;
      }
    }
    h3 {
      justify-content: center;
      align-items: center;
      color: white;
    }
  }
`
export default Contacts;