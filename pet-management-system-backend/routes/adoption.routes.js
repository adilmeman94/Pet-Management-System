const router = require("express").Router();
const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/role.middleware");

router.post("/:petId", auth, async (req, res) => {
  const pet = await Pet.findById(req.params.petId);
  if (pet.status !== "available")
    return res.status(400).json({ message: "Pet not available" });

  res.json(await Adoption.create({ user: req.user.id, pet: pet._id }));
});

router.get("/me", auth, async (req, res) => {
  res.json(await Adoption.find({ user: req.user.id }).populate("pet"));
});

router.get("/", auth, admin("admin"), async (req, res) => {
  res.json(await Adoption.find().populate("user pet"));
});

router.patch("/:id", auth, admin("admin"), async (req, res) => {
  const adoption = await Adoption.findById(req.params.id);
  adoption.status = req.body.status;

  if (req.body.status === "approved") {
    await Pet.findByIdAndUpdate(adoption.pet, { status: "adopted" });
  }

  await adoption.save();
  res.json(adoption);
});

module.exports = router;
