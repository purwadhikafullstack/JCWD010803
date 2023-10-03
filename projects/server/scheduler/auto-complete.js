const { Op } = require("sequelize");
const { onBooking, userTransactions, rooms } = require("../models");

const autoComplete = async () => {
  try {
    const checkOrder = await onBooking.findAll({
      include: [
        { model: userTransactions, where: { statusId: 3 } },
        { model: rooms },
      ],
      where: {
        checkOut: { [Op.lte]: new Date(new Date().setHours(7, 0, 0, 0)) },
      },
    });
    for (const item of checkOrder) {
      await userTransactions.update(
        { statusId: 7 },
        { where: { id: item.userTransactionId } }
      );
    }
    for (const item of checkOrder) {
      await rooms.increment("QTY", {
        by: 1,
        where: { id: item.room.id },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = autoComplete;
