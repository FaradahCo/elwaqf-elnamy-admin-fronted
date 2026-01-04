import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../store/slices/userSlice";
import { authenticationRoutePath } from "../modules/authentication/authentication.routes";
import { clearStorage } from "@shared/services/storageService";
import type { RootState } from "../store";
import { useEffect } from "react";
import { App } from "antd";

export const useLogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const forceLogout = useSelector((state: RootState) => state.auth.forceLogout);

  useEffect(() => {
    if (forceLogout) {
      message.error("لقد انتهت صلاحيه الجلسة. يرجى تسجيل الدخول مرة أخرى");
      dispatch(clearUser());
      clearStorage();
      navigate(authenticationRoutePath.LOGIN);
    }
  }, [forceLogout]);
};
