import "../styles/searchresults.css"
import { Link } from "react-router-dom";

export const SearchResults = ({results, setResult, setInput}) => {
    const handleChange = ()=>{
        setResult([])
        setInput("")
    }

    return (
        <div className="results_list">
            {results.map((result,id)=>{
                return(
                    <Link onClick={handleChange} className="result_div" to={`/${result.symbol}USDT?interval=1d`} key={id}>
                        <img alt={result.symbol} src={result.logo} />
                        <p>{result.name}</p>
                        <p>{result.symbol}</p>
                    </Link>
                )
            })}
        </div>
    );
}