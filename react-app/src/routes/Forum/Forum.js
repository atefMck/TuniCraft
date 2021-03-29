import React from 'react';
import axios from 'axios';


class Forum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {message: ""}
    }
    sendRequest() {
        console.log("lol")
        axios.get('http://localhost:8080/test')
            .then(res => {
                this.setState({message: res.data.message})
            }).catch((err) => {
                this.setState({message: "error"})
            })
    }

    render() {
        return (
            <div className="Forum" style={{color: "red"}}>
                <p>{this.state.message}</p>
                <button onClick={() => this.sendRequest()}>Send request</button>
            </div>
        );
    }
}

export default Forum;
