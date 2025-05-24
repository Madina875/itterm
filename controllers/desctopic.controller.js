const { sendErrorResponse } = require("../helpers/send_error_response");
const DescTopic = require("../schemas/DescTopic");
const { desctValidation } = require("../validation/desctopic.validation");

const create = async (req, res) => {
  try {
    const { error, value } = desctValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const data = value;
    console.log(value);
    const newAuthor = await DescTopic.create(data); // create i o'chirildi

    res.status(201).send({ message: "New desctopic added", newAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const author = await DescTopic.find();
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const author = await DescTopic.findById(id)
      .populate("desc_id")
      .populate("topic_id");
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await DescTopic.findByIdAndDelete(id);
    res.status(200).send({ message: "desctopic deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateAuthor = await DescTopic.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
