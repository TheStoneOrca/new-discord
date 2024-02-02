"use client";

import { useEffect, useState } from "react";

interface ResponseData {
  userid: string;
  username: string;
  userrole: "admin" | "member" | "owner";
  profile: string;
  email: Array<string>;
  fname: string;
  lname: string;
  bio: string;
  pronouns: string;
}

interface UserAPI {
  isReady: boolean;
  user: ResponseData | null;
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
      fetch(`/api/getuser/${props.userid}`).then((data) => {
        switch (data.status) {
          case 401:
            setUserData({ isReady: true, user: null, isSignedIn: true });
          case 500:
            setUserData({ isReady: true, user: null, isSignedIn: true });
          case 406:
            setUserData({ isReady: true, user: null, isSignedIn: true });
          default:
            data.json().then((res: ResponseData) => {
              setUserData({ isReady: true, user: res, isSignedIn: true });
            });
        }
      });
    } catch (error) {
      console.error(error);
      setUserData({ isReady: true, user: null, isSignedIn: true });
    }
  }, []);

  return userData;
}
