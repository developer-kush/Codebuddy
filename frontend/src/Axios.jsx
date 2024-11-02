
import axios from 'axios'

console.log("VITE_SERVER_URI", import.meta.env.VITE_SERVER_URI)

const Axios = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URI || "http://localhost:5000",
    headers: {
      Accept: "application/json",
    },
});

export default Axios