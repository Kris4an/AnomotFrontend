import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button';
import 'typeface-roboto'

const Home: NextPage = () => {
  return (
    <div>
      <Button>Вход</Button>
      <Button disabled = {true}>Вход</Button>
    </div>
  )
}

export default Home