const Task = require("../models/Task");

const getAll = async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const tasks = await Task.find({ user_id }).sort({ _id: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const getOne = async (req, res) => {
  try {
    res.status(200).json("asd");
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const insertOne = async (req, res) => {
  try {
    req.body.user_id = req.user.id;

    const newTask = new Task(req.body);
    const task = await newTask.save();
    if (!task) throw Error("Gagal menambah task !");

    res.status(200).json(task);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const updateOne = async (req, res) => {
  try {
    res.status(200).json("asd");
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const updateCheck = async (req, res) => {
  try {
    const { id } = req.params;

    const updateCheckTask = await Task.findByIdAndUpdate(id, {
      completed: req.body.completed,
    });
    if (!updateCheckTask) throw Error("Gagal mengubah check task !");

    const task = await Task.findById(id);
    if (!task) throw Error("Gagal mengubah check task !");

    res.status(200).json(task);
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const deleteOne = async (req, res) => {
  try {
    res.status(200).json("asd");
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports = {
  updateCheck,
  getAll,
  getOne,
  insertOne,
  updateOne,
  deleteOne,
};
