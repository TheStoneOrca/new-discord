"use client";

import getUser from "@/actions/getuser";
import { useEffect, useState } from "react";

interface UserAPI {
  isReady: boolean;
  user: object | null;
  isSignedIn: boolean;
}

export default function UseAPIUser(props: { userid: string }) {
  const [userData, setUserData] = useState<UserAPI>({
    isReady: false,
    user: null,
    isSignedIn: false,
  });

  useEffect(() => {
    try {
      getUser(props.userid).then((data) => {
        if (data.error) {
          setUserData({ isReady: true, user: null, isSignedIn: false });
        } else if (data.user) {
          if (data.user === null) {
            setUserData({ isReady: true, user: null, isSignedIn: false });
          } else {
            setUserData({ isReady: true, user: data.user, isSignedIn: true });
          }
        }
      });
    } catch (error) {
      console.error(error);
      setUserData({ isReady: true, user: null, isSignedIn: true });
    }
  }, []);

  return userData;
}
