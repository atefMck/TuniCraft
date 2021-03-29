import React from 'react';

class ButtonList extends React.Component {
    getButtons() {
        let buttons = [];
        let i = 0;
        let button;
        for (let panel in this.props.panels) {
            if (panel === "Stats") {
                button = <li key={i}><button className="Button BoxShadow" onClick={() => this.props.onClick(panel)} autoFocus>{panel}</button></li>;
            } else {
                button = <li key={i}><button className="Button BoxShadow" onClick={() => this.props.onClick(panel)}>{panel}</button></li>;
            }
            i++;
            buttons.push(button);
        }
        button = <li key={i + 1}><button className="Button BoxShadow">Logout</button></li>;
        buttons.push(button);
        return buttons;
    }
    render () {
        return (
            <div className="ButtonList">
                <ul>
                    {this.getButtons()}
                </ul>
            </div>
        );
    }
}

export default ButtonList;
