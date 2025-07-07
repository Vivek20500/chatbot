import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res=await axios.post('/users/login',{email, password},
    { withCredentials: true } );
    if (res.status !== 200) {
        throw new Error('Login failed');
    }
    const data = res.data;
    console.log('Login successful:', data);
    return data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const res = await axios.post("/users/signup", { name, email, password },
    { withCredentials: true } );
    return res.data;
  } catch (err: any) {
    console.error("Signup error (full):", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Signup failed");
  }
};

// export const checkAuthStatus = async () => {
//     const res=await axios.get('/users/auth-status');
//     if (res.status !== 200) {
//         throw new Error('Unable to verify authentication status');
//     }
//     const data = res.data;
//     console.log('Authentication status:', data);
//     return data;
// };
export const checkAuthStatus = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/users/auth-status`,
    { withCredentials: true } // ✅ send cookies
  );

  if (res.status !== 200) {
    throw new Error('Unable to verify authentication status');
  }

  console.log('Authentication status:', res.data);
  return res.data;
};


export const sendChatRequest = async (message:string) => {
    const res=await axios.post('/chat/new',{message},
    { withCredentials: true } );
    if (res.status !== 200) {
        throw new Error('Unable to send messgaee');
    }
    const data = res.data;
    console.log('Authentication status:', data);
    return data;
};

export const getUserChats = async () => {
  try {
    const res = await axios.get("/chat/all-chats", { withCredentials: true });
    return res.data; 
  } catch (err: any) {
    console.error("Error loading chats:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to load chats");
  }
};


export const logoutUser = async () => {
  try {
    const res = await axios.get("/users/logout");

    if (res.status !== 200) throw new Error("Logout failed");
    console.log("Logout successful");
  } catch (err: any) {
    console.error("Logout error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Logout failed");
  }
};
