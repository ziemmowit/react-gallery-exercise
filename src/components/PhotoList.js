import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import Photo from './Photo';

class PhotoList extends React.Component {
  state = {photoList: [], favList: [], loaded: false}

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
      arr = arr.concat(this.state.favList, [link]);
    }

    this.setState({favList: arr})
  }

  render () {
    let {photoList, favList, loaded} = this.state;

    return (
      <div id="photo-list">
        <div className="row">
          { photoList.length > 0 ?
              photoList.map((link, i) => (
                <Photo favourites={favList.includes(link)} url={link} key={i + this.extractId(link)} updateFavourites={this.updateFavourites}/>
              ))
            :
            (<p className="error-msg"><i className="fas fa-spinner fa-spin"></i></p>)
          }
        </div>
      </div>
    )
  }
}

export default PhotoList;
