import React, { Component } from 'react';

class Search extends Component {
  state = { searchTerm: '' };

  render() {
    return (
      <div className="one column row">
        <form
          className="ui form container icon input"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSubmit(this.state.searchTerm);
          }}
        >
          <i className="search icon"></i>
          <input
            type="text"
            placeholder="Search free high-resolution photos"
            data-testid="search-input"
            value={this.state.searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

export default Search;