import './index.css'
import avatar from 'assets/avatar_ph.png'
import stringifyDate from 'helper/date'

function Comment(props) {
  const comment = props.data
  const user = props.user

  const content = comment.content
  const createdAt = comment.createdAt
  const updatedAt = comment.updatedAt
  const userAvatar = avatar
  const username = user.userName
  const userJoined = user.createdAt

  return (
    <article className="post_content">
      <aside>
        <img src={ userAvatar } alt="avatar"></img>
        <h2>{ username }</h2>
        {/* {this.state.thread?.user?.Ranks} */}
        <div>
          <h3>Joined:</h3>
          <p>{ stringifyDate(userJoined) }</p>
        </div>
      </aside>
      <main>
        {/* <Editor editorState={this.state.editorState} readOnly toolbarHidden onContentStateChange={this.onContentStateChange}/> */}
        <p>{content}</p>
      </main>
    </article>
  )
}

export default Comment