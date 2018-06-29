import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchResults : ["name", "artist", "album", "id"],
      playlistName : "Test name",
      playlistTracks : [{"name", "artist", "album", "id"},{"name2", "artist2", "album2", "id2"}]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  //Adds a track to the playlist
  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(saved
      => savedTrack.id ===track.id)){
        return;
    }else{
      tracks.push(track);
      this.setState({playlistTracks : tracks});
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName : {this.state.playlistName} playlistTracks: {this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
