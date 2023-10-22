const { Op } = require("sequelize");
const db = require("../../models");
const { log } = require("handlebars");
const transaction = db.userTransactions;
const room = db.rooms;
const properties = db.properties;
const user = db.user;
const status = db.status;
const booking = db.onBooking;
const category = db.categories;
const paymentMethode = db.paymentMethode;

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
                    },
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
            include: paymentMethode,
          },
          {
            model: room,
            include: [
              {
                model: properties,
                include: [{ model: category }],
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
        { where: { userTransactionId: transactionId } }
      );
      const checkRoom = await room.findOne({
        where: { id: roomId },
      });
      res.status(200).send({
        message: "reject success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const { transactionId, roomId } = req.body;
      const changeStatus = transaction.update(
        { statusId: 5 },
        { where: { id: transactionId } }
      );
      const cancelBooking = await booking.update(
        { isCanceled: true },
        { where: { userTransactionId: transactionId } }
      );
      const checkRoom = await room.findOne({
        where: { id: roomId },
      });
      res.status(200).send({
        message: "Cancel success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  salesReport: async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const sort = req.query.sort || "DESC";
      const sortBy = req.query.sortBy || "createdAt";
      const limit = 10;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
      const clause = [];
      const clauseLength = [];

      if (startDate && endDate) {
        clause.push({
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        });

        clauseLength.push({
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        });
      }
      const result = await transaction.findAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: [{ statusId: 7 }, { statusId: 3 }],
            },
            clause,
          ],
        },
        order: [[sortBy, sort]],
        offset: offset,
        limit: limit,
        include: [
          { model: properties, where: { userId: req.user.id } },
          { model: user },
          { model: room },
          { model: booking },
        ],
      });
      const checkLength = await transaction.findAll({
        where: {
          [Op.and]: [
            clauseLength,
            {
              [Op.or]: [{ statusId: 7 }, { statusId: 3 }],
            },
          ],
        },
        include: [{ model: properties, where: { userId: req.user.id } }],
      });
      const length = checkLength.length;

      res.status(200).send({
        message: "Sukses",
        result,
        length,
        limit,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  allPaymentMethode: async (req, res) => {
    try {
      const result = await paymentMethode.findAll();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllSales: async (req, res) => {
    try {
      const checkLength = await transaction.findAll({
        where: {
          [Op.or]: [{ statusId: 7 }, { statusId: 3 }],
        },
        include: [{ model: properties, where: { userId: req.user.id } }],
      });
      const { id } = req.user.id;
      let totalRevenue = 0;
      let totalGuest = length;
      for (const item of checkLength) {
        totalRevenue = totalRevenue + Number(item.totalPayment);
      }

      res.status(200).send({
        id,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  reportProperty: async (req, res) => {
    try {
      const { id } = req.user;
      const { startDate, endDate } = req.body;
      const sort = req.query.sort || "DESC";
      const sortBy = req.query.sortBy || "createdAt";
      const limit = 10;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
      const clause = [];
      const clauseLength = []; //ini untuk filter date
      const result = [];
      let totalRevenue = 0;
      let totalGuest = 0;


      // kondisi untuk filter date
      if (startDate && endDate) {
        clause.push({
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        });

        clauseLength.push({
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        });
      }

      //menampilkan property yg gue
      // dari sini gue dapet porpertyID
      const dataProperty = await properties.findAll({
        where: { userId: id },
        include: [
          {model:room}
        ],
      });

      // console.log(dataProperty);
      for (const item of dataProperty) {
        //ini fungsi untuk menjumlahkan totalPayment
        //tinggal tambahin clause tanggal
        const getTransaction = await transaction.sum("totalPayment", {
          where: {
            [Op.and]: [
              clause,
              {
                [Op.or]: [{ statusId: 7 }, { statusId: 3 }],
              },
              { propertyId: item.id },
            ],
          },
        });

        
        // buat fungsi untuk menjumlahkan total visitor
        //tinggal tambahin clause tanggal
        const getVisitor = await transaction.count({
          where: {
            [Op.and]: [
              clause,
              { propertyId: item.id },
              {
                [Op.or]: [{ statusId: 7 }, { statusId: 3 }],
              },
            ],
          },
        });
        result.push({
          item,
          totalRevenue: getTransaction,
          totalVisitor: getVisitor,
        });
      }

      const length = dataProperty.length;
      res.status(200).send({
        messsage: "Success",
        result,
        length,
        limit
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  visitorProperty: async (req, res) => {
    try {
      const { id } = req.user;

      const dataProperty = await room.findAll({
        include: [
          {
            model: properties,
            where: { userId: id },
          },
        ],
      });

      //gue nyari nih user yang udah ke property gue 


      res.status(200).send({
        message: "success",
        dataProperty
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
