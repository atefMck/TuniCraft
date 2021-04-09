
function Post(props) {
    const title = props.title
    const date = props.date
    const author = props.author
    const content = props.content
    const image = props.image
    const postclass = props.type ? "post reversed" : "post"
    
    return (
        <li className={postclass}>
            <article>
                <img src={image} alt="" />
                <div>
                    <h2>{title}</h2>
                    <span>{date} by <span>{author}</span></span>
                    <p>{content}</p>
                    <button>Read More..</button>
                </div>
            </article>
        </li>
    )
}

export default Post