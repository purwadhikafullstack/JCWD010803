const { Op } = require("sequelize");
const db = require("../../models");
const transaction = db.userTransactions;
const room = db.rooms;
  const properties = db.properties;
  const user = db.user;
  const status = db.status;
  const booking = db.onBooking;
  const category = db.categories
  const paymentMethode = db.paymentMethode
  
  module.exports = {
  orderMyProperty: async (req, res) => {
    try {
      const { id } = req.user;
      const sort = req.query.sort || "DESC";
      const page = req.query.page || "1";
      const limit = 10;
      const offset = (page - 1) * limit;
      const statusId = req.query.statusId;
      if (statusId) {
        const result = await transaction.findAll({
          where: { statusId: statusId },
          include: [
            { model: status },
            { model: user },
            {
              model: room,
              include: [
                {
                  model: properties,
                  where: { userId: id },
                  include: [
                    {
                      model: user,
                    }
                  ],
                },
              ],
            },
          ],
          offset: offset,
          limit: limit,
        });
        const getLength = await transaction.findAll({
          where: { statusId: statusId },
          include: [
            { model: status },
            { model: user },
            {
              model: room,
              include: [
                {
                  model: properties,
                  where: { userId: id },
                  include: [
                    {
                      model: user,
                    }
                  ],
                },
              ],
            },
          ],
        });
        const length = getLength.length;
        const filteredOrder = result.filter((order) => {
          if (order.room) {
            const myOrder = order.room !== null;
            return myOrder;
          }
        });
        res.status(200).send({
          filteredOrder,
          limit,
          length,
        });
      } else {
        const result = await transaction.findAll({
          include: [
            { model: status },
            { model: user },
            {
              model: room,
              include: [
                {
                  model: properties,
                  where: { userId: id },
                  include: [
                    {
                      model: user,
                    },
                  ],
                },
              ],
            },
          ],
          limit: limit,
          offset: offset,
          order: [["createdAt", sort]],
        });
        const getLength = await transaction.findAll({
          include: [
            { model: status },
            { model: user },
            {
              model: room,
              include: [
                {
                  model: properties,
                  where: { userId: id },
                  include: [
                    {
                      model: user,
                    },
                  ],
                },
              ],
            },
          ],
        });
        const length = getLength.length;
        const filteredOrder = result.filter((order) => {
          if (order.room) {
            const myOrder = order.room !== null;
            return myOrder;
          }
        });
        res.status(200).send({
          filteredOrder,
          limit,
          length,
        });
      }
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
    }
  },
  getAllStatus: async (req, res) => {
    try {
      const result = await status.findAll();
      res.status(200).send(result);
    } catch (error) {
      req.status(400).send(error);
    }
  },
  orderById: async (req, res) => {
    try {
      const { id } = req.params;
      const checkBooking = await booking.findOne({
        where: { userTransactionId: id },
        include: [
          { model: user },
          { 
            model: transaction,
            include: paymentMethode
          },
          {
            model: room,
            include: [
              {
                model: properties,
                include:[
                  {model:category}
                ]
              },
            ],
          },
        ],
      });

      res.status(200).send(checkBooking);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  rejectTransaction: async (req, res) => {
    try {
      const { transactionId, roomId } = req.body;
      const changeStatus = transaction.update(
        { statusId: 4 },
        { where: { id: transactionId } }
      );
      const cancelBooking = await booking.update(
        { isCanceled: true },
        { where: { userTransactionId: transactionId} }
      );
      const checkRoom = await room.findOne({
        where : {id : roomId}
      })
      const quantityAdjustment = await room.update(
        {QTY : checkRoom.QTY + 1},
        {where : {id : roomId}}
      )
      res.status(200).send({
        message: "reject success",
      });
    }
    catch (error) {
      res.status(400).send(error)
    }
  },
  cancelOrder : async (req, res) => {
    try {
      const { transactionId, roomId } = req.body;
      const changeStatus = transaction.update(
        { statusId: 5 },
        { where: { id: transactionId } }
      );
      const cancelBooking = await booking.update(
        { isCanceled: true },
        { where: { userTransactionId: transactionId} }
      );
      const checkRoom = await room.findOne({
        where : {id : roomId}
      })
      const quantityAdjustment = await room.update(
        {QTY : checkRoom.QTY + 1},
        {where : {id : roomId}}
      )
      res.status(200).send({
        message: "Cancel success",
      });
    }
    catch (error) {
      res.status(400).send(error)
    }
  },
  salesReport : async (req, res) => {
    try {
      const result = await transaction.findAll({
        where : {
          [Op.or] : [
            {statusId : 7},
            {statusId : 3}
          ]
        },
        include : [
          { model : properties, where :{userId : req.user.id} },
          { model : user},
          { model : room},
          { model : booking}
        ]
      });
      res.status(200).send({
        message : "Sukses",
        result
      })
      
    } catch (error) {
      res.status(400).send(error)
    }
  },
  allPaymentMethode : async (req, res) => {
    try {
        const result = await paymentMethode.findAll()    
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
}
};
