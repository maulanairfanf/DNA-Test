import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'x-api-key': API_KEY,
	},
})

export default api
