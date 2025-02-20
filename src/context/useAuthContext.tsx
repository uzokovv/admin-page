import { createContext, useState } from "react"
import { Request } from "../services/request"
import { config } from "../config/config"
import { AxiosError, AxiosResponse } from "axios"
// import storige from "../services/storige"
import { toast } from "react-toastify"
import storige from "../services/storige"

const defaultProvider = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(defaultProvider.user)
    const [loading, setloading] = useState(defaultProvider.loading)

    const handLogin = (params: any, errorColback: any) => {
        setloading(false)

        Request
            .post(`${config.Api_url}/auth/signin`, params)
            .then((res: AxiosResponse) => {
                storige.set('userToken', res.data?.data.tokens.accessToken.token)
                setUser({ ...res.data?.data.user })
                storige.set('userData', res.data?.data.user)
                toast.success('Siz muvofiqiyatli kirdingiz')
                console.log(res);
            })
            .catch((err: AxiosError) => {
                console.log(err);
                toast.error(err.message)
                if (errorColback) errorColback(err)
            })
            .finally(() => {
                setloading(true)
            })
    }
    const values = {
        user,
        loading,
        setUser,
        setloading,
        login: handLogin,
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {AuthProvider, AuthContext}