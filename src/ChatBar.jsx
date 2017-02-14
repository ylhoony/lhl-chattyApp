import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { 
      currentUser: { name: currentUsername }, 
      changeUsername, 
      addMessage 
    } = this.props;

    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          defaultValue={ currentUsername } 
          onKeyPress={ changeUsername } />
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          onKeyPress={ addMessage } />
      </footer>
    );
  }
}
export default ChatBar;
