import Dummy from "./components/Dummy";

// import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between border-b-1 m-1 ">
        <h1 className=" p-2 mx-10 my-5 text-2xl ">PayTM</h1>
        <button className="font-semibold bg-blue-950 text-amber-50 border-2 m-5 px-5 py-2 rounded-2xl">Login</button>
      </div>

      <div>
          <Dummy/>
      </div>
    </div>
  );
}
