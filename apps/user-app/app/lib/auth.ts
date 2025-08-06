import db from "@repo/db/client"              
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number ", type: "text", placeholder: "1231231231" },
                password: { label: "Password", type: "password" }
                // email: {label: "Email", type:"text", placeholder:"example@gmail.com"}
            },
            // TODO: User credentials type from next-auth
            async authorize(credentials: any) {
                //Do zod validation , otp validation here
                console.log("Entered authorize ...... \n \n Credentials: ", credentials)
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                })
                console.log("Entered authorize and: ...... \n \n ", existingUser)
                if (existingUser) {
                    console.log("entered comparision")
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    console.log(passwordValidation)
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null
                }

                try {
                    console.log("entered try")
                    const user = await db.user.create({
                        data: {
                            number: credentials.phone,
                            password: hashedPassword,
                            email: credentials.email
                        }
                    })
                    return {                                
                        id: user.id.toString(),
                        name: user.name || user.number,         // fallback if name is null
                        email: user.number
                    }

                }
                catch (err) {
                    console.error("Error section: .... ", err)
                }
                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET || "whoisit",
    callbacks: {
        async session({token, session}:any ){
            session.user.id = token.sub
            return session
        }
    }
}

/* TODO: 
Currently signup also in signin. 
fix it:
        make a sigup page, 
        if signin failed -> redirect to signup page.
        if user already exists (during signup) -> directly sign them in or send them to signin page 
        -----  Thinking of what to do. Let's see
--------
Another ting is that, 
        In both Token and session, name and email are being taken same. (ie. name: 9988776655, and  email: 9988776655)  
        ----   Understood this.
*/