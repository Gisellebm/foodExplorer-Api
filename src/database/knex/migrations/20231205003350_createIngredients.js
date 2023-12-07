exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");

    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
 });
 
 exports.down = knex => knex.schema.dropTable("ingredients");