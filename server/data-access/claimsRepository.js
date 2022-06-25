const pool = require("../config/db");

const getAllQuery = "SELECT * FROM claims";
const getByIdQuery = "SELECT * FROM claims WHERE customers_id = $1";
const updateQuery =
  "UPDATE claims SET claim_status = $1 WHERE claim_id_number = $2";
const newClaimQuery =
  "INSERT INTO claims (policy_number, customers_id, describe_condition, symptom_onset, symptom_details, required_medical_service, service_provider, claim_status, claim_id_number) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING claim_id_number";

const getAllClaimsSQL = async () => {
  try {
    const { rows } = await pool.query(getAllQuery);
    return rows;
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const getClaimByIDSQL = async (id) => {
  try {
    const { rows } = await pool.query(getByIdQuery, id);
    return rows;
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const updateClaimSQL = async (claim_status, claim_id_number) => {
  try {
    const { rows } = await pool.query(
      updateQuery,
      (claim_status, claim_id_number)
    );
    return rows;
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const createNewClaimSQL = async ({
  policy_number,
  customers_id,
  describe_condition,
  symptom_onset,
  symptom_details,
  required_medical_service,
  service_provider,
  claim_status,
  claim_id_number,
}) => {
  try {
    const result = await pool.query(
      newClaimQuery,
      (policy_number,
      customers_id,
      describe_condition,
      symptom_onset,
      symptom_details,
      required_medical_service,
      service_provider,
      claim_status,
      claim_id_number)
    );
    return result;
  } catch (err) {
    return res.json({ error: err.message });
  }
};

module.exports = {
  getAllClaimsSQL,
  getClaimByIDSQL,
  updateClaimSQL,
  createNewClaimSQL,
};
