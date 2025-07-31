import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async ()=>{
    console.log("heree");
    try{

        await client.user.create({
            data:{
                email:"test2@gmail.com",
                name: "test2",
                number: "1234567890",
                password: "test2"
            }
        })

        return NextResponse.json({
            msg: "hello"
        })
    } catch(err){
        console.log("entered catch block")
        console.error(err)
        return NextResponse.json( {msg: err})
    }
        
}