import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {

  constructor(props){
    super()
    this.state = {
      searchResults : []
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.SearchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
