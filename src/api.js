import { useEffect, useState } from "react"

export const primarySymbols = ["BTC","ETH","BNB","BUSD","XRP","DOGE","ADA","SOL","USDC","TRX","MATIC","DOT","LTC","SHIB","WBTC","BCH","AVAX","XLM","LINK","UNI","XMR","ATOM","HBAR","LDO","NEAR","INJ","TWT"]
export const currencies = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=026'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=026'
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=026'
    },
    {
      symbol: 'BUSD',
      name: 'Binance USD',
      logo: 'https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=026'
    },
    {
      symbol: 'XRP',
      name: 'XRP',
      logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=026'
    },
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=026'
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=026'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=026'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=026'
    },
    {
      symbol: 'TRX',
      name: 'Tron',
      logo: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=026'
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=026'
    },
    {
      symbol: 'DOT',
      name: 'Polkadot',
      logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=026'
    },
    {
      symbol: 'LTC',
      name: 'Litecoin',
      logo: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=026'
    },
    {
      symbol: 'SHIB',
      name: 'Shiba Inu',
      logo: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=026'
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      logo: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg?v=026'
    },
    {
      symbol: 'BCH',
      name: 'Bitcoin Cash',
      logo: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=026'
    },
    {
      symbol: 'AVAX',
      name: 'Avalanche',
      logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=026'
    },
    {
      symbol: 'XLM',
      name: 'Stellar',
      logo: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=026'
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=026'
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=026'
    },
    {
      symbol: 'XMR',
      name: 'Monero',
      logo: 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=026'
    },
    {
      symbol: 'ATOM',
      name: 'Cosmos',
      logo: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=026'
    },
    {
      symbol: 'HBAR',
      name: 'Hedera',
      logo: 'https://cryptologos.cc/logos/hedera-hbar-logo.svg?v=026'
    },
    {
      symbol: 'LDO',
      name: 'Lido DAO',
      logo: 'https://cryptologos.cc/logos/lido-dao-ldo-logo.svg?v=026'
    },
    {
      symbol: 'NEAR',
      name: 'Near Protocol',
      logo: 'https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=026'
    },
    {
      symbol: 'INJ',
      name: 'Injective',
      logo: 'https://cryptologos.cc/logos/injective-inj-logo.svg?v=026'
    },
    {
      symbol: 'TWT',
      name: 'Trust Wallet Token',
      logo: 'https://trustwallet.com/assets/images/media/assets/TWT.svg'
    }
  ]
  export const toUsd = primarySymbols.map((symbol)=>{
    return `"${symbol}USDT"`
  })

export const deleteTrailZeros = (number) =>{
  for(let i = number.length-1;i>=0;i--){
    if(number.charAt(i) !== '0'){
        return number = parseFloat(number.slice(0,i+1))
    }
  }
  return number
}




export const GetSymbolData = (symbol,interval) =>{
  const [klineData, setKlineData] = useState([])
  const [symbolData, setSymbolData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(()=>{
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`).then(
      res => res.json()
    ).then(data=>{
      setSymbolData(data)
      return fetch(`https://api.binance.com/api/v3/uiKlines?symbol=${symbol}&interval=${interval}&limit=42`);
    })
    .then(
      res=>res.json()
    )
    .then(data=>{
      setKlineData(data)
      setLoading(false)
    })
    .catch(error=>{
      setError(error)
    })
  },[symbol,interval])


  return {klineData,symbolData, loading, error}
}





