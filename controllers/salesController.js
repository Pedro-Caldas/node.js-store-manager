const salesService = require('../services/salesService');
const ApplicationError = require('../errors/ApplicationError');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (sale === null) throw new ApplicationError(404, 'Sale not found');
  return res.status(200).json(sale);
};

const add = async (req, res) => {
  const sale = req.body;
  const productsId = sale.map((el) => el.productId);
  await salesService.verifyProducts(productsId);
  const saleId = await salesService.addSale(sale);
  const saleAdded = await salesService.getNewSale(saleId);
  return res.status(201).json(saleAdded);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const productsId = sale.map((el) => el.productId);
  await salesService.verifyProducts(productsId);
  const updatedSale = await salesService.update(id, sale);
  if (updatedSale === null) throw new ApplicationError(404, 'Sale not found');
  const responseJson = { saleId: id, itemsUpdated: sale };
  return res.status(200).json(responseJson);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removedSale = await salesService.remove(id);
  if (removedSale === null) throw new ApplicationError(404, 'Sale not found');
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};