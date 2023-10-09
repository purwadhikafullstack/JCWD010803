const db = require("../../models");
const specialPrice = db.specialPrice;

module.exports = {
  addSpecialPrice: async (req, res) => {
    try {
      const { newPrice, percent, startDate, endDate, roomId } = req.body;
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
            isPersent:true
          });
      }
      res.status(200).send({
        message: "Add special price success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
