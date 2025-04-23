const main = require("../Services/ai.service");

const getResponse = async (req, res) => {
  try {
    console.log("Get-Response Controller working...");
    const {Code} = req.body;
    const msg = await main(Code);
    return res.send({
      status: 1,
      msg : msg
    });
  } catch (err) {
    console.error(err);
    return res.send({
      status: 0,
      msg: "Server error"
    });
  }
};

module.exports = { getResponse };