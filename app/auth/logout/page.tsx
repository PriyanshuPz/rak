"use client";

import { signOut } from "next-auth/react";
import React from "react";

const LogOutPage = () => {
  signOut();
  return <div className="flex items-center justify-center">Logging out..</div>;
};

export default LogOutPage;
