import React, { Component } from 'react';
import './App.css';
import firebase from './services/firebase';
import Login from './Login';
import Home from './Home'

class App extends Component {

  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }
  


  componentDidMount() {
    this.authListener();
    
  }

  updateK = (e) => {
    this.setState({ k: e.target.value })
  }

  updateD = (e) => {
    this.setState({ d: e.target.value })
  }

  updateFirebase = () => {
    firebase.database().ref().set({
      practice: 30,
      k: this.state.k,
      d: this.state.d
    });
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('logged in');
        this.setState({ user });
        // console.log(user.uid);
      }
      else {
        console.log('could not log in');
        this.setState({ user: null })
      }
    })
  }

  render() {

    return (
      <div className="App">
        {this.state.user ? (<Home />) : (<Login />)}

      </div>
    )
  }
}

export default App;

