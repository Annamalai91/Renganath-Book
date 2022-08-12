import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const AutoIncrementnew = AutoIncrement(mongoose);

const BillSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Please select a valid Customer"],
    },
    gstCharge: {
      type: Number,
    },
    billDiscount: {
      type: Number,
    },
    cash: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Active", "Deleted"],
      default: "Active",
    },
    bank: {
      type: Number,
    },
    grandTotal: {
      type: Number,
      min: [1, "Grand Total must be greater than 0"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    city: {
      type: String,
      required: [true, "Please provide City"],
    },
    billDate: {
      type: Date,
      required: [true, "Please provide the Entry Date"],
    },
    billType: {
      type: String,
      enum: ["Sales", "Purchase", "Receipt", "Payments"],
      required: [true, "Please provide the Entry Type"],
    },
    comment: {
      type: String,
      default: "",
      required: [true, "Please Provide Comments"],
    },
    billingTableData: {
      type: [
        {
          id: String,
          price: Number,
          productName: { id: String, label: String },
          quantity: Number,
          total: Number,
          unitsOfMeasurement: String,
        },
      ],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    createdByClient: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: [true, "Please provide Client ID"],
    },
  },
  { timestamps: true }
);

BillSchema.plugin(AutoIncrementnew, { inc_field: "voucher" });

export default mongoose.model("Bill", BillSchema);
