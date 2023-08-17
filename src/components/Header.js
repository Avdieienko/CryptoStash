import { SearchBar } from "./SearchBar"
import { useState } from "react"
import { SearchResults } from "./SearchResults"
import { Link } from "react-router-dom"


export const Header =()=>{
    const [result, setResult] = useState([])
    const [input,setInput] = useState("")

    return(
        <header>
            <Link className="header_name" to = "/"><h1>CryptoStash</h1></Link>
            <a target="_blank" href="https://www.binance.com/en/binance-api" className="powered_by">Powered by <img src={"https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg"}/>API</a>
            <SearchBar input={input} setInput={setInput} setResult={setResult}/>
            <SearchResults setInput={setInput} setResult={setResult} results={result}/>
        </header>
    )
}