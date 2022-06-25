const express = require("express");

const router = express.Router();

const {
  getAllClaims,
  getClaimByID,
  updateClaim,
  createNewClaim,
} = require("../controllers/claimsControllers.js");

router.route("/").get(getAllClaims).post(createNewClaim);
router.route("/:id").get(getClaimByID).put(updateClaim);

module.exports = router;
