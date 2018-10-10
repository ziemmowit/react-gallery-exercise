import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class PhotoList extends React.Component {
  state = {photoList: []}

  componentDidMount() {
    this.fetchPhotos();
  }

  fetchPhotos = () => {
    let pNum = 16

    axios({
      url: `https://shibe.online/api/shibes?count=${pNum}`,
      method: 'GET',
    }).then(response => {
      this.setState({
        photoList: response.data
      })
    }, error => {
      this.setState({
        photoList: []
      })
    })
  }

  extractId = (str) => {
    const arr = str.split("/");
    return arr[arr.length - 1].split(".")[0];
  }

  render () {
    let {photoList} = this.state;

    return (
      <div id="photo-list">
        <div className="row">
          { photoList.length > 0 ?
              photoList.map((link, i) => (
                <div key={this.extractId(link)} className="col-3">
                  <div className="photo-item">
                    <img className="img-thumbnail" src={link} alt={this.extractId(link)} />
                    <button href="#" className="add-to-favourites btn btn-link"><i className="fas fa-star"></i></button>
                  </div>
                </div>
              ))
            :
            (<p>Błąd ładowania danych</p>)
          }
        </div>
      </div>

    )
  }
}

export default PhotoList;
