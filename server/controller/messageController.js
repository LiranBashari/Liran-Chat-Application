const Message = require ("../model/messageModel")

module.exports.addMessage = async (req, res)=>{
    try {
        const {from, to, message} = req.body
        const data = await Message.create({
            message: {text:message},
            sender: from,
            users: [from, to],
        })
        if (data) return res.json({status: true, msg: "Message added to DB successfully!"})
        else return res.json({status:false, msg: "Failed to add message to the DB"})
    } catch (error){
        console.error(error);

    }
}
module.exports.getMessages = async (req, res) => {
    try {
        const {from, to} = req.body;
        const usersMessages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({updatedAt: 1});

        const projectedMessages = usersMessages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (error) {
        console.error(error);
    }
};
