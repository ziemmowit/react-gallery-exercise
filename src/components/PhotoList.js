import React from "react";
import ReactDOM from "react-dom";
import { CSSTransitionGroup } from 'react-transition-group'

import Photo from "./Photo"

class PhotoList extends React.Component {

  extractId = (str) => {
    const arr = str.split("/");
    return arr[arr.length - 1].split(".")[0];
  }

  noPhotosMsg = () => {
    if(!this.props.loaded) {
      return (<div className="col"><p className="loading-msg"><i className="fas fa-spinner fa-spin"></i></p></div>)
    } else {
      return (<div className="col"><p className="loading-msg">Brak zdjęć</p></div>)
    }
  }

  render () {
    let list = [];
    if(this.props.mode === "favList") {
      list = this.props.favList;
    } else {
      list = this.props.photoList;
    }

    const photos = list.map((link, i) => (
      <Photo favourites={this.props.favList.includes(link)} url={link} key={this.extractId(link)} updateFavourites={this.props.updateFavourites}/>
    ))

    return (
      <div id="photo-list">
        { list.length > 0 ?
          (
            this.props.mode === "favList" ?
            (
              <CSSTransitionGroup
                transitionName="photo-item"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={500}
                component="div"
                className="row">
                {photos}

              </CSSTransitionGroup>
            ) : (
              (<div className="row">{photos}</div>)
            )
          )
          :
          (this.noPhotosMsg())
        }
      </div>
    )
  }
}

export default PhotoList;
