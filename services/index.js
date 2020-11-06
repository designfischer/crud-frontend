import axios from 'axios'

export const apiFetch = axios.create({
    baseURL: 'https://crud-book-api.herokuapp.com'
})

//