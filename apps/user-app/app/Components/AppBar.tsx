
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const AppBar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {

    return (
        <div>
            <div className="flex justify-between border-b-1 m-1">
                <h1 className="p-2 mx-10 my-5 text-2xl ">PayTM</h1>
                <button onClick={user? onSignout: onSignin} className="font-semibold bg-blue-950 text-amber-50 border-2 m-5 px-5 py-2 rounded-2xl">{user? "Logout" : "Login"}</button>
            </div>
        </div>
    )
}

