import React, { Component } from 'react';
import firebase from './services/firebase';
import ChartViewer from './ChartViewer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            practiceTime: '',
            matchKills: '',
            matchDeaths: '',
            graphArray: []
        }
    }


    handleChangePractice = (e) => {
        const practiceTime = (e.target.validity.valid) ? e.target.value : this.state.practiceTime;

        this.setState({ practiceTime });
    }

    handleChangeKills = (e) => {
        const matchKills = (e.target.validity.valid) ? e.target.value : this.state.matchKills;

        this.setState({ matchKills });
    }

    handleChangeDeaths = (e) => {
        const matchDeaths = (e.target.validity.valid) ? e.target.value : this.state.matchDeaths;

        this.setState({ matchDeaths });
    }

    submitPracticeStats = () => {
        let date = new Date();
        let upload = {
            date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
            kills: 0,
            deaths: 0,
            practice: Number(this.state.practiceTime)
        }
        this.setState({ practiceTime: '' });
        console.log(upload);


        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child(firebase.auth().currentUser.uid).push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[firebase.auth().currentUser.uid + '/' + newPostKey] = upload;

        return firebase.database().ref().update(updates);
    }

    submitGameStats = () => {
        let date = new Date();
        let upload = {
            date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
            kills: Number(this.state.matchKills),
            deaths: Number(this.state.matchDeaths),
            practice: 0
        }
        this.setState({ matchKills: '', matchDeaths: '' });
        console.log(upload);


        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child(firebase.auth().currentUser.uid).push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[firebase.auth().currentUser.uid + '/' + newPostKey] = upload;

        return firebase.database().ref().update(updates);
    }

    componentDidMount() {
        let careerStats = null;
        let KDRatio = null;
        firebase.database().ref(firebase.auth().currentUser.uid).on('value', (snap) => {
            console.log('theres new values')
            let graphValues = [];
            let graphValuesByDay = {};
            console.log(JSON.stringify(snap.val()));
            Object.values(snap.val()).forEach(item => {
                if(graphValuesByDay[item.date]) {
                    graphValuesByDay[item.date].kills += item.kills;
                    graphValuesByDay[item.date].deaths += item.deaths;
                    graphValuesByDay[item.date].practice += item.practice;
                }
                else {
                    graphValuesByDay[item.date] = {kills: item.kills, deaths: item.deaths, practice: item.practice};
                }
            });

            Object.keys(graphValuesByDay).forEach(date => {
                const item = graphValuesByDay[date];
                if(item.deaths === 0) {
                    KDRatio = item.kills;
                }
                else {
                    KDRatio = item.kills/item.deaths;
                }
                graphValues.push([date, KDRatio, item.practice]);
            })


            console.log(graphValues);
            this.setState({ careerStats: snap.val(), graphArray: graphValues });
        });
        // this.setState({uid: firebase.auth().currentUser.uid});
    }

    logout() {
        firebase.auth().signOut();
    }

    render() {
        // let date = new Date();
        // let currDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        // let userProfile = firebase.database().ref(firebase.auth().currentUser.uid);
        // userProfile.on('value', (snap) => { console.log(snap.val()) });
        let drawCareerStats = null;

        let totalKills = 0;
        let totalDeaths = 0;
        let totalPractice = 0;
        if (this.state.careerStats) {
            Object.values(this.state.careerStats).forEach(item => { totalKills += item.kills });
            Object.values(this.state.careerStats).forEach(item => { totalDeaths += item.deaths });
            Object.values(this.state.careerStats).forEach(item => { totalDeaths += item.practice });
        }

        return (
            <div>
                <div>
                    <div>
                        Total career practice time: {totalDeaths} minutes
                    </div>
                    <div>
                        Total career kills: {totalKills}
                    </div>
                    <div>
                        Total career deaths: {totalDeaths}
                    </div>
                </div>
                <ChartViewer values = {this.state.graphArray}/>
                <div>Enter time practiced in minutes:
                <input type="text" pattern="[0-9]*" onChange={this.handleChangePractice} value={this.state.practiceTime} />
                    <button disabled={this.state.practiceTime === ''} onClick={this.submitPracticeStats}>Submit practice time</button>
                </div>
                <div>
                    Match stats
                <div>Enter match kills:
                <input type="text" pattern="[0-9]*" onChange={this.handleChangeKills} value={this.state.matchKills} />
                    </div>
                    <div>Enter match deaths:
                <input type="text" pattern="[0-9]*" onChange={this.handleChangeDeaths} value={this.state.matchDeaths} />
                    </div>
                    <button onClick={this.submitGameStats} disabled={((this.state.matchKills === '') || (this.state.matchDeaths === ''))}>Submit match stats</button>
                </div>
                <button onClick={this.logout}>Logout</button>
            </div>);

    }

}

export default Home;

