import React from "react";
import ReactDOM from "react-dom";

class Photo extends React.Component {
  photoClass = () => {
    if(this.props.favourites) {
      return "photo-item active"
    } else {
      return "photo-item"
    }
  }
  render () {
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
        <div className={this.photoClass()}>
          <div className="photo-wrapper img-thumbnail">
            <div className="photo" style={{backgroundImage: `url(${this.props.url})`}}></div>
          </div>
          <button className="add-to-favourites btn btn-link" onClick={() => this.props.updateFavourites(this.props.url)}><i className="fas fa-star"></i></button>
        </div>
      </div>
    )
  }
}

export default Photo;
