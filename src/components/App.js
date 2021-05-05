import React, { Component } from 'react';
import Header from './Header';
import Search from './Search';
import Images from './Images';
import axios from '../api/unsplash-api';

class App extends Component {
  state = { imageList: [] };

  onSearchSubmit = async (searchTerm) => {
    const res = await axios.get('search/photos', {
      params: { query: searchTerm },
    });

    this.setState({ imageList: res.data.results });
  };

  async componentDidMount() {
    const res = await axios.get('photos?page=1');
    this.setState({ imageList: res.data });
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <Header title="ReactSplash" />
          <Search onSubmit={this.onSearchSubmit} />
          <Images images={this.state.imageList} />
        </div>
      </div>
    );
  }
}

export default App;