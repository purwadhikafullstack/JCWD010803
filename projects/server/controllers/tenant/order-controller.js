const db = require('../../models')
const transaction = db.userTransactions
const room = db.rooms
const properties = db.properties
const user = db.user
const status = db.status

module.exports = {
    orderMyProperty : async (req, res) => {
        try {
            const {id} = req.user
            const statusId = req.query.statusId || "1"
            const result = await transaction.findAll({
                where: {statusId : statusId},
                include: [
                    {model: status},
                    {
                    model: room,
                    include: [{
                        model: properties,
                        where: {userId : id},
                        include: [{
                            model: user
                        }]
                    }] 
                }]
            })

            const filteredOrder = result.filter((order) => {
                if (order.room) {
                    const myOrder = order.room !== null
                    return myOrder
                }
            })
            res.status(200).send(filteredOrder)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
}