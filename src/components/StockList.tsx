import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { WatchListContext } from '../context/watchListContext'
import finnHub from '../apis/finnHub'

function StockList() {
  const [stock, setStock] = useState<Array<any>>([])
  const { watchList, deleteStock } = useContext(WatchListContext)
  const navigate = useNavigate()

  const changeColor = (change: number) => {
    if (change > 0)
      return 'success'
    else if (change < 0)
      return 'danger'
    else return 'secondary'
  }

  const renderIcon = (change: number) => {
    if (change > 0)
      return <BsFillCaretUpFill />
    else if (change < 0)
      return <BsFillCaretDownFill />
    else return null
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((symbol) => {
            return finnHub.get('/quote', {
              params: {
                symbol,
              },
            })
          }),
        )

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          }
        })

        if (isMounted)
          setStock(data)
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [watchList])

  const handleStockSelect = (symbol: string) => {
    navigate(`detail/${symbol}`)
  }

  return (
    <div>
      <table className='table hover mt-5'>
        <thead style={{ color: 'rgb(79,89,102)' }}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Change</th>
            <th scope='col'>Change %</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stock) => {
            return (
              <tr style={{ cursor: 'pointer' }} onClick={() => handleStockSelect(stock.symbol)} className='table-row' key={stock.symbol}>
                <th scope='row'>{stock.symbol}</th>
                <td>{stock.data.c}</td>
                <td className={`text-${changeColor(stock.data.d)}`}>{stock.data.d} {renderIcon(stock.data.d)}</td>
                <td className={`text-${changeColor(stock.data.dp)}`}>{stock.data.dp} {renderIcon(stock.data.dp)}</td>
                <td>{stock.data.h}</td>
                <td>{stock.data.l}</td>
                <td>{stock.data.o}</td>
                <td>{stock.data.pc}</td>
                <td>
                  <button className='btn btn-danger btn-sm delete-button' onClick={(e) => {
                    e.stopPropagation()
                    deleteStock(stock.symbol)
                  }}>Remove</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StockList
