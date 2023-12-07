const knex = require("../database/knex")

class DishesController {
    async create(request, response) {
        const { name, description, category, price, ingredients } = request.body

        const [dish_id] = await knex("dishes").insert({
            name,
            description,
            category,
            price,
            dishImg
        })

        const ingredientsInsert = ingredients.map(name => {
            return {
                dish_id,
                name
            }
        })

        await knex("ingredients").insert(ingredientsInsert)

        response.status(201).json({
            message: "Prato criado com sucesso!"
        })
    }
}

module.exports = DishesController