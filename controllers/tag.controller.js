const { sendErrorResponse } = require("../helpers/send_error_response");
const Tag = require("../schemas/Tag");
const { tagValidation } = require("../validation/tag.validation");

const create = async (req, res) => {
  try {
    const { error, value } = tagValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const newAuthor = await Tag.create(value); // create i o'chirildi

    res.status(201).send({ message: "New tag added", newAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const author = await Tag.find();
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const author = await Tag.findById(id)
      .populate("topic_id")
      .populate("category_id");
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Tag.findByIdAndDelete(id);
    res.status(200).send({ message: "tag deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateAuthor = await Tag.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
