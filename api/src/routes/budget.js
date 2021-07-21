const router = require("express").Router();
const budgetCTRL = require("../controllers/budget.controller");

router.route("/").get(budgetCTRL.getBudget).post(budgetCTRL.insertBudget);
router.route("/total").get(budgetCTRL.getBudgetTotal);

router
	.route("/:id")
	.put(budgetCTRL.updateBudget)
	.delete(budgetCTRL.deleteBudget);

module.exports = router;
