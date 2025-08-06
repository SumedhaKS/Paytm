"use client"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

import { AppBar } from "./Components/AppBar";

export default function Page(){

  const session = useSession();

  
  return (
    <div>
      <SessionProvider>  
        <AppBar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      </SessionProvider>
    </div>
  );
}
