import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

function HomePage() {
  const [auth ,setAuth] = useAuth()
  return (
    <Layout>
        <h4> HomePage</h4>
        <pre>{JSON.stringify(auth , null ,4)} </pre>
        </Layout>
  )
}

export default HomePage