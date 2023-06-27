import { $host } from "api"

export const createBook = async (bookData) => {
    const {data} = await $host.post('api/book', bookData)
    return data
}

export const fetchOneBook = async (id) => {
    const {data} = await $host.get('api/book', {
        params: {
            id
        }
    })
    return data
}

export const fetchAllBooks = async (page = 1, limit = 10) => {
    const {data} = await $host.get(`api/book/?page=${page}&limit=${limit}`)
    return data
}

export const deleteBok = async (id) => {
    const {data} = await $host.delete('api/book', {
        data: {
            id: id
        }
    })
    return data
}

export const updateBook = async (params) => {
    const {data} = await $host.put('api/book', params)
    return data
}

export const fetchAllBooksWithoutPagination = async () => {
    const {data} = await $host.get('api/book/all')
    return data
}