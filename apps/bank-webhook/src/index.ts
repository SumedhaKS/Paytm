import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json())

app.get('/', (req,res)=>{
    res.json({msg : "Hitting"})
})

app.post("/hdfcWebhook", async (req, res) => {
    // Zod validation to be done
    // Check if the req is legit. (ie. req actually coming from hdfc.) Use a webhook secret here.

    const paymentInformation:{
        token: string,
        userId: string,
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),

            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success"
                }
            })
        ])

        res.status(200).json({
            message: "Captured"
        })

    }

    catch (err) {
        console.error(err);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})


app.listen(5000, ()=> {
    console.log("Listening on port 5000")
});