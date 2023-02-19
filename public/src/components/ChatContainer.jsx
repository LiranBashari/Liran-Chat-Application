import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import axios from "axios";
import { addMessage, getMessages } from "../Routes";

function ChatContainer({ currentUser, currentChat }) {
    const [usersMessages, setUsersMessages] = useState([]);

    // for different chats different messages
    useEffect(() => {
        async function fetchMessages() {
            const messages = await axios.post(getMessages, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setUsersMessages(messages.data);
        }
        fetchMessages();
    }, [currentChat]);

    async function handleSendMessage(message) {
        await axios.post(addMessage, {
            from: currentUser._id,
            to: currentChat._id,
            message: message,
        });
    }
    return (
        <Container>
            <div className="container-header">
                <h3>{currentChat.username}</h3>
                <hr />
            </div>
            <div className="chat-messages">
                {usersMessages.map((message) => {
                    return (
                        <div>
                            <div
                                className={`message ${message.fromSelf ? "sender" : "receiver"}`}
                            >
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
    );
}

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.87);
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .container-header {
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

  .chat-messages {
    height: calc(100% - 115px); // set a fixed height that accounts for the header and input
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.4rem;

      &-thumb {
        background-color: #73bce1;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        word-break: break-word;        
        padding: 0 0.5rem 0 0.5rem;
        font-size: 0.8rem;
        border-radius: 0.8rem;
      }
    }

    .sender {
      justify-content: flex-end;

      .content {
        background-color: #b7edfc;
        word-wrap: break-word; // add this property to break long words
      }
    }

    .receiver {
      justify-content: flex-start;

      .content {
        background-color: white;
        word-wrap: break-word; // add this property to break long words
      }
    }
  }
`;

export default ChatContainer;
