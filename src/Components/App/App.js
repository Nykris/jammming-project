import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {

  constructor(props){
    super(props);

    //this.handleOnClick = this.handleOnClick.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [] // end playlistTracks object
    }; // end this.state

  } // end constructor

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults});
      });
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  // y no hint for this step?
  // my code looked VERY different from this... very difficult
  addTrack(track){
    let tracks = this.state.playlistTracks;
    tracks.push(track);

    this.setState({playlistTracks: tracks});
  } // end addTrack

  // IDEA - my custom little method works!!!
  handleOnClick(){
    console.log("hai guyz");
  }
  // IDEA - Hope this works - wrote this one myself!
  // fixed - no more
  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        {/* this was my version to try out a simple click method
        <h1 onClick={this.handleOnClick}>Ja<span className="highlight">mmm</span>ing</h1> */}
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
