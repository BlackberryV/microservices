/* eslint-disable camelcase */

exports.shorthands = undefined;

module.exports.up = async function (pgm) {
  await pgm.createTable("orders", {
    id: "id",
    sellerid: { type: "string", notNull: true },
    productid: { type: "string", notNull: true },
  });
};

module.exports.down = async function (pgm) {
  await pgm.dropTable("orders");
};
