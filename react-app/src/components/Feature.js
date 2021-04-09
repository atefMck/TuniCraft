import './index.css'

function Feature(props) {
    const title = props.title
    const content = props.content
    const thumbnail = props.thumbnail
    
    return (
        <li className="feature">
            <img src={thumbnail} alt=""/>
            <h2>{title}</h2>
            <p>{content}</p>
            <span>Learn More..</span>
        </li>
        )
}

export default Feature