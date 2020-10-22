import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.js";
import WordsList from "./WordsList.js";

//import findAllSolutions from './boggle_solver.js';
//import RandomGrid from './generateBoard.js';
import dictionary from "./dictionary.js";

function RandomGrid() {
  return [
    ['G','R','I','P','QU'],
    ['T','E','S','T','E'],
    ['H','A','T','N','U'],
    ['O','N','C','E','E'],
    ['W','E','N','C','H']
  ]
}

function findAllSolutions() {
  return [
    "GRIP", "QUEUE", "TEST", "HAT", "ONCE", "WENCH"
  ];
}

// Props are passed via HTML attributes, state is managed within the component privately //

class App extends React.Component {
  constructor(props) {
    super(props);

    let grid = RandomGrid();
    let solutions = findAllSolutions(dictionary, grid);

    this.state = {
      gameStarted: false,
      foundWords: [],
      solutions: solutions,
      grid: grid
    }
    
    console.log(this.state.solutions.length);
    for (let i = 0; i < this.state.solutions.length; i++) {
      console.log(this.state.solutions[i]);
    }
  }

  render() {
    return (
      <div className="App">
        {!this.state.gameStarted && <button onClick={() => this.setState({gameStarted: true})}><h2>START GAME</h2></button>}
        {this.state.gameStarted && <Board grid={this.state.grid} submitGuessCallback={this.submitGuess} />}
        {this.state.gameStarted && <WordsList wordslist={this.state.solutions} foundWords={this.state.foundWords} />}
      </div>
    );
  }

  submitGuess(guess) {
    console.log("Guess submitted: " + guess);
    
    // Why is this printing the props of Board? We're inside of App not Board + "this" should contain the state object because we defined it on line 35 //
    console.log(this);
    if (this.state.foundWords.includes(guess)) {
      alert("You already found \"" + guess + "\"!");
    }
  
    for (let solution of this.state.solutions) {
      if (solution === guess) {
        this.state.foundWords.push(guess);
        this.setState({
          foundWords: this.state.foundWords
        });
      }
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);