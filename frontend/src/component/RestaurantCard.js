import React from 'react'
import './RestaurantCard.css'

function RestaurantCard(props) {
  const url = "http://localhost:3000/" + props.restaurantName
  return (
    <a id="rest-card-link" href={url}>
      <div id="rest-card-container">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          <div id="rest-card-pic">
            <button><i className="material-icons">border_color</i></button>
          </div>
          <div id="rest-card-content">
              <div id="rest-card-name">
                  {props.restaurantName}
              </div>
              <div id="rest-card-description">
                  {props.restaurantDescription}
              </div>
          </div>
      </div>
    </a>
  )
}

export default RestaurantCard