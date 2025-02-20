import axios from "axios";
import storige from "./storige";
import { config } from "../config/config";

const Request = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: config.Api_url,
    params: {}
})
Request.interceptors.request.use(
    (config) => {
        const token = storige.get("token")
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

Request.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const statusCode = error.response
        if (statusCode === 401) {
            window.localStorage.clear()
        }
        return Promise
    }
)
export {Request}