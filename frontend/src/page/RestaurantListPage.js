import React from "react";
import axios from "axios";
import './RestaurantListPage.css'

function RestaurantListPage(props) {
    const url = "http://localhost:3001/member/restaurant";
    const accessToken = localStorage.getItem("token")

    axios.get(url, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then((response) => {
        // handle success
        console.log(response);
    })
        .catch((error) => {
            console.log(error)
        });

    return (
        <p>xxxx</p>
    )
}

export default RestaurantListPage