import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const msgComponents = this.props.messages.map(currentMessage => <Message message={currentMessage} key={currentMessage.id}/>);

    return (
      <main className="messages">
        { msgComponents }
        <div className="message system">
          { this.props.notification }
        </div>
      </main>
    );
  }
}

export default MessageList;


