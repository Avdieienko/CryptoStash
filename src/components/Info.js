import {RiArrowUpSFill,RiArrowDownSFill} from "react-icons/ri"
import { Link } from "react-router-dom"
import "../styles/home.css"
import { currencies } from "../api"
import { deleteTrailZeros } from "../api"



export const Info = (props) =>{
    let lastPrice = deleteTrailZeros(props.data.lastPrice)
    const priceChange = props.data.priceChangePercent
    const name = props.data.symbol.slice(0,-4)
    let fullName = ""
    let logo=""
    currencies.forEach(element => {
        if(element.symbol === name){
            fullName = element.name
            logo = element["logo"]
        }
    });
    return(
        <tr className="symbol_row">
            <td>
                <img className="symbol_logo" alt={name} src={logo} />
            </td>
            <td>
                <h1 className="symbol_name">{fullName}</h1>
            </td>
            <td>
                <h1 className="symbol_name short">{name}</h1>
            </td>
            <td>
                <p className="symbol_price">{lastPrice} $</p>
            </td>
            <td>
                <p style={{color:priceChange>0?"green":"red"}} className="symbol_price_change">{priceChange>0?<RiArrowUpSFill/>:<RiArrowDownSFill/>}{priceChange} %</p>
            </td>
            <td>
                <Link className="trade_view_button" to={`/cryptostash/${props.data.symbol}?interval=1d`}>Trading view</Link>
            </td>
        </tr>
    )
}