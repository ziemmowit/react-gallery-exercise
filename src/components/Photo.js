import React from "react";
import ReactDOM from "react-dom";

class Photo extends React.Component {
  render () {
    return (
      <div className="col-3">
        <div className="photo-item">
          <div className="photo-wrapper img-thumbnail">
            <div className="photo" style={{backgroundImage: `url(${this.props.url})`}}></div>
          </div>
          <button href="#" className="add-to-favourites btn btn-link"><i className="fas fa-star"></i></button>
        </div>
      </div>
    )
  }
}

export default Photo;
