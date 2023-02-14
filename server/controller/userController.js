const User = require("../model/userModel")
const bcrypt = require("bcrypt");

module.exports.register = async (req, res)=>{
    try {
        const {username, email, password} = req.body
        const usernameCheck = await User.findOne({username});
        if (usernameCheck) return res.json({msg: "Username already in use", status: false});
        const emailCheck = await User.findOne({email})
        if (emailCheck) return res.json({msg: "Email already in use", status: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create({
            username,
            email,
            password:hashedPassword
        })
        return res.json({status: true, user})
    } catch (error) {
        console.error(error);
    }
};

module.exports.login = async (req, res)=>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({username});
        if (!user) return res.json({msg: "Incorrect Username or Password", status: false});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({msg: "Incorrect Username or Password", status: false});
        return res.json({status:true, user});
    } catch (error) {
        console.error(error);
    }
};