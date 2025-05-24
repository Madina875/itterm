const { sendErrorResponse } = require("../helpers/send_error_response");
const Desc = require("../schemas/Desc");
const { descValidation } = require("../validation/desc.validation");

const create = async (req, res) => {
  try {
    const { error, value } = descValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const newDesc = await Desc.create(value);
    res.status(201).send({ message: "New desc added", newDesc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const desc = await Desc.find();
    res.status(200).send({ desc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const desc = await Desc.findById(id).populate("category_id");
    res.status(200).send({ desc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Desc.findByIdAndDelete(id);
    res.status(200).send({ message: "desc deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateDesc = await Desc.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateDesc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
