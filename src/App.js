import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import Header from './components/Header';
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
      <div>
        <Header showPhotoList={this.showPhotoList} showFavList={this.showFavList} currentPage={currentPage}/>
        <div className="container">
          <PhotoList photoList={photoList} favList={favList} mode={currentPage} loaded={loaded}/>
        </div>
      </div>
    )
  }
}

export default App;
