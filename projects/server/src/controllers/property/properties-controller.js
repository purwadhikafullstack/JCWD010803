const { Sequelize, Op } = require("sequelize");
const db = require("../../models");
const properties = db.properties;
const rooms = db.rooms;
const booking = db.onBooking;
const category = db.categories;
const user = db.user;

const propertiesController = {
  sortProperty: async (req, res) => {
    try {
      const categoryId = req.query.categoryId || null;
      const checkIn = req.query.checkIn || null;
      const checkOut = req.query.checkOut || null;
      const limit = 15;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
      const sort = req.query.sort || "ASC";
      const sortBy = req.query.sortBy;

      const nowCheckIn = new Date(
        new Date(checkIn).getTime() + 7 * 60 * 60 * 1000
      );
      const nowCheckOut = new Date(
        new Date(checkOut).getTime() + 7 * 60 * 60 * 1000
      );
      const findProperty = await properties.findAll({
        where: { categoryId: categoryId, isDelete: false },
        include: [
          {
            model: rooms,
            attributes: ["price"],
            where: {
              QTY: { [Op.ne]: 0 },
              isDelete: false,
            },
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
              category: category,
            },
          },
        ],
        limit: limit,
        offset: offset,
        order:
          sortBy === "price"
            ? [[{ model: rooms, as: "room" }, "price", sort]]
            : [["propertyName", sort]],
      });

      const data = await properties.findAll({
        where: { categoryId: categoryId, isDelete: false },
        include: [
          {
            model: rooms,
            where: {
              QTY: { [Op.ne]: 0 },
              isDelete: false,
            },
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
              category: category,
            },
          },
        ],
      });

      const length = data.length;
      const filteredProperties = findProperty.filter((property) => {
        if (property.rooms && property.rooms.length > 0) {
          const hasNullBooking = property.rooms.some(
            (room) => room.onBooking === null
          );
          return hasNullBooking;
        }
        return false;
      });
      res.status(200).send({
        properties: filteredProperties,
        length,
        limit,
      });
    } catch (error) {
      console.log(error);
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
  getAllCategory: async (req, res) => {
    try {
      const result = await category.findAll();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  addProperty: async (req, res) => {
    try {
      const { propertyName, propertyDesc, categoryId, detailLocation } =
        req.body;
      const userId = req.user.id;
      const propertyImg = req.file.filename;
      const checkProperty = await properties.findOne({
       where : {propertyName : propertyName}
      })
      console.log(checkProperty);
      if (checkProperty) throw{
       message: "Property name has been decliar"
      }
      const result = await properties.create({
        categoryId,
        propertyName,
        propertyDesc,
        propertyImg,
        userId,
        detailLocation,
      });

      res.status(200).send({
        message: "add properties success",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  updateProperty: async (req, res) => {
    try {
      const { propertyName, propertyDesc, categoryId } = req.body;
      const propertyImg = req.file.filename;
      const propertyId = req.params.id;

      const result = await properties.update(
        {
          propertyDesc,
          propertyImg,
          propertyName,
          categoryId,
        },
        {
          where: { id: propertyId },
        }
      );
      res.status(200).send({
        message: "update properties success",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  deleteProperty: async (req, res) => {
    try {
      const propertyId = req.params.id;

      const result = await properties.update(
        { isDelete: true },
        { where: { id: propertyId } }
      );
      res.status(200).send({
        message: "delete success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  myProperties: async (req, res) => {
    try {
      const sort = req.query.sort || "DESC";
      const sortBy = "createdAt";
      const limit = 10;
      const search = req.query.search || ""

      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
      const { id } = req.user;
      const result = await properties.findAll({
        where: { userId: id, isDelete: false, propertyName :  { [Op.like] : `%${search}%`}},
        order: [[sortBy, sort]],
        offset: offset,
        limit: limit,
        include: { model: category },
      });
      const checkLength = await properties.findAll({
        where: { userId: id, isDelete: false },
      });
      const length = checkLength.length;
      res.status(200).send({
        result,
        length,
        limit,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  allProperties: async (req, res) => {
    try {
      const limit = 16;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
      const result = await properties.findAll({
        include: [{ model: category }, { model: rooms }],
        limit: limit,
        offset: offset,
        where: { isDelete: false },
      });
  
      const get = await properties.findAll({
        where: { isDelete: false },
      });
      const length = get.length;
  
      res.status(200).send({ result, length, limit });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  
  detailProperty: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await properties.findOne({
        where: { id: id },
        include: [{ model: category }, { model: user }],
      });
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  editCategory: async (req, res) => {
    try {
      const { categoryId, newCategory } = req.body;
      const { id } = req.user;
      const checkCategory = await category.findOne({
        where: { id: categoryId },
      });
      if (checkCategory.userId !== id) {
        throw {
          message: "You Can't Edit This Location",
        };
      }
      const result = await category.update(
        { category: newCategory },
        { where: { id: categoryId } }
      );
      res.status(200).send({
        message: "Updated Category Successfully",
      });
    } catch (error) {
      res.status(400).send({
        message:
          error.message || "An error occurred while updating the category",
      });
    }
  },
  addCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      const { id } = req.user;
      const result = await category.create({ category: categoryName, userId: id });
      res.status(200).send({
        message: " Add Category Success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const result = await category.destroy({
        where: { id: id },
      });
      res.status(200).send({
        message: "Delete Category Success",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  myCategories: async (req, res) => {
    try {
      const { id } = req.user;
      const checkCategory = await category.findAll({
        where: {userId: id},
      })
      res.status(200).send(checkCategory)
    } catch (error) {
      console.log(error);
    }
  },
};


module.exports = propertiesController;
