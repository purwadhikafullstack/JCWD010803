const { Op } = require("sequelize");
const { onBooking, userTransactions, codeOtp, user } = require("../models");

const OtpAutoClear = async () => {
  try {
    //cek user yang verifiedCountnya sudah 5, tetapi belum verified
    const checkUser= await user.findAll({
      where: {
        [Op.and]: [
          { isVerified: 0 }, 
          { verifiedCount: { [Op.lte]: 5 } }
        ],
      }
    })
    for (const data of checkUser) {
      await user.update(
        {
          verifiedCount: null
        }
      )
    }

    const deleteOtp = await codeOtp.destroy({
      where: {},
      truncate: true
    });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = OtpAutoClear;
