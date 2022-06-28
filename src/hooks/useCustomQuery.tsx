import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import { Cookies, useCookies } from 'react-cookie'
import { useQuery, UseQueryOptions } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { BehaviorSubject } from 'rxjs'
import useModal from './useModal'

export type Todo = {
 userId: number
 id: number
 title: string
 body: string
}

const client = axios.create({
 timeout: 1000 * 10,
})

export const cookies = new Cookies()

export function getCall<T = unknown>(url: string, config?: AxiosRequestConfig) {
 return client.get<T>(url, config)
}

export function useCustomQuery<T extends Todo, S = unknown>(
 key: string,
 params: S,
 url: string,
 options?: UseQueryOptions<T | { id: string }, Error>,
) {
 const { handleOpenModal } = useModal()
 const [dataCookie, setDataCookie] = useCookies()
 const navigate = useNavigate()
 return useQuery<T | { id: string }, Error>(
  [key, params],
  async () => {
   try {
    const response = await getCall<T>(`${url}/${params}`, {
     validateStatus(status) {
      return status === 200
     },
    })
    console.log(response.status)
    return response.data
   } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
     console.log(error)
     //  return {
     //   id: 'sfjdlkasjdlk',
     //  }
    }
    console.log(error)
    throw new Error('afasdfsd')
   }
  },
  options,
  //   {
  //    //    suspense: true,
  //    enabled: !!params,
  //    refetchOnWindowFocus: false,
  //    refetchOnMount: false,
  //    retry: 0,
  //    //    useErrorBoundary: true,
  //    //    onSuccess(data) {
  //    //     console.log('onSuccess', data)
  //    //     setDataCookie('test', data.id)
  //    //     // cookies.set('test', data.id)
  //    //     // navigate('/test')

  //    //     return 'awefwef'
  //    //    },
  //    //    onError(err) {
  //    //     console.log('fasdfsdfsdfsfdsdf', err)
  //    //     // navigate('/')
  //    //    },
  //    //    onSettled(data, error) {
  //    //     console.log('onSettled', data)
  //    //     handleOpenModal(<div>z{data?.id}</div>)
  //    //    },
  //   },
 )
}
