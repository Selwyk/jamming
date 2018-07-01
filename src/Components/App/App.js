import React, {Component} from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: [
        "name", "artist", "album", "id"
      ],
      playlistName: "Test name",
      playlistTracks: [
        {
          "name",
          "artist",
          "album",
          "id"
        }, {
          "name2",
          "artist2",
          "album2",
          "id2"
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //Adds a track to the playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(saved => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  //Removes a track from the playlist
  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName = name
    })
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
  }

  search(search){
    console.log(search);
  }

  render() {
    return (<div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>);
  }
}

export default App;
