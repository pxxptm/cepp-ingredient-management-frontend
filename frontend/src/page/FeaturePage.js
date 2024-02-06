import React from 'react'
import './FeaturePage.css'
import HomeHeaderBar from '../component/HomeHeaderBar'

function FeaturePage() {
  return (
    <div id="Feature-page">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <div id="Feature-page-body">
              <div id="Home-page-header"><HomeHeaderBar></HomeHeaderBar></div>
              <div id="feature-box-bg">
                <div id="L-feature-box"></div>
              </div>
            </div>
        </div>
  )
}

export default FeaturePage