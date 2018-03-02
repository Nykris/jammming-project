import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';


class SearchResults extends React.Component {

  /* NOTE - This attribute/value is getting applied to you via App.js as props!
  searchResults={this.state.searchResults}
  this.state.searchResults = an array of these:
  {
    name: 'Total Annihilation',
    artist: 'Clif Linn',
    album: 'This Is War'
  }
  So the array of those objects are now this.props.searchResults.

  NOTE - THING #2 ADDED via App.js as props!
  onAdd={this.addTrack}
  addTrack() checks if the track's id is in App.js's PlaylistTracks object.
  If the track's id ISN'T, then it adds the current track to App.js's
  PlaylistTracks object.
  this.setState({
    playlistTracks: this.state.playlistTracks.concat([track])
  });
  So addTrack() is now a PROP, stored as this.props.onAdd.

  */

  render(){
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }

} // end SearchResults component

export default SearchResults;
