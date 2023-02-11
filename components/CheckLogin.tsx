import router from "next/router";
import { useEffect, useState } from "react";
import useUser from "./useUser";

type Props = {
    children: React.ReactNode
}
function CheckLogin({ children }: Props) {
    const [success, setSuccess] = useState(true);
    // const { user: userData, isError: userDataError } = useUser();
    // useEffect(() => {
    //     console.log(userData)
    //     if(userData === undefined){
    //         router.push('/login');
    //     }
    //     else{
    //         setSuccess(true);
    //     }
    // }, [userData])
    return (
        <>
            {success && children}
        </>
    )
}

export default CheckLogin;