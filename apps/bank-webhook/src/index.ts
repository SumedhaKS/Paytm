import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    // Zod validation to be done
    // Check if the req is legit. (ie. req actually coming from hdfc.) Use a webhook secret here.

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
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
