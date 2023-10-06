const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const db = require("../../models");
const room = db.rooms;
const roomImg = db.roomImg;
const specialPrice = db.specialPrice;
const availableRoom = db.availableRoom;

module.exports = {
  addRoom: async (req, res) => {
    try {
      const { roomName, QTY, price, roomDesc } = req.body;
      const propertyId = req.params.id;
      const data = req.files;
      const checkRoom = await room.findOne({
        where: { roomName: roomName, propertyId: propertyId },
      });
      if (checkRoom)
        throw {
          message: "Room name already exists",
        };

      const result = await room.create({
        roomName,
        roomDesc,
        price,
        propertyId,
        QTY,
      });
      const pathImg = data.map((item) => {
        return {
          image: item.filename,
          roomId: result.id,
        };
      });
      const addImg = await roomImg.bulkCreate(pathImg);
      res.status(200).send({
        message: "add room success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  updateRoom: async (req, res) => {
    try {
      const { roomName, price, roomDesc } = req.body;
      const { id } = req.params;
      const result = await room.update(
        { roomName, roomDesc, price },
        {
          where: { id: id },
        }
      );
      res.status(200).send({
        message: "update success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error,
        status: 500,
        message: "Internal server error.",
      });
    }
  },
  deleteRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await room.update(
        { isDelete: true },
        { where: { id: id } }
      );
      res.status(200).send({
        message: "delete success",
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Internal server error.",
        error,
      });
    }
  },
  getRoomByProperties: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const page = req.query.page || 1;
      const limit = 10;
      const offset = (page - 1) * limit;
      const sort = req.query.sort || "DESC";
      const sortBy = req.query.sortBy || "createdAt";

      const result = await room.findAll({
        where: { propertyId: propertyId, isDelete: false },
        offset: offset,
        order: [[sortBy, sort]],
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  getRoomImage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const result = await roomImg.findAll({
        where: { roomId: roomId },
      });

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  editImage: async (req, res) => {
    try {
      const { filename } = req.file;
      const { id } = req.params;
      const result = await roomImg.update(
        { image: filename },
        { where: { id: id } }
      );
      res.status(200).send({
        message: "update success",
      });
    } catch (error) {
      console.log(error);
    }
  },
  roomById: async (req, res) => {
    try {
      const { id } = req.params;
      const { checkIn, checkOut } = req.body;
      console.log(new Date(new Date(checkIn).setHours(7,0,0,0)));

      const checkAvailable = await availableRoom.findOne({
        where: {
          roomId: id,
          [Op.or]: [
            {
              [Op.and]: [
                {
                  startDate: {
                    [Op.lte]: new Date(new Date(checkIn).setHours(7,0,0,0)),
                  },
                  endDate: {
                    [Op.gte]: new Date(new Date(new Date(checkOut).setHours(7,0,0,0)).setHours(7,0,0,0)),
                  },
                },
              ],
            },
            {
              [Op.or]: [
                {
                  startDate: {
                    [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(new Date(checkOut).setHours(7,0,0,0)).setHours(7,0,0,0))],
                  },
                },
                {
                  endDate: {
                    [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(new Date(checkOut).setHours(7,0,0,0)).setHours(7,0,0,0))],
                  },
                },
              ],
            },  
          ],
        },
      });

      const checkPromo = await specialPrice.findOne({
        where: {
          roomId: id,
          [Op.or]: [
            {
              [Op.and]: [
                {
                  startDate: {
                    [Op.lte]: new Date(new Date(checkIn).setHours(7,0,0,0)),
                  },
                  endDate: {
                    [Op.gte]: new Date(new Date(new Date(checkOut).setHours(7,0,0,0)).setHours(7,0,0,0)),
                  },
                },
              ],
            },
            {
              [Op.or]: [
                {
                  startDate: {
                    [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(checkOut).setHours(7,0,0,0))],
                  },
                },
                {
                  endDate: {
                    [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(checkOut).setHours(7,0,0,0))],
                  },
                },
              ],
            },
          ],
        },
      });

      if (checkPromo) {
        const result = await room.findOne({
          where: { id },
          include: [
            {
              model: specialPrice,
              where: {
                roomId: id,
                [Op.or]: [
                  {
                    [Op.and]: [
                      {
                        startDate: {
                          [Op.lte]: new Date(new Date(checkIn).setHours(7,0,0,0)),
                        },
                        endDate: {
                          [Op.gte]: new Date(new Date(checkOut).setHours(7,0,0,0)),
                        },
                      },
                    ],
                  },
                  {
                    [Op.or]: [
                      {
                        startDate: {
                          [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(checkOut).setHours(7,0,0,0))],
                        },
                      },
                      {
                        endDate: {
                          [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(checkOut).setHours(7,0,0,0))],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          attributes: ["id", "roomName", "price", "roomDesc", "propertyId"],
        });
        res.status(200).send(result);
      }
      else if (checkAvailable) {
        const result = await room.findOne({
          where: { id },
          include: [
            {
              model: availableRoom,
              where: {
                roomId: id,
                [Op.or]: [
                  {
                    [Op.and]: [
                      {
                        startDate: {
                          [Op.lte]: new Date(new Date(checkIn).setHours(7,0,0,0)),
                        },
                        endDate: {
                          [Op.gte]: new Date(new Date(checkOut).setHours(7,0,0,0)),
                        },
                      },
                    ],
                  },
                  {
                    [Op.or]: [
                      {
                        startDate: {
                          [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(checkOut).setHours(7,0,0,0))],
                        },
                      },
                      {
                        endDate: {
                          [Op.between]: [new Date(new Date(checkIn).setHours(7,0,0,0)), new Date(new Date(checkOut).setHours(7,0,0,0))],
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
          attributes: ["id", "roomName", "price", "roomDesc", "propertyId"],
        });
        res.status(200).send(result);
      } else {
        const result = await room.findOne({
          where: { id },
        });
        res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  addUnavailableDate : async (req, res) => {
    try {
      const {startDate, endDate, roomId} = req.body
      const result = await availableRoom.create({
        startDate,
        endDate,
        roomId
      })
      res.status(200).send({
        message: "Add unavailablity success"
      })
    } catch (error) {
      res.status(400).send(error)
    }
  }
};
