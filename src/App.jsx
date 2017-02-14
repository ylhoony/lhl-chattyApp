import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      notification: '',
      userCount: 0,
      userColor: '#000'
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  changeUsername (e) {
    let newName = e.target.value;
    const prevUsername = this.state.currentUser.name;
    
    if (e.key === 'Enter') {
      if (newName.length === 0) {
        newName = prevUsername;
      } else {
        let notice = {
          type: 'postNotification',
          notification: `${prevUsername} changed username to ${newName}`
        }
        this.socket.send(JSON.stringify(notice));
      }

      this.setState({
        currentUser: { name: newName }
      });
    }
  }

  addMessage(e) {
    const content = e.target.value;
    if (content.length === 0) return;

    if (e.key === 'Enter') {
      let message = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content
      }

      this.socket.send(JSON.stringify(message));
    }
  }

  componentDidMount() {
    // consider putting urls in a variable, it may be used elsewhere also.
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      const broadcastmessage = JSON.parse(event.data);
      const { type, notification, userCount } = broadcastmessage;

      switch(type) {
        case "incomingMessage":
          const messages = this.state.messages.concat([broadcastmessage]);
          // calls the render method in the App component
          this.setState({ messages });
          break;
        case "incomingNotification":
          // handle incoming notification
          this.setState({ notification });
          break;
          case "userCount":
          // calls the render method in the App component
          this.setState({ userCount: (userCount-1) });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error(`Unknown event type type`);
      }
    }
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <a className="user-count">{this.state.userCount} users online</a>
        </nav>
        <MessageList messages={this.state.messages} notification={this.state.notification} />
        <ChatBar
          currentUser={this.state.currentUser}
          changeUsername={this.changeUsername}
          addMessage={this.addMessage} />
      </div>
    );
  }
}

export default App;
