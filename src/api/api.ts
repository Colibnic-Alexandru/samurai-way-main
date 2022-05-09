import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "b75d20c7-5470-44f3-942b-1e40a20dd154"
    }
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    }
}


export const followAPI = {
    follow(userId: number) {
        return instance.post(`follow/${userId} `)
            .then(response => {
                return response.data;
            })
    }
}
