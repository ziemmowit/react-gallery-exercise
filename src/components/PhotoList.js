import React from "react";
import ReactDOM from "react-dom";

class PhotoList extends React.Component {
  render () {
    let list = [
      "https://cdn.shibe.online/shibes/2058a42728365ca429277095a98a540c1d3dfbbf.jpg",
      "https://cdn.shibe.online/shibes/916dcb73e65259a0ffe9adf0a9be3e3a14981825.jpg",
      "https://cdn.shibe.online/shibes/5e824c7b11a9f417af76c09978f087d0606c2691.jpg",
      "https://cdn.shibe.online/shibes/6bc2fe0e0e91bda19b5986e893c20f9e3cf2231e.jpg",
      "https://cdn.shibe.online/shibes/916dcb73e65259a0ffe9adf0a9be3e3a14981825.jpg",
      "https://cdn.shibe.online/shibes/2058a42728365ca429277095a98a540c1d3dfbbf.jpg",
      "https://cdn.shibe.online/shibes/916dcb73e65259a0ffe9adf0a9be3e3a14981825.jpg"
    ]
    return (

      <div id="photo-list">
        <div className="row">
          {
            list.map((link, i) => (
              <div className="col-3">
                <div className="photo-item">
                  <img className="img-thumbnail" src={link} alt="..." />
                  <button href="#" className="add-to-favourites btn btn-link"><i className="fas fa-star"></i></button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default PhotoList;
