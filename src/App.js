import React, { Component } from 'react';
import './App.css';
import Chart from 'react-apexcharts';

class App extends Component {
  state = {
    kdRatio: 0.5,
    gamesWon: 100,
    timePracticed: 90,
    newPracticeValue: '',
    newGameRoundsWon: '',
    newGameRoundsLost: '',
    newGameRoundsK: '',
    newGameRoundD: '',
    options: {
      xaxis: {
        categories: ['a', 'b', 'c', 'd', 'e']
      }
    },
    series: [
      {
        name: 'test',
        data: [1, 2, 3, 4, 5]
      }
    ]
  }

  render() {
    return (
      <div>
        <div>Overall stats</div>
        <div>k/d ratio, games won, time practiced</div>
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
      </div>
    )
  }
}

export default App;
