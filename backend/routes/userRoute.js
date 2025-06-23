const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, age } = req.body;
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(200).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});


//GET
router.get("/", async (req, res) => {
    try {
      const allUsers = await User.find();
  
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


//GET SINGLE USER
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const singleUser = await User.findById({ _id: id });
      res.status(200).json(singleUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


//DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete({ _id: id });
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


//UPDATE
router.patch("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


module.exports = router;