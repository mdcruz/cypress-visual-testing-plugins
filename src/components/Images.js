import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

class Images extends Component {
  getImages() {
    return this.props.images.map((image) => {
      const { small } = image.urls;
      return { src: small, ...image, width: 5000, height: 6000 };
    });
  }

  renderContent() {
    if (this.getImages().length === 0) {
      return 'No content found';
    } else {
      return (
        <div data-test-id="image-gallery">
          <Gallery photos={this.getImages()} />
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default Images;