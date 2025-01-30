const fetchApi = async (endpoint: string, options?: object) => {
  const response = await fetch(`/api/${endpoint}`, options)
  const data = await response.json()
  return {
    data,
    error: !response.ok,
  }
}

export default {
  GET: async (endpoint: string, options?: object) => {
    const response = await fetchApi(endpoint, {
      ...options,
      method: 'GET',
    })
    return response
  },
  POST: async (endpoint: string, body: any, options?: object) => {
    const response = await fetchApi(endpoint, {
      ...options,
      headers: {
        ...body.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      method: 'POST',
    })
    return response
  },
  PUT: async (endpoint: string, body: any, options?: object) => {
    const response = await fetchApi(endpoint, {
      ...options,
      headers: {
        ...body.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      method: 'PUT',
    })
    return response
  },
  DELETE: async (endpoint: string, options?: object) => {
    const response = await fetchApi(endpoint, {
      ...options,
      method: 'DELETE',
    })
    return response
  }
}
