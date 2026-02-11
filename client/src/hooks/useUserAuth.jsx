import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/userContext";

const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.AUTH.GET_USER_INFO
        );

        if (isMounted && response?.data?.user) {
          updateUser(response.data.user);
        }
      } catch (error) {
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
        console.log(error)
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};

export default useUserAuth;
