import React from 'react'
import './Alerts.css'

const InfoAlert = ({text}) => {
  return (
    <div className="InfoAlert">
      <p>{text}</p>
    </div>
  )
}

export { InfoAlert }