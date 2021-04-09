import React from 'react';
import './index.css';
import { StoreCard } from 'components'

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <ul>
                    <StoreCard name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>
                    <StoreCard name="Cute Companion" code="COMP-2130" price="7" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar iaculis erat viverra iaculis."></StoreCard>                
                </ul>
            </div>
        );
    }
}

export default Home;