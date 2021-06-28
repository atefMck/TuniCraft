import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom'
import './index.css';

class ForumEditor extends React.Component {
  constructor(props) {
    super(props);
    const subCategoryName = props.match.params.subCategoryName.replaceAll("-", " ")
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.authAxios = props.authAxios
    this.state = {
      subCategoryName,
      editorState: EditorState.createEmpty(),
      content: ""
    };
  }

  onTitleInputChange(e) {
    this.setState({title: e.target.value})
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      content: this.state.editorState.getCurrentContent()
    })
  }

  onSubmit() {
    const title = this.state.title
    const contentRaw = convertToRaw(this.state.editorState.getCurrentContent())
    this.authAxios.get("/api/forum/subcategories", {params: {name: this.state.subCategoryName}})
      .then(res => {
        const thread = {
          title,
          content: JSON.stringify(contentRaw),
          subCategoryId: res.data.id
        }
        this.authAxios.post("/api/forum/threads", thread)
      })
      .catch(err => {
        // console.log(err)
      })
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="forum">
        <div className="forum_editor">
          <main>
            <header>
              <h2>Posting in {this.state.subCategoryName}</h2>
            </header>
            <ul>
              <div className="title_input">
                <h3>Title</h3>
                <p>Required</p>
                <input type="text" onChange={e => this.onTitleInputChange(e)}/>
              </div>
              <div className="title_input">
                <h3>Content</h3>
                <p>Required</p>
              </div>
              <Editor
                editorState={editorState}
                toolbarClassName="editor_toolbar"
                wrapperClassName="editor_wrapper"
                editorClassName="editor_main"
                onEditorStateChange={this.onEditorStateChange}
              />
              <button onClick={this.onSubmit}>Submit Thread</button>
            </ul>
          </main>
        </div>
      </div>
      );
    }
  }
  
export default withRouter(ForumEditor);