import http from '../../utils/http-common'
import config from '../../setupconfig.json';

export const getProducts = async () => {
    const res = await http.get(config.api_url+config.endpoints.products)
    return res
}

export const addProducts = async () => {
    const res = await http.post(config.api_url+config.endpoints.add_products,{
        title:'bmw'
    })
    return res
}