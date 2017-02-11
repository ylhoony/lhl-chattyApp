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
      userColor: #000
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  changeUsername (e) {
    if (e.key === 'Enter') {
      // console.log('username test: ', e.target.value);
      const prevUsername = this.state.currentUser.name;
      console.log(prevUsername);

      let notice = {
        type: 'postNotification',
        notification: prevUsername + ' changed username to ' + e.target.value
      }

      this.socket.send(JSON.stringify(notice));

      this.setState({
        currentUser: {name: e.target.value}
      });
    }
  }

  addMessage(e) {
    // console.log('message test');
    if (e.key === 'Enter') {
      // console.log('add Msg: ', e.target);
      // this.props.onKeyPress();
      let message = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: e.target.value
      }

      this.socket.send(JSON.stringify(message));
      // console.log(message);
      // console.log("this in addMessage", this)


      // console.log("inside function: ", this);


      //   /// receiving the message with id
      // this.socket.onmessage = (event) => {
      //   // console.log("onmessage this: ", this);
      //   // console.log("onmessage event: ", typeof event);
      //   // console.log("onmessage event: ", event);
      //   let broadcastmessage = JSON.parse(event.data);

      //   //console.log("rohit"+this.state.messages);
      //   let messages = this.state.messages.concat([broadcastmessage]);



      //   // calls the render method in the App component
      //   this.setState({ messages: messages });
      // }
    }
    // console.log(this.state);
  }




  componentDidMount() {
    console.log("componentDidMount <App />");
    // console.log("componentDidMount", this);

    this.socket = new WebSocket("ws://localhost:4000");

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      // console.log("onmessage this: ", this);
      // console.log("onmessage event: ", typeof event);
      console.log("onmessage event: ", event);

      let broadcastmessage = JSON.parse(event.data);

      switch(broadcastmessage.type) {
        case "incomingMessage":
          // handle incoming message
          // console.log(broadcastmessage);
          let messages = this.state.messages.concat([broadcastmessage]);
          // calls the render method in the App component
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          // handle incoming notification
          console.log(broadcastmessage);
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
