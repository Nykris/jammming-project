import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

/* NOTE - Ya got this attribute/value applied to you from
SearchResults.js, so it's now a prop:
tracks = this.props.searchResults.  This.props.SearchResults
got applied from App.js as a state property, and is an array
of these:
{
  name: 'Jelly',
  artist: 'JoSchmo',
  album: 'Toast'
}

NOTE - onAdd added from SearchList.js!  So it's now a prop!
onAdd={this.props.onAdd}
onAdd is really addTrack() from App.js.
addTrack() checks if the track's id is in App.js's PlaylistTracks object.
If the track's id ISN'T, then it adds the current track to App.js's
PlaylistTracks object.
this.setState({
  playlistTracks: this.state.playlistTracks.concat([track])
});

NOTE - onRemove added from Playlist.js as a prop!
onRemove={this.props.onRemove}

onRemove is really this.removeTrack from App.js.
App.js's removeTrack() returns a new array of App.js's PlaylistTracks, without
the current track (identified by track.id).

NOTE - got isRemoval added from Tracklist.js as a prop!
isRemoval={false}

Nothin' special.  It's just false brah.
*/

class TrackList extends React.Component {

  render(){
    return(
      <div className="TrackList">
        {/* You will add a map method that renders a set of Track components */}
        {
          this.props.tracks.map(track => {
          return <Track track={track}
                key={track.id}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval} />

          /* NOTE - step 34, it said "Set the key attribute to track.id,"
          but the hint said pass current track as an attribute called track */
          })
        }
      </div>
    );
  }

} // end TrackList components

export default TrackList;
