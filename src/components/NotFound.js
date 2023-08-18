

export const NotFound = ({error}) =>{

    return(
        <div className="error_wrapper">
            <h1>Not Found</h1>
            <h2>{error === "Failed to fetch"?"Invalid symbol":error}</h2>
            <a href="/cryptostash/">Go back</a>
        </div>
    )

}