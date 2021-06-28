import './index.css'

function Feature(props) {
    const id = props.id
    const title = props.title
    const content = props.content
    const thumbnail = props.thumbnail
    const random = Math.floor(Math.random(10) * 100).toString();
    
    return (
        <li key={`${random}${id}`} className="feature">
            <img src={thumbnail} alt=""/>
            <h2>{title}</h2>
            <p>{content}</p>
            <span>Learn More..</span>
        </li>
        )
}

export default Feature