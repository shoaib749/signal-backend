const client = require("../config/database");
const jwt = require("jsonwebtoken");

exports.addChat = async (req, res) => {
    const { chatName, chatUrl, id } = req.body;
    console.log("chatName", chatName);
    console.log("chatUrl", chatUrl);
    console.log("id", id);
    try {
        const data = await client.query(`SELECT * FROM chats WHERE chatName=$1`, [chatName]);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "ChatName Already exists",
            });
        } else {
            const chat = {
                chatName,
                id,
                chatUrl,
            };
            client.query(`INSERT INTO chats (chatname, chaturl, id) VALUES ($1,$2,$3);`,[chat.chatName, chat.chatUrl, chat.id], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        error: "Database error"
                    });
                } else {
                    res.status(200).send({ message: "Chat Added" })
                }
            }
            );
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while adding chat!"
        });
    };
}