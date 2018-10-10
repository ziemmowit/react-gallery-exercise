import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import Photo from './components/Photo';
import PhotoList from './components/PhotoList';

class App extends React.Component {
  state = {photoList: [], favList: [], loaded: false, currentPage: 'photoList'}

  componentDidMount() {
    window.addEventListener('scroll', this.loadMorePhotos, false);
    this.fetchPhotos(32);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMorePhotos, false);
  }

  loadMorePhotos = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && this.state.loaded) {
      this.fetchPhotos();
    }
  }
  fetchPhotos = (pNum = 16) => {
    this.setState({loaded: false})
    axios({
      url: `https://shibe.online/api/shibes?count=${pNum}`,
      method: 'GET',
    }).then(response => {
      this.setState({
        photoList: this.state.photoList.concat(response.data),
        loaded: true
      })
    }, error => {
      this.setState({
        loaded: true
      })
      console.log("Error: " + error);
    })
  }

  showPhotoList = () => {
    this.setState({currentPage: 'photoList'});
  }
  showFavList = () => {
    this.setState({currentPage: 'favList'});
  }

  render () {
    let {photoList, favList, loaded, currentPage} = this.state;

    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Galeria</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active" onClick={this.showPhotoList}>
                <a className="nav-link" href="#">Lista zdjęć <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item" onClick={this.showFavList}>
                <a className="nav-link" href="#">Ulubione</a>
              </li>
            </ul>
          </div>
        </nav>

        <PhotoList photoList={photoList} favList={favList} mode={currentPage} loaded={loaded}/>
      </div>
    )
  }
}

export default App;
