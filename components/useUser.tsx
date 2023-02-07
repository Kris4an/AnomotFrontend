import useSWR from "swr";
import instance from "../axios_instance";

const fetcher = (url: any) => instance.get(url).then((res) => res.data).catch((res) => res.error);

function useUser () {
    const { data, error } = useSWR('/account/user', fetcher)
  
    return {
      user: data,
      isError: error
    }
}

export default useUser;