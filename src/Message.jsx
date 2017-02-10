import React, {Component} from 'react';

class Message extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    console.log("Rendering <Message />");
    // console.log("CURRENT MESSAGE: " + this.props.message);
    return (
      <div>
        <div className="message">

          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      </div>
    )
  }
}
export default Message;
