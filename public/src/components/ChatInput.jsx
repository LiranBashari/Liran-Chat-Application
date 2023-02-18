import React, { useState } from 'react';
import styled from 'styled-components';
import { IoSend } from 'react-icons/io5';

function ChatInput() {
    const [message, setMessage] = useState('');

    function handleSend(event) {
        event.preventDefault();
        // Add your logic to send the message
    }

    function handleChange(event) {
        setMessage(event.target.value);
    }

    return (
        <Container>
            <form className="input-container" onSubmit={handleSend}>
                <textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={handleChange}/>
                <button type="submit"><IoSend /></button>
            </form>
        </Container>
    );
}

const Container = styled.div`
  position: absolute;
  bottom: 2.7rem;
  right: 7%;
  left: 29%;

  .input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    textarea {
      flex: 1;
      height: auto;
      max-height: 100px;
      padding: 6px;
      font-size: 14px;
      margin-right: 10px;
      border-radius: 0.5rem;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-all;
      outline: none;
      resize: none;
      overflow-y: auto;


      ::-webkit-scrollbar {
        width: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgb(19, 19, 38);;
      }
    }

      button {
        border: none;
        color: black;
        background-color: transparent;
        cursor: pointer;
        font-size: 30px;
        margin-right: 15px;
        margin-top: 6px;

        &:hover {
          color: #61dafb;
        }
      }
    }
`;

export default ChatInput;
