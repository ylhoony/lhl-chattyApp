import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: []
    }

  }



  // addUsername (e) {
  //   console.log('username test');
  //   if (e.key === 'Enter') {
  //     this.props.onKeyPress(e);
  //   }
  //   console.log('username test: ', e.target.value);
  //   return e.target.value;
  // }

    // in App.jsx


  addMessage(e) {
    // console.log('message test');
    if (e.key === 'Enter') {
      // console.log('add Msg: ', e.target.value);
      // this.props.onKeyPress();
      let message = {
        username: this.state.currentUser.name,
        content: e.target.value
      }
      // console.log(message);
      // console.log("this in addMessage", this)
      this.socket = new WebSocket("ws://localhost:4000");
      this.socket.onopen = function (event) {
        // console.log("inside function: ", this);
        this.send(JSON.stringify(message));
      }
        /// receiving the message with id
      this.socket.onmessage = (event) => {
        // console.log("onmessage this: ", this);
        // console.log("onmessage event: ", typeof event);
        // console.log("onmessage event: ", event);
        let broadcastmessage = JSON.parse(event.data);

        //console.log("rohit"+this.state.messages);
        let messages = this.state.messages.concat(broadcastmessage);

        // calls the render method in the App component
        this.setState({ messages: messages });
      }
    }
    // console.log(this.state);
  }




  componentDidMount() {
    console.log("componentDidMount <App />");
    // console.log("componentDidMount", this);

    this.socket = new WebSocket("ws://localhost:4000");

    this.socket.onopen = function(event) {
      // console.log("this inside function under comp:", this);
      console.log("Opened in componentDidMount");
      // this.send("compDidmount open");
    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Botbot", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage.bind(this)}  />
      </div>
    );
  }
}

export default App;
