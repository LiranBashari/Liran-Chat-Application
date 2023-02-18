import React from 'react';
import styled from "styled-components";
import ChatInput from "./ChatInput";

function ChatContainer({ currentUser, currentContact }) {
    return (
        <Container>
            <div className="container-header">
                <h3>{currentContact.username}</h3>
                <hr />
            </div>
            <ChatInput/>
        </Container>
    );
}
const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.87);
  width: 100%;
  text-align: center;
  
  .container-header{
    h3 {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    hr {
      margin: 10px auto;
      border: none;
      border-top: 4px solid #ccc;
      width: 100%;
      box-sizing: content-box;
    }
  }

`;

export default ChatContainer;