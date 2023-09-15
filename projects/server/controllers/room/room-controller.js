const db = require("../../models");
const room = db.rooms;

module.exports = {
  addRoom: async (req, res) => {
    try {
      const  propertyId  = req.params.id;
      const { roomNumber, roomName, price, roomDesc } = req.body;
      const result = await room.create({
        roomNumber,
        roomName,
        roomDesc,
        price,
        propertyId,
      });
      res.status(200).send({
        message: "add room success",
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Internal server error.",
        error,
      });
    }
  },
  updateRoom: async (req, res) => {
    try {
      const { roomName, price, roomDesc } = req.body;
      const {id} = req.params
      const result = await room.update({roomName,roomDesc,price}, {
        where: { id:id },
      });
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
        { where: { id: id} }
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
};
