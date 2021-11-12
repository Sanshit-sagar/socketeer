import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title> WebSocket Demo </title>
        <meta name="description" content="A demo app for websockets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the 
          <Link href="/demo"> 
            Websockets Demo 
        </Link>
        </h1>
      </main>
    </div>
  )
}

export default Home
