const knex = require("../database/knex")

class DishesController {
    async create(request, response) {
        const { name, description, category, price, ingredients } = request.body

        const [dish_id] = await knex("dishes").insert({
            name,
            description,
            category,
            price
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

    async show(request, response) {
        const { id } = request.params

        const dish = await knex("dishes").where({ id }).first()
        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name")

        return response.json({
            ...dish,
            ingredients
        })
    }

    async delete(request, response) {
        const { id } = request.params

        await knex("dishes").where({ id }).delete()

        return response.status(202).json({
            message: "Prato deletado com sucesso!"
        })
    }
}

module.exports = DishesController