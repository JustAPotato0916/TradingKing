import { useEffect, useState } from 'react'
import finnHub from '../apis/finnHub'

interface Props {
  symbol: string
}

function StockData({ symbol }: Props) {
  const [stockData, setStockData] = useState<any>()
  const isMounted = true
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/stock/profile2', {
          params: {
            symbol,
          },
        })

        if (isMounted)
          setStockData(response.data)
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [symbol])
  return (
    <div>
      {stockData && (
        <div className='row border bg-white rounded shadow-sm p-4 mt-5'>
          <div className="col">
            <div>
              <span className='fw-bold'>name: </span>
              {stockData.name}
            </div>
            <div>
              <span className='fw-bold'>country: </span>
              {stockData.country}
            </div>
            <div>
              <span className='fw-bold'>ticker: </span>
              {stockData.ticker}
            </div>
          </div>
          <div className="col">
            <div>
              <span className='fw-bold'>Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className='fw-bold'>Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className='fw-bold'>IPO:</span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className='fw-bold'>MarketCap:</span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span className='fw-bold'>Share Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className='fw-bold'>url: </span>
              <a href={stockData.weburl} target='_blank' rel='noreferrer'>{stockData.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StockData
