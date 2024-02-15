import React from 'react'
import './RestaurantCard.css'

function RestaurantCard(props) {
  return (
    <div id="rest-card-container">
        <div id="rest-card-pic"></div>
        <div id="rest-card-content">
            <div id="rest-card-name">
                {props.restaurantName}
            </div>
            <div id="rest-card-description">
                {props.restaurantDescription}
            </div>
        </div>
    </div>
  )
}

export default RestaurantCard