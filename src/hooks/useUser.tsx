"use client";

import getUser from "@/actions/getuser";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface UserAPI {
  isReady: boolean;
  userData: any | null;
  isLoggedIn: boolean;
}

export default function UseAPIUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userData, setUserData] = useState<UserAPI>({
    isReady: false,
    userData: null,
    isLoggedIn: false,
  });

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!isSignedIn) {
      setUserData({ isReady: true, userData: null, isLoggedIn: false });
      return;
    }
    try {
      if (user) {
        getUser(user.id as string).then((data) => {
          if (data.error) {
            setUserData({ isReady: true, userData: null, isLoggedIn: false });
          } else if (data.userInfo) {
            if (data.userInfo === null) {
              setUserData({
                isReady: true,
                userData: null,
                isLoggedIn: false,
              });
            } else {
              setUserData({
                isReady: true,
                userData: data.userInfo,
                isLoggedIn: true,
              });
            }
          }
        });
      } else {
        setUserData({ isReady: true, userData: null, isLoggedIn: false });
      }
    } catch (error) {
      console.error(error);
      setUserData({ isReady: true, userData: null, isLoggedIn: true });
    }
  }, [isLoaded]);

  return userData;
}
