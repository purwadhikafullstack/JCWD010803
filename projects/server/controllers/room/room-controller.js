const db = require("../../models");
const room = db.rooms;
const roomImg = db.roomImg;

module.exports = {
  addRoom: async (req, res) => {
    try {
      const { roomName, QTY,price, roomDesc } = req.body;
      const propertyId = req.params.id;
      const data = req.files;
      const checkRoom = await room.findOne({
        where : {roomName : roomName, propertyId: propertyId}
      })
      if (checkRoom) throw{
        message:"Room name already exists"
      }

      const result = await room.create({
        roomName,
        roomDesc,
        price,
        propertyId,
        QTY
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
      const page = req.query.page || 1
      const limit = 10;
      const offset = (page - 1) * limit;
      const sort = req.query.sort || "DESC"
      const sortBy = req.query.sortBy || "createdAt"

      const checkLength = await room.findAll({
        where : {propertyId: propertyId, isDelete: false}
      })
      const length = checkLength.length

      const result = await room.findAll({
        where: { propertyId: propertyId, isDelete: false },
        offset: offset,
        limit: limit,
        order: [[sortBy, sort]],
      });
      res.status(200).send({
        result,
        length,
        limit
      });
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
  roomById : async (req, res) => {
    try {
      const {id} = req.params
      const result = await room.findOne({
        where : {id : id}
      })
      res.status(200).send(result)
    } catch (error) {
      res.status(400).send(error)
    }
  }
};
