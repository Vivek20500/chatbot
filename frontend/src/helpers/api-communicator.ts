import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res=await axios.post('/users/login',{email, password});
    if (res.status !== 200) {
        throw new Error('Login failed');
    }
    const data = res.data;
    console.log('Login successful:', data);
    return data;
};