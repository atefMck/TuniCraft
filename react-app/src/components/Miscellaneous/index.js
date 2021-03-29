import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { TimelineMax, Power2 } from "gsap";

function Post(props) {
    const title = props.title
    const date = props.date
    const author = props.author
    const content = props.content
    const image = props.image
    const postclass = props.type ? "news_post flex_reverse" : "news_post"
    
    return (<div className={postclass} >
                <div className="post_text">
                    <div className="post_header">
                        <h1>{title}</h1>
                        <p>{date} by <span>{author}</span></p>
                    </div>
                    <div className="post_content">
                        {content}
                    </div>
                    <div className="post_link">
                        <p>Read more <FontAwesomeIcon icon={faArrowRight} className="read_more"/></p>
                    </div>
                </div>
                <div className="post_image">
                    <img src={image} alt="" />
                </div>
            </div>)
}

function Feature(props) {
    const title = props.title
    const content = props.content
    
    return (<div className="feature_card">
                <div className="card_image">
                    <span>
                        {title}
                    </span>
                </div>
                <div className="card_details">
                    <div className="details_text">
                        <p>{content}</p>
                    </div>
                    <div className="details_button">Learn More</div>
                </div>
            </div>)
}

class Person extends React.Component {
    constructor(props) {
        super(props)
        this.avatar = null
        this.name = null
        this.myTween = new TimelineMax({paused: false})
    }

    componentDidMount() {
        this.myTween.from(this.avatar, {opacity: 0, y: -100, duration: 1, ease: Power2.out})
                    .from(this.name, {opacity: 0, y: 100, duration: 1, ease: Power2.out, delay: -1})
    }

    render() {
        const name = this.props.name
        const avatar = this.props.avatar
        return (<li key={this.props.index.toString()}><img src={avatar} alt="" ref={img => this.avatar = img}/><p ref={p => this.name = p}>{name}</p></li>)
    }
}

export {Post, Feature, Person}