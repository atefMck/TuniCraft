import React from 'react'
import { TimelineMax, Power2 } from "gsap";
import './index.css'

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

export default Person