import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../store/slices/userSlice";
import { authenticationRoutePath } from "../modules/authentication/authentication.routes";
import { clearStorage } from "@shared/services/storageService";
import type { RootState } from "../store";
import { useEffect } from "react";

export const useLogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forceLogout = useSelector((state: RootState) => state.auth.forceLogout);

  useEffect(() => {
    if (forceLogout) {
      dispatch(clearUser());
      clearStorage();
      navigate(authenticationRoutePath.LOGIN);
    }
  }, [forceLogout]);
};
