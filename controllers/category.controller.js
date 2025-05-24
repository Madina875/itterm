const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../schemas/Category");
const { catValidation } = require("../validation/cat.validation");
const uuid = require("uuid");
const config = require("config");
const bcrypt = require("bcrypt");
const { categoryJwtService } = require("../service/jwt.service");
const mailService = require("../service/mail.service");

const create = async (req, res) => {
  try {
    const { error, value } = catValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const newCategory = await Category.create(value);

    res.status(201).send({ message: "New category added", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).send({ category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const category = await Category.findById(id).populate("parent_category");
    res.status(200).send({ category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({ message: "Category deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateCategory = await Category.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
