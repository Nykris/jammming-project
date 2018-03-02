import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

/* NOTE - PROPS ALERT BRO!

These got applied to you as props in App.js:
playlistName = this.state.playlistName
playlistTracks = this.state.playlistTracks

playlistName = 'Some Random Playlist Name'
playlistTracks = an array of these:
  {
    name: 'Jelly',
    artist: 'JoSchmo',
    album: 'Toast'
  }

NOTE - removeTrack() applied as a prop from App.js!
onRemove={this.removeTrack}

App.js's removeTrack() returns a new array of App.js's PlaylistTracks, without
the current track (identified by track.id).

NOTE - onNameChange applied as a prop from App.js!
onNameChange={this.updatePlaylistName}

updatePlaylistName() takes an input.  Whatever the input is, the App's
PlaylistName becomes that.
*/

class PlayList extends React.Component {

  constructor(props){
    super(props);
    // GOT IT - step 60 - don't know this is right, but it loads
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // step 59 - Axel confirmed I got this right!!
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  render(){
    return(
      <div className="Playlist">
        {/* according to step 59, we will apply an onChange attribute to the
        <input> element in another component.
        NEVERMIND - step 61 had us add it, didn't say to add to <input>
        but that makes sense */}
        <input onChange={this.handleNameChange} defaultValue={'New Playlist'} />
        <TrackList tracks={this.props.playlistTracks}
            isRemoval={true}
            onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }



} // end Playlist component

export default PlayList;
