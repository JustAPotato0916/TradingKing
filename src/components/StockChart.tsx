import { useState } from 'react'
import Chart from 'react-apexcharts'

interface ChartData {
  day: Array<{
    x: number
    y: number
  }>
  week: Array<{
    x: number
    y: number
  }>
  year: Array<{
    x: number
    y: number
  }>
}

interface Props {
  chartData: ChartData
  symbol: string
}

function StockChart({ chartData, symbol }: Props) {
  const [dateFormat, setDateFormat] = useState('day')
  const { day, week, year } = chartData
  const determineTimeFormat = () => {
    switch (dateFormat) {
      case 'day':
        return day
      case 'week':
        return week
      case 'year':
        return year
      default:
        return day
    }
  }

  const color = determineTimeFormat()[0].y > determineTimeFormat()[determineTimeFormat().length - 1].y ? '#f44336' : '#4caf50'

  const options = {
    colors: [color],
    title: {
      text: symbol!,
      align: 'center' as 'left' | 'center' | 'right',
      style: {
        fontSize: '24px',
      },
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: 'datetime' as 'category' | 'datetime' | 'numeric',
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:mm',
      },
    },
  }

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ]

  const renderButtonSelected = (button: string) => {
    const classes = 'btn m-1'
    if (button === dateFormat)
      return `${classes} btn-primary`
    else return `${classes} btn-outline-primary`
  }

  return (
    <div className='mt-5 p-4 shadow-sm bg-white'>
      <Chart options={options} series={series} type='area' height={350} width="100%" />
      <div>
        <button className={renderButtonSelected('day')} onClick={() => setDateFormat('day')} >24h</button>
        <button className={renderButtonSelected('week')} onClick={() => setDateFormat('week')}>7d</button>
        <button className={renderButtonSelected('year')} onClick={() => setDateFormat('year')}>1y</button>
      </div>
    </div>
  )
}

export default StockChart
