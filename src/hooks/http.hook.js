import React from 'react'

const useHttp = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const request = React.useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
    setLoading(true)

    try {
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
    } catch (e) {

    }
  }, [])
}

export default useHttp;
