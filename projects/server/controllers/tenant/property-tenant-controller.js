const db = require("../../models");
const properties = db.properties;

const porpertyTenantController = {
  addProperty: async (req, res) => {
    try {
      const { propertyName, propertyDesc, categoryId } = req.body;
      const userId = req.user.id;
      const propertyImg = req.file.filename;
      const result = await properties.create({
        categoryId,
        propertyName,
        propertyDesc,
        propertyImg,
        userId,
      });
      res.status(200).send({
        message: "add properties success",
        result,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  updateProperty: async (req, res) => {
    try {
      const { propertyName, propertyDesc } = req.body;
      const propertyImg = req.file.filename;
      const propertyId = req.params.id;

      const result = await properties.update(
        {
          propertyDesc,
          propertyImg,
          propertyName,
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
      res.status(400).send(error);
    }
  },
};

module.exports = porpertyTenantController