import { useState } from "react"
import {FaSearch} from "react-icons/fa"
import { currencies } from "../api"
import "../styles/searchbar.css"



export const SearchBar = ({setResult}) =>{
    const [input,setInput] = useState("")


    const handleChange = (value) =>{
        setInput(value)
        setResult(currencies.filter((symbol)=>{
            console.log(symbol.name,symbol.symbol)
            return value && symbol.name && symbol.symbol && (symbol.symbol.toLowerCase().includes(value.toLowerCase()) || symbol.name.toLowerCase().includes(value.toLowerCase()) || symbol.symbol.toUpperCase().includes(value.toUpperCase()) || symbol.name.toUpperCase().includes(value.toUpperCase))
        }))
    }

    return(
        <div className="input_wrapper">
        <input
            id="search_input"
            placeholder="search..."
            value={input}
            onChange={(e)=>handleChange(e.target.value)}
        />
        <FaSearch id="search_icon"/>
        </div>
    )
}