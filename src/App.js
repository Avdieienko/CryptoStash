import './App.css';
import {useEffect, useState} from "react"
import { Info } from './components/Info';
import { Header } from './components/Header';
import {toUsd } from './api';
import { MainDataFetch } from './api';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';




function App() {

  const [loading,setLoading] = useState(true)
  const [data,setData] = useState([])
  const [error, setError] = useState(null)


  useEffect(()=>{
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${toUsd}]`).then(
      res => res.json()
    ).then(data=>{
      setData(data)
      setLoading(false)
    }
    )


  },[])


  if(loading) return <Loader/>

  console.log(toUsd)
  return (
    <div className="App">
      <Header/>
      <table className='home'>
        <colgroup>
          <col className="col_img"/>
          <col className='col_name'/>
          <col/>
          <col/>
          <col/>
          <col className='col_view'/>
        </colgroup>
        <thead>
          <tr className='home_header'>
            <th></th>
            <th>
              <h1 className='home_header_name'>Name</h1>
            </th>
            <th></th>
            <th>
              <h1 className='home_header_price'>Price</h1>
            </th>
            <th>
              <h1 className='home_header_change'>24hr%</h1>
            </th>
          </tr>
        </thead>
        <tbody>
        {data.map((i)=>{
          return <Info data={i}/>
        })}
        </tbody>
      </table>
      <Footer/>
    </div>
  );
}

export default App;
