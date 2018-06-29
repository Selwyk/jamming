import React, { Component } from 'react';
import './TrackList.css';
import Track from './Components/Track/Track';

class TrackList extends Component{
  render(){
    return(
      <div className="TrackList">
          this.props.tracks.map(track =>{
            return <Track track = {track} onAdd= {this.props.onAdd}/>

          })
      </div>
    )}
  }

export default TrackList;
