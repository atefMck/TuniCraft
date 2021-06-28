import React from 'react';
import { withRouter } from 'react-router-dom'
import './index.css';
import { Comment } from 'components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import avatar from 'assets/avatar_ph.png'
import stringifyDate from 'helper/date'

class ForumPost extends React.Component {
  constructor(props) {
    super(props)
    this.authAxios = props.authAxios
    this.url = props.match.url
    this.path = props.match.path
    this.threadTitle = props.match.params.threadTitle.replaceAll("-", " ")
    this.onContentStateChange = this.onContentStateChange.bind(this)
    const editorStatewithContent = EditorState.createEmpty();  
    this.state = {
      currentUser: props.user,
      editorState:  editorStatewithContent, 
      thread: {
        comments: []
      },
    }
  }
  
  onContentStateChange(contentState) {
    this.setState({
      contentState,
    });
  };

  componentDidMount() {
    this.authAxios.get("http://localhost:8080/api/forum/threads/", {params: {title: this.threadTitle}})
    .then(res => {
      const thread = res.data
      const content = convertFromRaw(JSON.parse(thread.content))
      const comments = thread.comments.map((comment) => (<Comment data={comment} user={comment.user} />))
      thread.comments = comments
      const ranks = thread.user.Ranks.map(rank => <img key={rank.id} className="rank" src={rank.badge} alt={rank.name} />)
      thread.user.Ranks = ranks
      const newEditorState = EditorState.createWithContent(content); 
      this.setState({thread: thread, editorState: newEditorState})
    })
  }

  render() {
    return (
      <div className="forum">
        <div className="forum_post">
          <div>
            <header>
              <div>
                <h2>{ this.state.thread?.title }</h2>
                <p>By {this.state.thread?.user?.userName}, {stringifyDate(this.state.thread?.createdAt)}</p>
              </div>
              <div>
                <p>Like</p>
                <p>Dislike</p>
                <p>Report</p>
              </div>
            </header>
            <article className="post_content">
              <aside>
                <img src={ avatar } alt="avatar"></img>
                <h2>{ this.state.thread?.user?.userName }</h2>
                {this.state.thread?.user?.Ranks}
                <div>
                  <h3>Joined:</h3>
                  <p>{ stringifyDate(this.state.thread?.user?.createdAt) }</p>
                </div>
              </aside>
              <main>
                <Editor editorState={this.state.editorState} readOnly toolbarHidden onContentStateChange={this.onContentStateChange}/>
              </main>
            </article>
          </div>
          <div>
            {this.state.thread?.comments}
          </div>
          <div>
            <Editor
              toolbarClassName="editor_toolbar"
              wrapperClassName="editor_wrapper"
              editorClassName="editor_main"
            />
          </div>
        </div>
      </div>
      );
    }
  }
  
export default withRouter(ForumPost);