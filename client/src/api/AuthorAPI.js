import { $host } from "api"

export const createAuthor = async (authorData) => {
    const {data} = await $host.post('api/author', authorData)
    return data
}

export const fetchOneAuthor = async (id) => {
    const {data} = await $host.get('api/author', {
        params: {
            id
        }
    })
    return data
}

export const fetchAllAuthors = async (page = 1, limit = 10) => {
    const {data} = await $host.get(`api/author/?page=${page}&limit=${limit}`)
    return data
}

export const deleteAuthor = async (id) => {
    const {data} = await $host.delete('api/author', {
        data: {
            id: id
        }
    })
    return data
}

export const updateAuthor = async (params) => {
    const {data} = await $host.put('api/author', params)
    return data
}

export const fetchAllAuthorsWithoutPagination = async () => {
    const {data} = await $host.get('api/author/all')
    return data
}
