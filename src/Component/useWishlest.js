import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

let baseURRL = 'https://ecommerce.routemisr.com/api/v1'
let token = localStorage.getItem('userToken')
//add to cart
export function addToWhish(productId) {
    return axios.post(`${baseURRL}/wishlist`, { productId }, {
        headers: {
            token,
        }
    })
}

export function useWhishCrud(fn) {
    const queryClient = useQueryClient()
    return useMutation(fn, {
        onSuccess: async(data) => {
            toast.success(data?.data?.message);
            queryClient.invalidateQueries('getWhish')
        },
        onError: (data) => {
            toast.error(data?.message)
        }
    })
}

//gat cart
export function getWhish() {
    return axios.get(`${baseURRL}/wishlist`, {
        headers: {
            token
        }
    })
}


//delete cart
export function deleteWhish(id) {
    return axios.delete(`${baseURRL}/wishlist/${id}`, {
        headers: {
            token
        }
    })
}

//update
export function updateWhish({id, count}) {
    return axios.put(`${baseURRL}/wishlist/${id}`,{ count}, {
        headers: {
            "Content-Type":'application/json',
            token
        }
    })
}
//update
export function checkOut({id , shippingAddress}) {
    return axios.post(`${baseURRL}/orders/checkout-session/${id}?url=http://localhost:3000`, {shippingAddress},
     {
        headers: {
            "Content-Type":'application/json',
            token
        }
    })
}





export function useWhish(key, fn) {
    return useQuery(key, fn)
}

