import axios from 'axios';

const token = localStorage.getItem("CXRF-token")

const authAxios = axios.create({
    headers: {
        authorization: `Bearer ${token}`
    }
})

export default authAxios