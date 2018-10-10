import React from "react";
import ReactDOM from "react-dom";

class Photo extends React.Component {
  render () {
    return (
      <div className="col-3">
        <div className="photo-item">
          <img className="img-thumbnail" src={this.props.url} alt={this.props.id} />
          <button href="#" className="add-to-favourites btn btn-link"><i className="fas fa-star"></i></button>
        </div>
      </div>
    )
  }
}

export default Photo;
