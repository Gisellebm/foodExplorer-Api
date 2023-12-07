const { Router } = require("express");

const DishesController = require("../controllers/dishesController");

const dishesRoutes = Router();

const dishesControllers = new DishesController();

dishesRoutes.post("/", dishesControllers.create);

module.exports = dishesRoutes;