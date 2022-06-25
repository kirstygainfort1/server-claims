const {
  getAllClaimsSQL,
  getClaimByIDSQL,
  updateClaimSQL,
  createNewClaimSQL,
} = require("../data-access/claimsRepository");

const jwtAuth = require("express-jwt-authz");

const options = {
  checkAllScopes: true,
  customScopeKey: "permissions",
};

const checkPermissions = (permissions) => {
  jwtAuth(permissions, options);
};

// RECAPTCHA GOES HERE???

const getAllClaims = async (req, res, next) => {
  try {
    checkPermissions(["read:all.claims"]);
    const allClaims = await getAllClaimsSQL();
    return allClaims;
  } catch (err) {
    // next(err)
    return res.json({ error: err.message });
  }
};

const getClaimByID = async (req, res, next) => {
  try {
    checkPermissions(["read: claims-by-id"]);
    const { customer_id } = req.body;
    const claims_id = await getClaimByIDSQL(customer_id);

    if (!claims_id) {
      res.status(400).json({ message: "No claims found" });
    }

    return res.json(claims_id);
  } catch (err) {
    // next(err)
    return res.json({ error: err.message });
  }
};

const updateClaim = async (req, res, next) => {
  try {
    checkPermissions(["update:claims"]);
    const claim_id = req.params.id;
    const { claim_status } = req.body;
    const claimUpdate = await getClaimByIDSQL(claim_status, claim_id);
    return res.json(`Claim ${claim_id} updated successfully`);
  } catch (err) {
    //next(err)
    return res.json({ error: err.message });
  }
};

const createNewClaim = async (req, res, next) => {
  try {
    checkPermissions(["create:claim"]);
    // Recaptcha code here?
    const newClaim = await createNewClaim(req.body);
    if (newClaim)
      res.status(201).json({ message: "New claim createsd successfully" });
  } catch (err) {
    // next(err)
    return res.json({ error: err.message });
  }
};

module.exports = { getAllClaims, getClaimByID, updateClaim, createNewClaim };
