import api from "./api";

export interface UserProfile {
    id: number;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
    role: string;
}

const UserService = {
    getProfile: () => {
        return api.get<UserProfile>("/user/profile");
    },

    updateProfile: (formData: FormData) => {
        return api.put<UserProfile>("/user/profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default UserService;
