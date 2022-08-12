import {
  FormRow,
  FormRowSelect,
  FormRowSelectAutoComplete,
  FormRowDatePicker,
  Alert,
  Loading,
} from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchReportContiner";
import React, { useEffect } from "react";
import moment from "moment";
import Typography from "@mui/material/Typography";

const SearchReportContainer = ({ report = "report" }) => {
  const {
    isLoading,
    sort,
    sortOptions,
    handleChange,
    clearCustomerFilters,
    customers,
    getAllCustomers,
    showAlert,
    billedCustomer,
    billingOptions,
    fromDate,
    toDate,
    sysFromDate,
    sysToDate,
    bills,
    phone,
    setHandleSubmitSearchtrue,
    getBills,
  } = useAppContext();

  const fieldValues = {
    billingComment: "",
    billTotal: "",
    gstCharge: "",
    billDiscount: "",
    billCash: "",
    billBank: "",
    voucher: "",
    billDate: moment().format("MM/DD/yyyy"),
    billingTableData: [],
    billingType: "",
    billedCustomer: "",
  };

  useEffect(() => {
    clearCustomerFilters();

    getAllCustomers();
  }, []);

  const customerList =
    (customers &&
      customers.map((customer) => {
        return { id: customer._id, label: customer.name };
      })) ||
    [];

  const handleCustomerSearch = (newValue) => {
    handleChange({ name: "billedCustomer", value: newValue });
  };

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (isLoading) return;
    if (name === "phone") {
      if (value.length > 10) {
        return;
      }
    }

    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleFromDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "fromDate", value: newDate });
  };

  const handleToDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "toDate", value: newDate });
  };

  const handleSysFromDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "sysFromDate", value: newDate });
  };

  const handleSysToDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "sysToDate", value: newDate });
  };

  const handleSubmitBillSearch = (e) => {
    e.preventDefault();
    getBills();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCustomerFilters();
    getAllCustomers();
    setHandleSubmitSearchtrue();
  };

  const calcTotal = (billType, bills) => {
    return (
      bills &&
      bills
        .filter((bill) => bill.billType === billType)
        .map((bill) => bill.grandTotal)
        .reduce((prevValue, currValue) => prevValue + currValue, 0)
    );
  };

  const totalSales = bills && calcTotal("Sales", bills);
  const totoalPurchase = bills && calcTotal("Purchase", bills);
  const totalReciept = bills && calcTotal("Reciept", bills);
  const totalPayments = bills && calcTotal("Payments", bills);

  return (
    <Wrapper>
      {showAlert && <Alert />}

      {isLoading ? (
        <Loading center />
      ) : (
        <form className="form">
          <div className="doNotPrint">
            <h4 className="doNotPrint">
              search {report === "customerReport" ? "Customer" : ""} Entry
            </h4>
            <h4 className="printOnly">Report</h4>

            <div className="form-center">
              {report === "report" ? null : (
                <FormRowSelectAutoComplete
                  labelText="Customer"
                  name="billedCustomer"
                  handleChange={handleCustomerSearch}
                  list={customerList}
                  value={billedCustomer}
                />
              )}
              {report !== "customerReport" ? (
                <div>
                  <FormRow
                    type="number"
                    name="phone"
                    maxlength="10"
                    labelText="Phone"
                    value={phone}
                    handleChange={handleSearch}
                  />
                  <FormRow
                    type="text"
                    name="city"
                    labelText="City"
                    handleChange={handleSearch}
                  />
                  <FormRowSelect
                    labelText="Entry Type"
                    name="billingType"
                    handleChange={handleSearch}
                    list={billingOptions}
                  />
                </div>
              ) : null}
              <FormRowSelect
                labelText="Sort"
                name="sort"
                value={sort}
                handleChange={handleSearch}
                list={sortOptions}
              />

              <FormRowDatePicker
                name="fromDate"
                labelText="Entry From Date"
                value={fromDate}
                handleChange={handleFromDate}
              />
              <FormRowDatePicker
                name="toDate"
                labelText="Entry To Date"
                value={toDate}
                handleChange={handleToDate}
              />
              {report !== "customerReport" ? (
                <>
                  <FormRowDatePicker
                    name="sysFromDate"
                    labelText="System From Date"
                    value={sysFromDate}
                    handleChange={handleSysFromDate}
                  />
                  <FormRowDatePicker
                    name="sysToDate"
                    labelText="System To Date"
                    value={sysToDate}
                    handleChange={handleSysToDate}
                  />
                </>
              ) : null}

              <div className="btn-container doNotPrint">
                <button
                  className="btn submit-btn"
                  disabled={isLoading}
                  onClick={handleSubmitBillSearch}
                >
                  Submit
                </button>
                <button
                  className="btn btn-danger"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  clear filters
                </button>
              </div>
            </div>
          </div>
          <div className="printOnly">
            <Typography variant="h5" gutterBottom component="div">
              Summary
            </Typography>
            <Typography
              style={{ float: "right" }}
              variant="h7"
              gutterBottom
              component="div"
            >
              Date: {fromDate} - {toDate}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Name: {billedCustomer && billedCustomer.label}
            </Typography>

            <Typography variant="h7" gutterBottom component="div">
              Total Sales: {totalSales ? totalSales : 0}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Total Purchase: {totoalPurchase ? totoalPurchase : 0}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Total Reciept: {totalReciept ? totalReciept : 0}
            </Typography>
            <Typography variant="h7" gutterBottom component="div">
              Total Payments: {totalPayments ? totalPayments : 0}
            </Typography>
          </div>
        </form>
      )}
    </Wrapper>
  );
};

export default SearchReportContainer;
