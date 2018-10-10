import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import Photo from './Photo';

class PhotoList extends React.Component {
  state = {photoList: [], loaded: false}

  componentDidMount() {
    window.addEventListener('scroll', this.loadMorePhotos, false);
    this.fetchPhotos(32);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMorePhotos, false);
  }

  loadMorePhotos = () => {
    console.log(window.innerHeight + window.scrollY >= document.body.offsetHeight);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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

  render () {
    let {photoList, loaded} = this.state;

    return (
      <div id="photo-list">
        <div className="row">
          { photoList.length > 0 ?
              photoList.map((link, i) => (
                <Photo url={link} key={i + this.extractId(link)} />
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
