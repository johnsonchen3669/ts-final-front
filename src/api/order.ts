import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import type { ApplyCouponParams, ApplyCouponResponse } from './types'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const orderApi = axios.create({
  baseURL: BASE_URL,
})

orderApi.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

orderApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

const applyCoupon = async (couponCode: ApplyCouponParams): Promise<ApplyCouponResponse> => {
  const res = await orderApi.post(`/v2/api/${API_PATH}/coupon`, { data: { code: couponCode } })

  return res.data
}

export const apiApplyCoupon = () => {
  const queryClient = useQueryClient()

  return useMutation<ApplyCouponResponse, Error, ApplyCouponParams>({
    mutationFn: (params) => applyCoupon(params),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      alert(res.message)
    },
    onError: (err) => {
      alert(err.message)
    },
  })
}
