"use client"

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";

export default function SendCard() {
    return <div className="h-[90vh] ">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder="121212121" onChange={() => {
                        // update number state
                    }} label="Number" />

                    <TextInput placeholder="100" onChange={() => {
                        // update amount state
                    }} label="Amount" />
                    
                    <div className="pt-4 flex justify-center">
                        <Button onClick={() => {

                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}