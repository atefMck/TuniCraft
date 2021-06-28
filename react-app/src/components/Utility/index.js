import './index.css'
import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class verification extends React.Component {
  constructor(props) {
    super(props)
    this.authAxios = axios.create({
      baseURL: "http://localhost:8080",
      browserBaseURL: "http://localhost:8080",
      headers: {
          authorization: `Bearer ${localStorage.getItem("CXRF-token")}`
      }
    })
    this.userId = props.match.params.userId
    this.token = props.match.params.token
    this.state = {
      verfied: false
    }
  }

  componentDidMount() {
    this.authAxios.get(`/api/security/verify-account/${this.userId}/${this.token}`)
      .then((res) => {
        this.setState({verified: res.data.verified})
      })
  }

  render() {
    return (
      <div style={{color: 'var(--bg-black-medium)'}}>
        {this.state.verified ? <p>Verifcation complete</p> : <p>Verifying account</p>}
      </div>
    )
  }
}

export default withRouter(verification)