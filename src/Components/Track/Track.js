import React from 'react';
import './Track.css';

/* NOTE - onAdd added from TrackList.js!  So it's now a prop!
onAdd={this.props.onAdd}

onAdd is really addTrack() from App.js.
addTrack() checks if the track's id is in App.js's PlaylistTracks object.
If the track's id ISN'T, then it adds the current track to App.js's
PlaylistTracks object.
this.setState({
  playlistTracks: this.state.playlistTracks.concat([track])
});

NOTE - onRemove added from TrackList.js as a prop!
onRemove={this.props.onRemove}

onRemove is really this.removeTrack from App.js.
App.js's removeTrack() returns a new array of App.js's PlaylistTracks, without
the current track (identified by track.id).

NOTE - isRemoval added from Tracklist.js as a prop!
isRemoval={this.props.isRemoval}

Nothin' special.  It's just false brah. */

class Track extends React.Component {

  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    //this.renderAction = this.renderAction.bind(this);
  }

  renderAction(){
    if(this.props.isRemoval) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>

        {this.renderAction()}
      </div>
    );
  }

} // end Track component

export default Track;
