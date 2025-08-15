import { Button } from "./Button";

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

    return <div className="flex justify-between border-b px-4 border-slate-300">
        <div className="text-2xl flex flex-col justify-center pl-5">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user? onSignout: onSignin}>{user? "Logout": "Login"}</Button>
        </div>
    </div>

}

