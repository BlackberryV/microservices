/* eslint-disable camelcase */

exports.shorthands = undefined;

module.exports.up = async function (pgm) {
  await pgm.createTable("products", {
    id: "id",
    name: { type: "string", notNull: true },
    price: { type: "string", notNull: true },
    count: { type: "integer", notNull: true },
  });
};

module.exports.down = async function (pgm) {
  await pgm.dropTable("products");
};
