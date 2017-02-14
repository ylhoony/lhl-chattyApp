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
    if (e.key === 'Enter') {
      let message = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: e.target.value
      }

      this.socket.send(JSON.stringify(message));
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000");

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      let broadcastmessage = JSON.parse(event.data);

      switch(broadcastmessage.type) {
        case "incomingMessage":
          let messages = this.state.messages.concat([broadcastmessage]);
          // calls the render method in the App component
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          // handle incoming notification
          let notification = broadcastmessage.notification;
          this.setState({notification: notification});
          break;
          case "userCount":
          let userCount = broadcastmessage.userCount - 1;
          // calls the render method in the App component
          this.setState({ userCount: userCount });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
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
