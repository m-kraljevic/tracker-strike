import React, { Component } from 'react';
import fire from './services/firebase';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        let date = new Date();
        let currDate = date.toDateString();
        return (
            <div>
                <h1>Welcome to Home</h1>
                <div>todays date is {currDate}</div>
                <button onClick={this.logout}>Logout</button>
            </div>);

    }

}

export default Home;

