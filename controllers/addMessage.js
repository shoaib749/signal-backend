const client = require("../config/database");
exports.addMessage = async (req, res) => {
    const { chatid, message, senderid, timestamp } = req.body;
    console.log(chatid);
    console.log(message);
    console.log(senderid);
    console.log(timestamp);
    const id = senderid;
    try {
        const messageA = {
            message,
            chatid,
            id,
            timestamp
        }
        client.query(`INSERT INTO messages(message, chatid, id, timestamp) VALUES($1,$2,$3,$4);`, [messageA.message, messageA.chatid, messageA.id, messageA.timestamp], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Database error"
                });
            } else {
                res.status(200).send({ message: "Message Added" })
                console.log("Added")
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while adding chat!"
        });
    }
}