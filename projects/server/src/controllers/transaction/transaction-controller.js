const db = require("../../models");
const onBooking = db.onBooking;
const transaction = db.userTransactions;
const room = db.rooms;
const paymentMethode = db.paymentMethode;

const transactionController = {
  addBooking: async (req, res) => {
    try {
      const { checkIn, checkOut, roomId, paymentMethode, totalPayment, propertyId } = req.body;
      const { id } = req.user;
      const roomData = await room.findOne({
        where: { id: roomId },
      });
      const checkInDate = new Date(new Date(checkIn).setHours(9, 0, 0, 0));
      const checkOutDate = new Date(new Date(checkOut).setHours(19, 0, 0, 0));
      const rangeDate = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      const addTransaction = await transaction.create({
        userId: id,
        roomId,
        paymentMethodeId: paymentMethode,
        statusId: 1,
        totalPayment,
        propertyId
      });
      const addBooking = await onBooking.create({
        checkIn: checkInDate,
        checkOut: checkOutDate,
        roomId,
        userId: id,
        userTransactionId: addTransaction.id,
      });
      res.status(200).send({
        message: "booking success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  sendPayment: async (req, res) => {
    try {
      const { paymentImg } = req.file.filename;
      const { id } = req.params;
      const result = transaction.update(
        { paymentImg: paymentImg },
        { where: { id: id } }
      );
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};

module.exports = transactionController;