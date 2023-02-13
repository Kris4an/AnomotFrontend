import type { NextPage } from 'next';
import router from 'next/router';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';

const Home: NextPage = () => {
  useEffect(() => {
    router.push('/account');
  },[])
  
  return (
    <NavBar stage={3}>

    </NavBar>
  )
}

export default Home