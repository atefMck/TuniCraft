import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import './index.css';
import { Thread } from 'components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

class ForumThreads extends React.Component {
  constructor(props) {
    super(props)
    this.authAxios = props.authAxios
    this.path = props.match.path
    this.url = props.match.url
    this.state = {
      user: props.user,
      subcategory: {
        name: this.props.match.params.subCategoryName,
        description: "error"
      }
    }
  }

  componentDidMount() {
    const subCategoryName = this.state.subcategory.name
    if (subCategoryName) {
      this.authAxios.get("http://localhost:8080/api/forum/subcategories/", {params: {name: subCategoryName.replaceAll("-", " ")}})
      .then(res => {
        const subcategory = res.data
        const threads = subcategory.threads.map(thread => (
          <Thread key={thread.id} author={thread.user?.userName} threadId={thread.id} threadCreated={thread.createdAt} title={thread.title} repliesCount={thread.comments.length} threadViews={thread.dislikes} latestComment={thread.comments[0]}/>
        ))
        subcategory.threads = threads
        this.setState({subcategory: subcategory});
      })
    }
  }

  render() {
    return (
      <div className="forum">
        <div className="forum_threads">
          <main>
              <header>
                <div>
                  <h2>{this.state.subcategory.name}</h2>
                  <p>{this.state.subcategory.description}</p>
                </div>
                <Link exact="true" to={`${this.url}/post_thread`}>
                  <button><FontAwesomeIcon icon={faPlusSquare} className="icon"/> Post thread</button>
                </Link>
              </header>
              <ul>
                {this.state.subcategory.threads}
              </ul>
          </main>
        </div>
      </div>
      );
    }
  }
  
export default withRouter(ForumThreads);