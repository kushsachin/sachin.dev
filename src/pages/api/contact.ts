import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed",
        });
    }

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields.",
            });
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        const text = `
        📩 <b>New Portfolio Contact</b>

        👤 <b>Name:</b> ${name}

        📧 <b>Email:</b> ${email}

        💬 <b>Message:</b>

        ${message}

        ━━━━━━━━━━━━━━━━━━━━
        `;

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "HTML",
                }),
            }
        );

        const data = await telegramResponse.json();

        console.log("Telegram Status:", telegramResponse.status);
        console.log("Telegram Response:", data);

        if (!telegramResponse.ok) {
            return res.status(500).json({
                success: false,
                message: data.description || "Telegram API Error",
                telegram: data,
            });
        }

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Failed to send message.",
        });
    }
}