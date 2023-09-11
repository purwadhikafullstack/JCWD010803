const { Sequelize, Op } = require("sequelize");
const db = require("../../models");
const properties = db.properties;
const rooms = db.rooms;
const booking = db.onBooking;

const roomController = {
  sortRoom: async (req, res) => {
    try {
      const { categoryId, checkIn, checkOut } = req.body;
      const nowCheckIn = new Date(
        new Date(checkIn).getTime() + 7 * 60 * 60 * 1000
      );
      const nowCheckOut = new Date(
        new Date(checkOut).getTime() + 7 * 60 * 60 * 1000
      );
      const findProperty = await properties.findAll({
        where: { categoryId: categoryId },
        include: [
          {
            model: rooms,
            include: [
              {
                model: booking,
                required: false,
                where: {
                  [Op.or]: {
                    [Op.and]: [
                      { checkOut: { [Op.gte]: nowCheckIn } },
                      { checkIn: { [Op.lte]: nowCheckOut } },
                    ],
                  },
                },
              },
            ],
          },
        ],
      });
      const filteredProperties = findProperty.filter((property) => property.rooms.some((room) => room.onBooking === null));

      res.status(200).send(filteredProperties);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = roomController;
