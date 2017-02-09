import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList />");
    // const messageProps = this.props.messages;

    console.log(this.props.messages);

    return (
      <main className="messages">
        {this.props.messages.map((currentMessage) => {
          return  <Message message={currentMessage} key={currentMessage.id}/>
          })
        }
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;


