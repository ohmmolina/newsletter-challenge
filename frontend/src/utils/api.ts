export const API_URL = import.meta.env.VITE_API_URL as string

const controller = new AbortController()
const signal = controller.signal

interface ErrorResponse {
  status: number
  data: {
    error: string
  }
}

interface FetchOptions {
  headers?: HeadersInit
  method?: string
  body?: any
}

interface ResponseData {
  status: number
  data?: any
}

export interface FetchedData {
  data?: any
  error?: string
}

const errorInterceptor = async (
  error: Response | any
): Promise<ErrorResponse> => {
  if (signal.aborted) return { status: 500, data: { error: 'Fetch aborted' } }
  if (error instanceof Error) {
    // Catch net errors
    if (error.message === 'Failed to fetch') {
      return { status: 500, data: { error: 'Server unavailable' } }
    }
    return { status: 500, data: { error: error.message } }
  }
  // Catch response errors
  if (!error.status) {
    return { status: 500, data: { error: 'Error fetching data' } }
  }
  // if (error.status === 401) {
  //   controller.abort('Aborted')
  //   localStorage.removeItem('usuario')
  //   localStorage.removeItem('token')
  //   localStorage.setItem('401', 'true')
  //   window.location.href = '/#/iniciar-sesion'
  //   return { status: 401, data: { error: 'Unauthorized' } }
  // }
  if (error.status !== 500) {
    const data = await error.json()
    return { status: error.status, data: { error: data.error } }
  }
  return { status: 500, data: { error: error.error } }
}

const responseInterceptor = async (
  response: Response
): Promise<ResponseData> => {
  const { status } = response
  const res: ResponseData = { status }
  const contentType = response.headers.get('Content-Type') || ''
  if (contentType.includes('application/json')) {
    res.data = await response.json()
  } else if (contentType.includes('text/plain')) {
    res.data = await response.text()
  } else if (contentType.includes('image') || contentType.includes('pdf')) {
    res.data = await response.blob()
  }
  return res
}

const baseFetch = async (
  path: string,
  options: FetchOptions
): Promise<ResponseData | ErrorResponse> => {
  try {
    const parsedBody = options.body ? JSON.stringify(options.body) : undefined
    const response = await fetch(`${API_URL}${path}`, {
      signal,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
        // Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: parsedBody
    })
    if (!response.ok) {
      return errorInterceptor(response)
    }
    return responseInterceptor(response)
  } catch (error) {
    return errorInterceptor(error)
  }
}

const api = {
  _getURL: (path: string): string => {
    return `${API_URL}${path}`
  },
  get: async (
    path: string,
    options?: FetchOptions
  ): Promise<ResponseData | ErrorResponse> => {
    return baseFetch(path, { headers: { ...options?.headers } })
  },
  post: async (
    path: string,
    data: any,
    options?: FetchOptions
  ): Promise<ResponseData | ErrorResponse> => {
    return baseFetch(path, {
      method: 'POST',
      headers: { ...options?.headers },
      body: data
    })
  },
  put: async (
    path: string,
    data: any,
    options?: FetchOptions
  ): Promise<ResponseData | ErrorResponse> => {
    return baseFetch(path, {
      method: 'PUT',
      headers: { ...options?.headers },
      body: data
    })
  },
  delete: async (
    path: string,
    options?: FetchOptions
  ): Promise<ResponseData | ErrorResponse> => {
    return baseFetch(path, {
      method: 'DELETE',
      headers: { ...options?.headers }
    })
  }
}

export default api
