import useSWR from "swr";
import instance from "../axios_instance";

const fetcher = (url: any) => instance.get(url).then((res) => res.data).catch((res) => res.error);

function useUser () {
    const { data, error, isValidating } = useSWR('/account/user', fetcher)
  
    return {
      user: data,
      isError: error,
      isValidating: isValidating
    }
}

export default useUser;