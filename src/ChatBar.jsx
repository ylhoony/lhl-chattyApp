import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);

    // this.onKeyPress = this.onKeyPress.bind(this);

  }

  handleInput(e) {
    console.log('hooorah!!');

    this.props.addMessage(e);
    // if (e.key === 'Enter') {
    //   this.props.onKeyPress('booom');
    // }
    // console.log('test', e.target.value);
    // return e.target.value;
  }

  render() {
    console.log("Rendering <ChatBar />");
    return (

      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleInput.bind(this)} />
      </footer>
    );
  }
}
export default ChatBar;
