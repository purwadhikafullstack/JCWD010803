const { Op } = require("sequelize");
const db = require("../../models");
const specialPrice = db.specialPrice;

module.exports = {
  addSpecialPrice: async (req, res) => {
    try {
      const { newPrice, percent, startDate, endDate, roomId } = req.body;
      const checkSpecialPrice = await specialPrice.findOne({
        where: {
          [Op.and]: [
            { roomId: roomId },
            {
              [Op.or]: [
                {
                  startDate: {
                    [Op.between]: [startDate, endDate],
                  },
                },
                {
                  endDate: {
                    [Op.between]: [startDate, endDate],
                  },
                },
              ],
            },
          ],
        },
      });
      if (checkSpecialPrice)
        throw {
          message: `special price has been set in ${new Date(
            new Date(checkSpecialPrice.startDate)
          ).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} - ${new Date(
            new Date(checkSpecialPrice.endDate)
          ).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`,
        };
      if (newPrice) {
        const result = specialPrice.create({
          specialPrice: newPrice,
          startDate,
          endDate,
          roomId,
        });
      }
      if (percent) {
        const result = specialPrice.create({
          specialPrice: percent,
          startDate,
          endDate,
          roomId,
          isPersent: true,
        });
      }
      res.status(200).send({
        message: "Add special price success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
