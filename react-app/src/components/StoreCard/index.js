import CardPH from 'assets/store_card_ph.png'
import './index.css'

function StoreCard(props) {
    const id = props.storeCardId
    const name = props.name
    const code = props.code
    const price = props.price
    const details = props.details
    const images = CardPH
    
    return (
        <li key={id} className="store_card">
            <div>
                <img src={images} alt="" />
                <h3>View details</h3>
            </div>
            <main>
                <span>{code}</span>
                <h2>{name}</h2>
                <h3>{price} DT</h3>
                <p>{details}</p>
            </main>
        </li>
    )
}

export default StoreCard