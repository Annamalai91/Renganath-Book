import Customer from "../models/Customer.js";
import Bill from "../models/Bill.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createCustomer = async (req, res) => {
  const { name, phone, comment, city } = req.body;

  if (!name || !phone) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  req.body.createdByClient = req.user.client;
  console.log("Request body is", req.body);

  const customer = await Customer.create(req.body);
  res.status(StatusCodes.CREATED).json({ customer });
};

const getAllCustomers = async (req, res) => {
  const { sort, name, phone, city, all } = req.query;

  const queryObject = {
    createdByClient: req.user.client,
  };
  // add stuff based on condition

  if (!all) {
    if (phone) {
      queryObject.phone = { $regex: phone, $options: "i" };
    }
    if (city) {
      queryObject.city = { $regex: city, $options: "i" };
    }
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    // NO AWAIT
  }

  let result = Customer.find(queryObject);

  // chain sort conditions

  if (sort === "Latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "Oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "Ascending") {
    result = result.sort("name");
  }
  if (sort === "Descending") {
    result = result.sort("-name");
  }

  if (!all) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const customers = await result;

    const totalCustomers = await Customer.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalCustomers / limit);
    res.status(StatusCodes.OK).json({ customers, totalCustomers, numOfPages });
  } else {
    const customers = await result;

    res.status(StatusCodes.OK).json({ customers });
  }

  // setup pagination
};

const updateCustomer = async (req, res) => {
  const { id: customerId } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    throw new BadRequestError("Please provide all values");
  }
  const customer = await Customer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No Customer with id :${customerId}`);
  }
  // check permissions

  checkPermissions(req.user.client, customer.createdByClient);

  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: customerId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedCustomer });
};

const deleteCustomer = async (req, res) => {
  const { id: customerId } = req.params;
  const { name } = req.query;
  const bill = await Bill.findOne({
    customerName: name,
    createdByClient: req.user.client,
  });

  if (bill) {
    throw new ConflictError("The Customer is having a bill with your company");
  }

  const customer = await Customer.findOne({ _id: customerId });

  if (!customer) {
    throw new NotFoundError(`No customer with id :${customerId}`);
  }

  checkPermissions(req.user.client, customer.createdByClient);

  await customer.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Customer removed" });
};

export { createCustomer, deleteCustomer, getAllCustomers, updateCustomer };
