import { createContext, useEffect, useState } from 'react'

interface IWatchList {
  watchList: string[]
  setWatchList: React.Dispatch<React.SetStateAction<string[]>>
  addStock: (stock: string) => void
  deleteStock: (stock: string) => void
}

export const WatchListContext = createContext<IWatchList>({
  watchList: [],
  setWatchList: () => { },
  addStock: () => { },
  deleteStock: () => { },
})

export const WatchListContextProvider = ({ children }: any) => {
  const [watchList, setWatchList] = useState<string[]>(localStorage.getItem('watchList') ? JSON.parse(localStorage.getItem('watchList') || '') : [])

  useEffect(() => {
    localStorage.setItem('watchList', JSON.stringify(watchList))
  }, [watchList])

  const addStock = (stock: string) => {
    if (!watchList.includes(stock))
      setWatchList([...watchList, stock])
  }

  const deleteStock = (stock: string) => {
    setWatchList(watchList.filter(item => item !== stock))
  }

  return (
    <WatchListContext.Provider value={{ watchList, setWatchList, addStock, deleteStock }}>
      {children}
    </WatchListContext.Provider>
  )
}
