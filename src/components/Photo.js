import React from "react";
import ReactDOM from "react-dom";

class Photo extends React.Component {
  state = {backgroundStyles: {backgroundColor: '#dee2e6'}}
  img = new Image();

  componentDidMount() {
    this.img.onload = () => {this.setState({backgroundStyles: {backgroundImage: `url(${this.props.url})`,  backgroundColor: '#fff'}})};
    this.img.src = this.props.url;
  }
  componentWillUnmount() {
    this.img.onload = null;
  }

  photoClass = () => {
    if(this.props.favourites) {
      return "photo-item active"
    } else {
      return "photo-item"
    }
  }
  render () {
    return (
      <div className="photo-item-outer col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
        <div className={this.photoClass()}>
          <div className="photo-wrapper img-thumbnail">
            <div className="photo" style={this.state.backgroundStyles}></div>
          </div>
          <button className="add-to-favourites btn btn-link" onClick={() => this.props.updateFavourites(this.props.url)}><i className="fas fa-star"></i></button>
        </div>
      </div>
    )
  }
}

export default Photo;
