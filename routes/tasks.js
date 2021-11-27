const express = require("express");
const {
  getAll,
  insertOne,
  getOne,
  updateOne,
  deleteOne,
  updateCheck,
} = require("../controllers/tasks");

const router = express.Router();

router.route("/").get(getAll).post(insertOne);

router.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

router.route("/check/:id").put(updateCheck);

module.exports = router;
