import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {

  const navigate = useNavigate()

  const forward = () => {
    navigate(1)
  }
  const back = () => {
    navigate(-1)
  }
  
  return (
    <div className="page-header">
      <h2>React Router Demo</h2>
      <button  onClick={forward}>前进</button>
      <button onClick={back}>后退</button>
    </div>
  )
}
