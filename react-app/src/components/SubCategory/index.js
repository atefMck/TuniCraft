import React from 'react'
import './index.css'
import { Link, withRouter } from 'react-router-dom'
import stringifyDate from 'helper/date'

class SubCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.subCategoryId,
      icon: props.icon,
      name: props.name,
      threadCount: props.threadCount,
      messagesCount: props.messagesCount,
      latestThread: props.latestThread,
      latestThreadName: props.latestThread?.title || "No threads yet",
      latestThreadLastUpdated: stringifyDate(props.latestThread?.updatedAt) || "",
      url: props.match.url,
      path: props.match.path
    }
  }

  render() {
    const urlName = this.state.name.replaceAll(" ", "-")
    return (
      <li className="sub_category" key={`${this.state.id}_list`}>
        <span>{ this.state.icon }</span>
        <h1><Link exact="true" to={`${this.state.url}/${urlName}`}>{ this.state.name }</Link></h1>
        <div>
          <h2>Threads</h2>
          <p>{ this.state.threadCount }</p>
        </div>
        <div>
          <h2>Messages</h2>
          <p>{ this.state.messagesCount }</p>
        </div>
        <div>
          <h2>{ this.state.latestThreadName }</h2>
          <p>{ this.state.latestThreadLastUpdated }</p>
        </div>
      </li>
    );
  }
}

export default withRouter(SubCategory)