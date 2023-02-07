import router from "next/router";
import { useEffect, useState } from "react";
import instance from "../axios_instance";

type Props = {
    children: React.ReactNode
}
function CheckLogin({children}:Props){
    const fetcher = () => instance.get('/account/user').then((res) => res.data).catch((res) => res.error);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        fetcher().then(() => {setSuccess(true)}).catch(() => (router.push('/login')));
    },[])
    return(
        <>
            {success && children}
        </>
    )
}

export default CheckLogin;