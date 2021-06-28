import React from 'react';
import _ from "lodash"
import './index.css';
import {SubCategory} from 'components'

// import { member } from 'helper/placeholders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFileAlt
} from '@fortawesome/free-solid-svg-icons'

class Forum extends React.Component {
  constructor(props) {
    super(props)
    this.authAxios = props.authAxios
    this.state = {
      categories: []
    }
  }

componentDidMount() {
  this.authAxios.get("http://localhost:8080/api/forum/")
  .then(categories => {
    const categoriesJSX = categories.data.map(category => (
      <div key={category.id}>
        <header>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </header>
        <ul>
          { category.sub_categories.map(subcategory => (
            <SubCategory
            authAxios={this.authAxios}
            key={subcategory.id}
            subCategoryId={subcategory.id}
            className="icon" 
            icon= {<FontAwesomeIcon icon={faFileAlt}/>}
            name={subcategory.name} 
            threadCount={subcategory.threads.length} 
            messagesCount={_.sumBy(subcategory.threads, thread => {return thread.comments?.length || 0})} 
            latestThread={subcategory.threads[0]} />
            )) }
        </ul>
      </div>
    ))
    this.setState({categories: categoriesJSX});
  })
}
  
  render() {
    return (
      <div className="forum">
        <div className="forum_landing">
          <main>
            {this.state.categories}
          </main>
          <aside>
            <div>
              <header>
                <h2>Online Staff</h2>
              </header>
              {/* { member } */}
            </div>
            <div>
              <header>
                <h2>Forum Statistics</h2>
              </header>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}
export default Forum;