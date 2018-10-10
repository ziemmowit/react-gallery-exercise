import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import Photo from './Photo';

class PhotoList extends React.Component {
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

  extractId = (str) => {
    const arr = str.split("/");
    return arr[arr.length - 1].split(".")[0];
  }
  updateFavourites = (link) => {
    let arr = this.state.favList;

    if (arr.includes(link)) {
      arr = arr.filter((value) => value != link);
    } else {
      arr.push(link)
    }

    this.setState({favList: arr})
  }

  showPhotoList = () => {
    this.setState({currentPage: 'photoList'});
  }
  showFavList = () => {
    this.setState({currentPage: 'favList'});
  }

  noPhotosMsg = () => {
    if(!this.state.loaded) {
      return (<div className="col"><p className="loading-msg"><i className="fas fa-spinner fa-spin"></i></p></div>)
    } else {
      return (<div className="col"><p className="loading-msg">Brak zdjęć</p></div>)
    }
  }

  render () {
    let {photoList, favList, loaded, currentPage} = this.state;

    let list = [];
    if(currentPage === "favList") {
      list = this.state.favList;
    } else {
      list = this.state.photoList;
    }

    return (
      <div id="photo-list">
        <div>
          <button onClick={this.showPhotoList}>PhotoList</button>
          <button onClick={this.showFavList}>FavList</button>
        </div>
        <div className="row">
          { list.length > 0 ?
              list.map((link, i) => (
                <Photo favourites={favList.includes(link)} url={link} key={i + this.extractId(link)} updateFavourites={this.updateFavourites}/>
              ))
            :
            (this.noPhotosMsg())
          }
        </div>
      </div>
    )
  }
}

export default PhotoList;
