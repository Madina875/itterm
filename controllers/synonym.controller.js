const { sendErrorResponse } = require("../helpers/send_error_response");
const Syn = require("../schemas/Synon");
const { synValidation } = require("../validation/syn.validation");

const create = async (req, res) => {
  try {
    const { error, value } = synValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }
    const data = req.body;
    const newSyn = await Syn.create(data);

    res.status(201).send({ message: "New syn added", newSyn });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const syns = await Syn.find();
    res.status(200).send({ syns });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const syn = await Syn.findById(id).populate("desc_id").populate("dict_id");
    res.status(200).send({ syn });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Syn.findByIdAndDelete(id);
    res.status(200).send({ message: "syn deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateSyn = await Syn.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateSyn });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
