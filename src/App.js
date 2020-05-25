import React, { Component } from 'react';
import './App.css';
import Chart from 'react-apexcharts';
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
  // state = {
  //   user: {},
  //   k: 0,
  //   d: 0,
  //   practice: 0,
  //   options: {
  //     xaxis: {
  //       categories: ['a', 'b', 'c', 'd', 'e']
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'test',
  //       data: [1, 2, 3, 4, 5]
  //     }
  //   ]
  // }


  componentDidMount() {
    this.authListener();
    // firebase.database().ref().child('practice').on('value', snap => {
    //   this.setState({ practice: snap.val() })
    //   // console.log('practice value = ' + snap.val());
    // });
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


        {/* <div>Overall stats</div>
<div>k/d ratio, games won, time practiced: {this.state.practice}</div>
<div>
  <Chart
    options={this.state.options}
    series={this.state.series}
    type="bar"
    height="450"
    width="50%" />
</div>
<div>Add practice time
  <div>
    <input type='text'></input>
    <button>Submit</button>
  </div>
</div>
<div>
  Add game results
  <div>
    K:<input type='text' onChange={(e) => {this.updateK(e)}}></input>
  </div>
  <div>
    D:<input type='text' onChange={(e) => {this.updateD(e)}}></input>
  </div>
  <button onClick={this.updateFirebase}>Submit</button>
</div> */}
      </div>
    )
  }
}

export default App;

