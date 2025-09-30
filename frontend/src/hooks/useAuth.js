export const useAuth = () => {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;
    return { isLoggedIn, token };
};