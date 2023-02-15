import type { NextPage } from 'next';
import router from 'next/router';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import useUser from '../components/useUser';

const Home: NextPage = () => {
  const { user: userData, isError: userDataError, isValidating: isValidating } = useUser();
  useEffect(() => {
    if(userData != undefined && !isValidating){
      if(userData.id != undefined) router.push('/account');
    } 
  },[isValidating])
  
  return (
    <NavBar stage={3}>

    </NavBar>
  )
}

export default Home