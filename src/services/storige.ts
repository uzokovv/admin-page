const storige = {
    get: (key: string) => {
        if (typeof window !== "undefined") {
            return window.localStorage && window.localStorage.getItem(key)
        }
        return null
    },
    set: (key: string, value: string) => {
        if (!key || value.length <= 0) {
            return
        }
        if (window.localStorage) {
            window.localStorage.setItem(key, value)
        }
    },
    remove: (key: string) => {
        if (window.localStorage && window.localStorage[key]) {
            window.localStorage.removeItem(key)
        }
    }
}
export default storige