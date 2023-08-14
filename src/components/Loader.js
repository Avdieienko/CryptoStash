import PacmanLoader from "react-spinners/PacmanLoader"
import "../styles/loader.css"

export const Loader = () =>{
    return(
        <div className="loader">
            <PacmanLoader speedMultiplier={1.5} size="95" color="rgb(103, 103, 247)" />
        </div>
    )
}