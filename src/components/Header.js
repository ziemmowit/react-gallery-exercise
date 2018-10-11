import React from "react";
import ReactDOM from "react-dom";

class Header extends React.Component {
  render () {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={this.props.showPhotoList}>Galeria</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={this.props.currentPage === 'photoList' ? 'nav-item active' : 'nav-item' } onClick={this.props.showPhotoList}>
              <a className="nav-link" href="#">Lista zdjęć <span className="sr-only">(current)</span></a>
            </li>
            <li className={this.props.currentPage === 'favList' ? 'nav-item active' : 'nav-item' } onClick={this.props.showFavList}>
              <a className="nav-link" href="#">Ulubione</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
