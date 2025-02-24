// import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import { Request } from "../services/request";
import { toast } from "react-toastify";

const postRequest = (url: any, data: any) => {
    return Request.post(url, data)
}

const usePostQuery = ({ hideToast = false } = {}) => {
    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ url, data }: { url: string; data: any }) => postRequest(url, data),
        onSuccess: (item: any) => {
            if (!hideToast) {
                toast.success(item?.data?.message)
            }
        },
        onError: (error: any) => {
            console.log(error)
            toast.error(error)
        }
    })

    return {
        postRequest,
        mutate,
        isPending,
        error
    }
}

export default usePostQuery
