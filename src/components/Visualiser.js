import { useParams, useSearchParams } from "react-router-dom";
import { Graph } from "./Graph";
import {currencies,deleteTrailZeros } from "../api";
import {RiArrowUpSFill,RiArrowDownSFill} from "react-icons/ri"
import { Header } from "./Header";
import { Link } from "react-router-dom";
import "../styles/tradingview.css"
import { useEffect, useState } from "react";
import { GetSymbolData } from "../api";
import { Loader } from "./Loader";
import {Footer} from "./Footer"


export const Visualiser = () =>{
    const routeParams = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const interval = searchParams.get("interval")
    const {klineData,symbolData, loading, error} = GetSymbolData(routeParams.symbol,interval)

    if(loading) return <Loader/>




    let lastPrice,priceChange, priceChangePercent, highPrice, lowPrice,openPrice,closePrice, volume, quoteVolume, logo, name, symbol;

    lastPrice = deleteTrailZeros(symbolData.lastPrice)
    priceChange = deleteTrailZeros(symbolData.priceChange)
    priceChangePercent = symbolData.priceChangePercent
    highPrice = deleteTrailZeros(symbolData.highPrice)
    lowPrice = deleteTrailZeros(symbolData.lowPrice)
    openPrice = deleteTrailZeros(symbolData.openPrice)
    closePrice = deleteTrailZeros(symbolData.prevClosePrice)
    volume = deleteTrailZeros(symbolData.volume).toFixed(2)
    quoteVolume = deleteTrailZeros(symbolData.quoteVolume).toFixed(2)
    const color = priceChangePercent>0?"green":"red"

    if(Math.abs(priceChange)<0.000001){
        priceChange = priceChange.toFixed(8)
    }


    currencies.forEach((element)=>{
        if(element.symbol == routeParams.symbol.slice(0,-4)){
            logo = element["logo"]
            name = element["name"]
            symbol = element["symbol"]
        }
    })


    return(
        <>
        <Header/>
        <div className="trading_view_grid">
            <div className="sidebar">
                <div className="sidebar_header">
                    <img className="sidebar_logo" src={logo} alt={name}/>
                    <h1 className="sidebar_name">{name}</h1>
                    <h1 className="sidebar_symbol">{symbol}</h1>
                </div>
                <div style={{color:priceChangePercent>0?"green":"red"}} className="sidebar_price">
                    <h1>{lastPrice} $</h1>
                    <p className="symbol_price_change_percent">{priceChangePercent>0?<RiArrowUpSFill/>:<RiArrowDownSFill/>}{priceChangePercent} %</p>
                </div>
                <div className="sidebar_data">
                    <div className="sidebar_data_row">
                        <p>24h Change: </p>
                        <p style={{color:color}} className="symbol_price_change">
                            {priceChange} $
                        </p>
                    </div>
                    <div className="sidebar_data_row">
                        <p>24h High: </p>
                        <p className="data_price">{highPrice} $</p>
                    </div>
                    <div className="sidebar_data_row">
                        <p>24h Low: </p>
                        <p>{lowPrice} $</p>
                    </div>
                    <div className="sidebar_data_row">
                        <p>Open price: </p>
                        <p>{openPrice} $</p>
                    </div>
                    <div className="sidebar_data_row">
                        <p>Close price: </p>
                        <p>{closePrice} $</p>
                    </div>
                    <div className="sidebar_data_row">
                        <p>24h Volume({symbol}): </p>
                        <p>{volume}</p>
                    </div>
                    <div className="sidebar_data_row">
                        <p>24h Volume(USD): </p>
                        <p>{quoteVolume} $</p>
                    </div>
                </div>
            </div>
            <Graph data={klineData} interval={interval} symbol={routeParams.symbol}/>
            <div className="right_sidebar">
                {currencies.map((symbol, id)=>{
                    return(
                        <Link className="right_sidebar_row" to={`/${symbol.symbol}USDT?interval=${interval}`} key={id}>
                            <img alt={symbol.symbol} src={symbol.logo} />
                            <p>{symbol.name}</p>
                            <p>{symbol.symbol}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
        <Footer/>
        </>
    )
}