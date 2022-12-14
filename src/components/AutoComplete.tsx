import { useContext, useEffect, useState } from 'react'
import finnHub from '../apis/finnHub'
import { WatchListContext } from '../context/watchListContext'

function AutoComplete() {
  const [search, setSearch] = useState<string>('')
  const [results, setResults] = useState<any[]>([])
  const { addStock } = useContext(WatchListContext)

  const renderDropdown = () => {
    const dropDownClass = search ? 'show' : null

    return (
      <ul style={{
        height: '500px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        cursor: 'pointer',
      }} className={`dropdown-menu ${dropDownClass}`}>
        {results.map(result => (
          <li onClick={() => {
            addStock(result.symbol)
            setSearch('')
          }} key={result.symbol} className="dropdown-item">{result.description}({result.symbol})</li>
        ))}
      </ul>
    )
  }

  useEffect(() => {
    const isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: search,
          },
        })

        if (isMounted)
          setResults(response.data.result)
      }
      catch (error) {
        console.error(error)
      }
    }

    if (search.length > 0)
      fetchData()

    else
      setResults([])
  }, [search])

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: 'rgb(145, 158, 171, 0.04)' }}
          type="text"
          className="form-control"
          id="search"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  )
}

export default AutoComplete
