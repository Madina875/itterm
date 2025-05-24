const { sendErrorResponse } = require("../helpers/send_error_response");
const Soc = require("../schemas/Social");
const { socValidation } = require("../validation/soc.validation");

const create = async (req, res) => {
  try {
    const { error, value } = socValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const newSocial = await Soc.create(value);

    res.status(201).send({ message: "New soc added", newSocial });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const socs = await Soc.find();
    res.status(200).send({ socs });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const soc = await Soc.findById(id);
    res.status(200).send({ soc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Soc.findByIdAndDelete(id);
    res.status(200).send({ message: "soc deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateSoc = await Soc.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateSoc });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
