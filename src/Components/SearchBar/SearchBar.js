import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  /* my old one
  search(searchTerm){
    this.props.onSearch = searchTerm.state;
  } */

  search(){
    this.props.onSearch(this.state.term);
  }

  // fixed from step 71
  handleTermChange(event){
    //this.props.onSearch = event.target.value;
    this.setState({
      term: event.target.value
    });
  }


  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter a song, album, or artiiste." onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }

} // end SearchBar component

export default SearchBar;
