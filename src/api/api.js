import axios from "axios"

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '9947e954-4f4d-4295-a326-d1a6673e842c'
    },
})

export const usersAPI = {
    getUsers: async (pageSize = 1, currentPage = 5) => {
        const response = await
            instance.get(`users?count=${pageSize}&page=${currentPage}`)
        return response.data
    },

    setSubscribe: async id => {
        const response = await
            instance.post(`follow/${id}`)
        return response.data
    },

    deleteSubscribe: async id => {
        const response = await
            instance.delete(`follow/${id}`)
        return response.data
    }
}

export const authAPI = {
    authMe: async () => {
        const response = await
            instance.get('auth/me')
        return response.data
    },

    getAuthPhoto: async userId => {
        const response = await
            instance.get(`profile/${userId}`)
        return response.data.photos.small
    },

    login: async (email, password, rememberMe = false, captcha) => {
        const response = await
            instance.post('auth/login', {
                email,
                password,
                rememberMe,
                captcha
            })
        return response.data
    },

    logout: async () => {
        const response = await
            instance.delete('auth/login')
        return response.data
    }
}

export const profileAPI = {
    getProfile: async id => {
        const response = await
            instance.get(`profile/${id}`)
        return response.data
    },

    getUserStatus: async userId => {
        const response = await
            instance.get(`profile/status/${userId}`)
        return response.data
    },

    updateUserStatus: async newStatus => {
        const response = await
            instance.put('profile/status', {
                status: newStatus
            })
        return response.data
    },

    setUserPhoto: async photoFile => {
        const formData = new FormData()
        formData.append('image', photoFile)
        const response = await
            instance.put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        return response.data
    },

    setUpdatedProfile: async profileData => {
        const response = await
            instance.put('profile',
                profileData
            )
        return response.data
    }
}


export const securityAPI = {
    getCaptcha: async () => {
        const response = await
            instance.get('security/get-captcha-url')
        return response.data
    }
}

