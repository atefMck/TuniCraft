import React, { useState } from 'react'
import './index.css'
import { useSpring, animated } from 'react-spring'
import { LoginForm, RegisterForm } from './Auth'
import { withRouter } from 'react-router-dom'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Content(props) {
  const popupContent = props.popupContent
  const closePopup = props.closePopup

  return (
    <div className="container_form">
      <div className="form_header">
          <FontAwesomeIcon icon={faTimesCircle} className="header_close" onClick={closePopup}/>
      </div>
      <div className="form_content">
        { popupContent }
      </div>
    </div>
  )
}

function Popup(props) {
  const authAxios = props.authAxios
  const closePopup = props.closePopup
  const [active, setActive] = useState(true)
  const popups = {
    login: <LoginForm authAxios={authAxios} showPopup={props.showPopup}/>,
    register: <RegisterForm authAxios={authAxios} showPopup={props.showPopup}/>
  }
  const popupContent = popups[props.popupContent]
  
  const backgroundAnimation = useSpring({
    to: { opacity: active ? 1 : 0 },
    from: { opacity: active ? 0 : 1 },
    config: { duration: 300 },
    onRest: () => {
      if (!active) closePopup()
    }
  })

  const contentAnimation = useSpring({
    to: { opacity: active ? 1 : 0 },
    from: { opacity: active ? 0 : 1 },
    config: { duration: 300 },
    delay: 300
  })

  const close = () => {
    setActive(false)
  }

  return (
      <animated.div style={backgroundAnimation} className="container">
        <animated.div style={contentAnimation}>
          <Content popupContent={popupContent} closePopup={close}/>
        </animated.div>
      </animated.div>
  )
}

export default withRouter(Popup)
