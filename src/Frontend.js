import React, { Component } from 'react';

class Frontend extends Component {
    state = {
        kdRatio: 0.5,
        gamesWon: 100,
        timePracticed: 90,
        newPracticeValue: '',
        newGameRoundsWon: '',
        newGameRoundsLost: '',
        newGameRoundsK: '',
        newGameRoundD: ''
    }

    render() {
        return (
            <div>
                <div>
                    Overall stats
                </div>
                <div>
                    k/d ratio, games won, time practiced
                </div>
                <div>
                    graph of k/d ratio to games won
                </div>
                <div>
                    Add practice time
                    <div>
                        <input type='text'></input>
                        <button>Submit</button>
                    </div>
                </div>
                <div>
                    Add game results
                    <div>
                        Rounds won:<input type='text'></input>
                    </div>
                    <div>
                        Rounds lost:<input type='text'></input>
                    </div>
                    <div>
                        K:<input type='text'></input>
                    </div>
                    <div>
                        D:<input type='text'></input>
                    </div>
                    <button>Submit</button>
                </div>
            </div>);
    }
}

export default Frontend;