import { deleteTrailZeros } from "../api";
import { Link } from "react-router-dom";

export const Graph = ({data, interval, symbol})=>{
    const lows = []
    const highs = []
    const lastOpen = data[data.length-1][1]
    const lastClose = data[data.length-1][4]
    let adder = 0
    const color = (lastOpen-lastClose)<0?"green":"red";
    const changePercent = deleteTrailZeros((lastClose/lastOpen*100-100).toFixed(2))

    // max and min price in a graph
    data.forEach(item => {
        lows.push(item[3])
        highs.push(item[2])
    });
    const min = Math.min(...lows)
    const max = Math.max(...highs)

    // average

    const avg = deleteTrailZeros((min+(max-min)/2).toFixed(7))


    // Trackers to display maximus only once
    let minTrack = 0
    let maxTrack = 0
    console.log(min,max)

    const graphPrices = []
    const gap = (max-min)/10
    const dif = max/gap
    for(let i = min;i<=max+gap;i=i+gap){
        if(i.toFixed(5)>max){
            break
        }
        graphPrices.push(deleteTrailZeros(i.toFixed(7)))
    }

    const normalise = (number, min, max) =>{
        if(dif>700){
            return ((number-min*0.9995)/(max*1.0005-min*0.9995))
        }
        else if(dif>500){
            return ((number-min*0.9991)/(max*1.0009-min*0.9991))
        }
        else if(dif>350){
            return ((number-min*0.998)/(max*1.002-min*0.998))
        }
        else if(dif>250){
            return ((number-min*0.997)/(max*1.003-min*0.997))
        }
        else if(dif>150){
            return ((number-min*0.995)/(max*1.005-min*0.995))
        }
        else if(dif>50){
            return ((number-min*0.99)/(max*1.01-min*0.99))
        }
        else if(dif>20){
            return ((number-min*0.95)/(max*1.05-min*0.95))
        }
        return ((number-min*0.9)/(max*1.1-min*0.9))
    }

    // check if graph will be lower than baseline

    const ultimateTop = normalise(min,min,max)*100
    if(ultimateTop<6){
        console.log(ultimateTop)
        adder = 6-ultimateTop
        console.log(adder)
    }

    const showData = (top,left, openPrice, highPrice, lowPrice, closePrice,date) =>{
        console.log("ooop")
        const dataDivElement = document.getElementById("data")
        dataDivElement.style.display = "block"
        dataDivElement.style.position = "absolute"
        dataDivElement.style.left = `${left+5}%`
        dataDivElement.style.bottom = `${top}%`
        dataDivElement.style.background = `rgba(103, 103, 247, 0.85)`
        const dataTextElements = document.getElementsByClassName("data_text")
        dataTextElements[0].innerHTML = "Open price: "+deleteTrailZeros(parseFloat(openPrice).toFixed(7))
        dataTextElements[1].innerHTML = "Close price: "+deleteTrailZeros(parseFloat(closePrice).toFixed(7))
        dataTextElements[2].innerHTML = "High price: "+deleteTrailZeros(parseFloat(highPrice).toFixed(7))
        dataTextElements[3].innerHTML = "Low price: "+deleteTrailZeros(parseFloat(lowPrice).toFixed(7))
        dataTextElements[4].innerHTML = "Date: "+date
    }
    const closeData = () =>{
        const dataDivElement = document.getElementById("data")
        dataDivElement.style.display = "none"
    }
    return(
        <>
        <div className="graph">
            {
                data.map((kline, index)=>{
                        const date = new Date(kline[0])
                        const Month = date.getMonth()+1
                        const Day = date.getDate()
                        const Hours = date.getHours()
                        if(kline[2] == max){
                            maxTrack++
                        }
                        if(kline[3] == min){
                            minTrack++
                        }
                        const openPrice = normalise(kline[1],min,max)
                        const highPrice = normalise(kline[2],min,max)
                        const lowPrice = normalise(kline[3],min,max)
                        const closePrice = normalise(kline[4],min,max)
                        let klineHeight = (closePrice - openPrice)*100
                        let ultimateHeight = (highPrice - lowPrice)*100
                        let color = "#0ecb81"
                        let top = openPrice*100+adder
                        let ultimateTop = lowPrice*100+adder
                        const left = 2.2*index+1
                        if(klineHeight<0){
                            klineHeight = klineHeight*-1
                            top = closePrice*100+adder
                            color = "#f6465d"
                        }
                        return(
                            <>
                                <div onMouseOver={()=>{showData(top,left,kline[1],kline[2],kline[3],kline[4],interval === "1h"?`${Hours}:00`:`${Day}/${Month}`)}} onMouseLeave={closeData} style={{backgroundColor:color,
                                width:"1.8%",
                                left:`${left}%`,
                                height:`${klineHeight}%`,
                                position:"absolute",
                                bottom:`${top}%`
                                }}>
                                </div>
                                <div style={{backgroundColor:color,
                                    width:"1px",
                                    position:"absolute",
                                    height:`${ultimateHeight}%`,
                                    left:`${left+0.9}%`,
                                    bottom:`${ultimateTop}%`,
                                    zIndex:"-1"
                                    }}>
                                </div>
                                {
                                    interval == "1d" && index%3 ===0?
                                    <>
                                        <div style={{position:"absolute",
                                        width:"1.8%",
                                        left:`${left}%`,
                                        color:"white",
                                        bottom:"0%",
                                        fontSize:"0.8vw"
                                        }}>
                                            <p>{Day}/{Month}</p>
                                        </div>
                                        <div style={{position:"absolute",
                                        width:".1%",
                                        height:"100%",
                                        left:`${left+0.9}%`,
                                        backgroundColor:"rgb(43, 43, 43)",
                                        bottom:"0",
                                        zIndex:"-2"
                                        }}></div>
                                    </>
                                    :interval == "1w" && index%3 ===0?
                                    <>
                                        <div style={{position:"absolute",
                                        width:"1.8%",
                                        left:`${left}%`,
                                        color:"white",
                                        bottom:"0%",
                                        fontSize:"0.8vw"
                                        }}>
                                            <p>{Day}/{Month}</p>
                                        </div>
                                        <div style={{position:"absolute",
                                        width:".1%",
                                        height:"100%",
                                        left:`${left+0.9}%`,
                                        backgroundColor:"rgb(43, 43, 43)",
                                        bottom:"0",
                                        zIndex:"-2"
                                        }}></div>
                                    </>
                                    :interval == "1h" && index%3 ===0?
                                    <>
                                        <div style={{position:"absolute",
                                        width:"1.8%",
                                        left:`${left}%`,
                                        color:"white",
                                        bottom:"0%",
                                        fontSize:"0.8vw"
                                        }}>
                                            <p>{Hours}:00</p>
                                        </div>
                                        <div style={{position:"absolute",
                                        width:".1%",
                                        height:"100%",
                                        left:`${left+0.9}%`,
                                        backgroundColor:"rgb(43, 43, 43)",
                                        bottom:"0",
                                        zIndex:"-2"
                                        }}></div>
                                    </>
                                    :""
                                }
                                {
                                    kline[2] == max && maxTrack === 1?
                                    <div style={{
                                        position:"absolute",
                                        color:"grey",
                                        width:"5%",
                                        left:`${left>4.1?left-4.1:left}%`,
                                        bottom:`${ultimateHeight+ultimateTop}%`
                                    }}>
                                        <p className="high_price">{max}</p>
                                    </div>
                                    :""
                                }
                                {
                                    kline[3] == min && minTrack === 1?
                                    <div style={{
                                        position:"absolute",
                                        color:"grey",
                                        width:"5%",
                                        left:`${left>4.1?left-4.1:left}%`,
                                        bottom:`${ultimateTop}%`
                                    }}>
                                        <p className="high_price">{min}</p>
                                    </div>
                                    :""
                                }

                            </>
                        )
                })
            }
            {graphPrices.map((price, index)=>{
                return(
                    <>
                        <div key={index} style={{
                            bottom:`${normalise(price,min,max)*100+adder}%`,
                            position:"absolute",
                            left:"94%"
                        }}>
                            <p className="price_text">{price}</p>
                        </div>
                        <div style={{
                            bottom:`${normalise(price,min,max)*100+adder}%`,
                            position:"absolute",
                            width:"100%",
                            height:".1%",
                            backgroundColor:"rgb(43, 43, 43)",
                            zIndex:"-2"
                        }}>
                        </div>
                    </>
                )

            })}
            <div id="data">
                <p className="data_text"></p>
                <p className="data_text"></p>
                <p className="data_text"></p>
                <p className="data_text"></p>
                <p className="data_text"></p>
            </div>
        </div>
        <div className="interval_header">
               <div className="interval_buttons">
                    <Link style={interval==="1w"?{backgroundColor:"rgb(103, 103, 247)", color:"white"}:{}} className="interval_button" to={`/${symbol}?interval=1w`}><p>1w</p></Link>
                    <Link style={interval==="1d"?{backgroundColor:"rgb(103, 103, 247)", color:"white"}:{}} className="interval_button" to={`/${symbol}?interval=1d`}><p>1d</p></Link>
                    <Link style={interval==="1h"?{backgroundColor:"rgb(103, 103, 247)", color:"white"}:{}} className="interval_button" to={`/${symbol}?interval=1h`}><p>1h</p></Link>
               </div>
                <div className="interval_data">
                    <p >Interval change: </p>
                    <p style={{color:color}} className="internal_number">{changePercent} %</p>
                </div>
                <div className="interval_data">
                    <p >Graph low: </p>
                    <p style={{color:color}} className="internal_number">{min} $</p>
                </div>
                <div className="interval_data">
                    <p>Graph high: </p>
                    <p style={{color:color}} className="internal_number">{max} $</p>
                </div>
                <div className="interval_data">
                    <p >Graph average: </p>
                    <p className="internal_number">{avg} $</p>
                </div>
        </div>
        </>
    )
}