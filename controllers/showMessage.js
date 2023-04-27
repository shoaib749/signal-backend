const client = require("../config/database");

exports.showMessage = async (req, res) => {
    const { chatid } = req.body;
    console.log("chatid:", chatid);
    try {
        const data = await client.query(`SELECT * FROM messages INNER JOIN users ON users.id = messages.id WHERE messages.chatid = $1 ORDER BY timestamp;`, [chatid]);
        const messages = data.rows;
        res.status(200).json({
            messages: messages,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    }
}