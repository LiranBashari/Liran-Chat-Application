import React from 'react';

function ChatContainer({currentUser,currentContact}) {
    return (
        <div>
            {currentContact.username}
        </div>
    );
}

export default ChatContainer;