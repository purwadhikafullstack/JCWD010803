const db = require('../../models')
const onBooking = db.onBooking
const transaction = db.userTransactions

const transactionController = {
    addBooking : async (req, res) => {
        try {
            const {checkIn, checkOut, roomId, paymentMethode} = req.body
            const {id} = req.user
            const addBooking = await onBooking.create({
                checkIn,
                checkOut,
                roomId,
                userId : id
            })
            const addTransaction = await transaction.create({
                userId : id,
                roomId,
                paymentMethodeId : paymentMethode,
            })
            res.status(200).send({
                message: "booking success"
            })
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    },
    sendPayment : async (req, res) => {
        try {
            const {paymentImg} = req.file.filename
            const {id} = req.params
            const result = transaction.update(
                {paymentImg : paymentImg},
                {where : {id : id}}
            )
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
}

module.exports = transactionController