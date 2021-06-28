import './index.css'
import avatar from 'assets/avatar_ph.png'
import { Link, useRouteMatch } from 'react-router-dom'
import stringifyDate from 'helper/date'


function Thread(props) {
  const { url } = useRouteMatch()
  const authorAvatar = avatar
  const threadId = props.threadId
  const title = props.title
  const repliesCount = props.repliesCount
  const threadViews = props.threadViews
  const latestComment = props.latestComment
  const lastUpdatedAvatar = props.lastUpdatedAvatar || avatar
  const date = stringifyDate(latestComment?.createdAt)
  let latestCommentDate = "No replies yet"
  if (!isNaN(date)) {
    latestCommentDate = `${date} Days ago` || "No replies yet"
  }
  
  const latestCommentUser = latestComment?.user?.userName || "" || ""
  const titleURL = title.replaceAll(" ", "-")

  return (
    <li key={`${threadId}_list`} className="thread">
      <img src={ authorAvatar } alt="av"></img>
      <main>
        <Link exact="true" to={`${url}/${titleURL}`}><h1>{ title }</h1></Link>
        <p>By {props.author}, {stringifyDate(props.threadCreated)}</p>
      </main>
      <div>
        <h2>Replies:</h2>
        <h2>Views:</h2>
      </div>
      <div>
        <p>{ repliesCount }</p>
        <p>{ threadViews }</p>
      </div>
      <div>
        <h2>{ latestCommentDate }</h2>
        <p>{ latestCommentUser }</p>
      </div>
      <img src={ lastUpdatedAvatar } alt="av"></img>
    </li>
  )
}

export default Thread