import {
  FormRow,
  FormRowSelect,
  FormRowSelectAutoComplete,
  FormRowDatePicker,
  Alert,
} from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { Loading } from "../components";
import React, { useEffect } from "react";
import moment from "moment";

const SearchBillContainer = ({ report = "entry" }) => {
  const {
    isLoading,
    sort,
    sortOptions,
    handleChange,
    clearValues,
    handleSubmitSearch,
    customers,
    getAllCustomers,
    showAlert,
    billedCustomer,
    billingOptions,
    fromDate,
    toDate,
    sysFromDate,
    sysToDate,
    phone,
    user,
    voucher,
    setHandleSubmitSearchtrue,
    billingType,
    city,
    billStatus,
    billStatusOptions,
    billCreatedBy,
  } = useAppContext();

  const role = user && user.role;

  const fieldValues = {
    billedCustomer: "",
    phone: "",
    city: "",
    billingType: "",
    sort: "Latest",
    voucher: "",
    fromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
    toDate: moment().format("MM/DD/yyyy"),
    sysFromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
    sysToDate: moment().format("MM/DD/yyyy"),
    billStatusOptions: ["All", "Active", "Deleted"],
    billStatus: "Active",
  };

  useEffect(() => {
    clearValues(fieldValues);
    if (report !== "Report") {
      getAllCustomers();
    }
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
    handleSubmitSearch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearValues(fieldValues);
    setHandleSubmitSearchtrue();
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loading center />
      ) : (
        <form className="form">
          {showAlert && <Alert />}
          <h4>{report}</h4>
          <div className="form-center">
            {report === "Report" ? null : (
              <FormRowSelectAutoComplete
                labelText="Customer"
                name="billedCustomer"
                handleChange={handleCustomerSearch}
                list={customerList}
                value={billedCustomer}
              />
            )}
            {report === "Customer Report" ? null : (
              <>
                <FormRow
                  type="number"
                  name="phone"
                  maxlength="10"
                  labelText="Phone"
                  value={phone || ""}
                  handleChange={handleSearch}
                />

                <FormRow
                  type="text"
                  name="city"
                  labelText="City"
                  value={city || ""}
                  handleChange={handleSearch}
                />
                <FormRowSelect
                  labelText="Entry Type"
                  name="billingType"
                  value={billingType || ""}
                  handleChange={handleSearch}
                  list={billingOptions}
                />
              </>
            )}

            <FormRowSelect
              labelText="Sort"
              name="sort"
              value={sort || ""}
              handleChange={handleSearch}
              list={sortOptions}
            />

            {report === "Customer Report" ? null : (
              <>
                <FormRow
                  type="number"
                  name="voucher"
                  value={voucher || ""}
                  labelText="Voucher"
                  handleChange={handleSearch}
                />
                {role === "admin" ? (
                  <>
                    <FormRowSelect
                      labelText="Entry Status"
                      name="billStatus"
                      value={billStatus}
                      handleChange={handleSearch}
                      list={billStatusOptions}
                    />
                    <FormRow
                      type="text"
                      name="billCreatedBy"
                      value={billCreatedBy || ""}
                      labelText="Created By Email"
                      handleChange={handleSearch}
                    />
                  </>
                ) : null}
              </>
            )}

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
            {report === "Customer Report" ? null : (
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
            )}

            <div className="btn-container">
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
        </form>
      )}
    </Wrapper>
  );
};

export default SearchBillContainer;
