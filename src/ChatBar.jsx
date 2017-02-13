import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onKeyPress={this.props.changeUsername} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.addMessage} />
      </footer>
    );
  }
}
export default ChatBar;
