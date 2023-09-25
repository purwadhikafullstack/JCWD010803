const db = require("../../models");
const transaction = db.userTransactions;
const room = db.rooms;
const property = db.properties;
const user = db.user;
const status = db.status;
const booking = db.onBooking;

module.exports = {
  rejectTransaction: async (req, res) => {
    try {
      const { transactionId, roomId, id } = req.body;
      const changeStatus = transaction.update(
        { statusId: 4 },
        { where: { id: transactionId } }
      );
      const cancelBooking = await booking.update(
        { isCanceled: true },
        { where: { roomId: roomId, userId: id } }
      );
      res.status(200).send({
        message: "reject success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  confirmTransaction: async (req, res) => {
    try {
      const { transactionId } = req.body;
      const changeStatus = transaction.update(
        { statusId: 3 },
        { where: { id: transactionId } }
      );
      res.status(200).send({
        message: "confirm success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
