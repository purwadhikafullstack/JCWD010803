const { Sequelize, Op } = require("sequelize");
const db = require("../../models");
const properties = db.properties;
const rooms = db.rooms;
const booking = db.onBooking;
const category = db.categories

const propertiesController = {
  sortProperty: async (req, res) => {
    try {
      const categoryId = req.query.categoryId || null
      const checkIn = req.query.checkIn || null
      const checkOut = req.query.checkOut || null
      const limit = 10;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
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
            {
              model: category,
              attributes: {
                "category" : category
              }
            }
          ],
          limit: 10,
          offset: offset,
        });

        const data = await properties.findAll({
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
            {
              model: category,
              attributes: {
                "category" : category
              }
            }
          ],
        });

        const length = data.length
        console.log(length);
        const filteredProperties = findProperty.filter((property) =>
          property.rooms.some((room) => room.onBooking === null)
        );
        res.status(200).send({
          properties: filteredProperties,
          length,
          limit
        });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getPropertyimage: async (req, res) => {
    try {
      const { filename } = req.params;
      const dirname = process.env.PRODUCT_ASSETS_DIR;
      const filePath = `${dirname}/public/property/${filename}`;

      if (!filename || filename.trim() === "") {
        return res.status(400).send({
          status: 400,
          message: "Add a valid product image name.",
        });
      }

      const productImage = await properties.findOne({
        where: { propertyImg: filename },
      });
      if (!productImage) {
        return res.status(400).send({
          status: 404,
          message: "Product image not found in the database.",
        });
      }
      res.sendFile(filePath);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: error,
      });
    }
  },
};

module.exports = propertiesController;
