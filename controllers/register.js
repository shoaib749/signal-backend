const bcrypt = require("bcrypt");

const client = require("../config/database");

const jwt = require("jsonwebtoken");
//Registration Function
const password1 = "test"
exports.register = async (req, res) => {
    const { name, email, imageurl, password } = req.body;
    console.log("name", name);
    console.log("email", email);
    console.log("imageURL", imageurl);
    console.log("password", password);
    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
            console.log("Inside the already block");
            return res.status(400).json({
                error: "Email already there, No need to register again.",
            });

        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        error: "Server error",
                    });
                }
                const user = {
                    name,
                    email,
                    imageurl,
                    password: hash,
                };
                console.log("working inside try")
                //Inserting data into the database
                client.query(`INSERT INTO users (name, email, imageurl, password) VALUES ($1,$2,$3,$4);`, [user.name, user.email, user.imageurl, user.password], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        });
                    }
                    else {
                        res.status(200).send({ message: 'User added to database, not verified' });
                        const token = jwt.sign( //Signing a jwt token
                            {
                                email: user.email
                            },
                            process.env.SECRET_KEY
                        );
                    }
                });
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    };
}