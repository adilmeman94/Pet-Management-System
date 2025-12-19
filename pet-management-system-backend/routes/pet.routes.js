const router = require("express").Router();
const Pet = require("../models/Pet");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/role.middleware");

router.get("/", async (req, res) => {
  const { q, species, page = 1, limit = 10 } = req.query;

  const filter = {
    ...(q && { name: new RegExp(q, "i") }),
    ...(species && { species }),
  };

  const pets = await Pet.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(pets);
});

router.post("/", auth, admin("admin"), async (req, res) => {
  res.json(await Pet.create(req.body));
});

router.delete("/:id", auth, admin("admin"), async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
