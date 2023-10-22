const express = require("express");
const { orderController } = require("../controllers/tenant");
const { verifyToken } = require("../midlewares/token");

const router = express.Router();

router.get("/paymentMethode", orderController.allPaymentMethode);
router.get("/totalSales,", verifyToken, orderController.getAllSales);
router.post("/property-report", verifyToken, orderController.reportProperty);
router.post("/visitor-report", verifyToken, orderController.visitorProperty);
router.patch("/reject", orderController.rejectTransaction);
router.patch("/cancel", orderController.cancelOrder);
router.patch("/confirm", orderController.confirmTransaction);
router.post("/myOrder", verifyToken, orderController.orderMyProperty);
router.get("/status", orderController.getAllStatus);
router.post("/sales", verifyToken, orderController.salesReport);

// router ini harus paling bawah
router.get("/:id", orderController.orderById);

module.exports = router;
