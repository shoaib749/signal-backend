const client = require("../config/database");

exports.showChat = async (req, res) => {
    const { id } = req.body;
    console.log(id);
    try {
        const data = await client.query(`SELECT * FROM users WHERE id=$1`, [id]);
        const user = data.rows;
        if (user.length === 0) {
            res.status(401).json({
                error: "No access",
            });
        }
        else {
            const data = await client.query(`SELECT * FROM chats;`);
            const chats = data.rows;
            res.status(200).json({
                chats: chats,
                message: "succes",
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    }
}