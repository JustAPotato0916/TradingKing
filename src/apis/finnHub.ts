import axios from 'axios'

const token = import.meta.env.VITE_FINNHUB_API_KEY

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
  params: {
    token,
  },
})
