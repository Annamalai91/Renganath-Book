import {
  FormRow,
  FormRowSelectAutoComplete,
  Alert,
  FormRowSelect,
  FormRowTextArea,
  FormRowDatePicker,
  BillingTable,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import { Loading } from "../../components/";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useEffect, forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import rupeeicon from "../../assets/images/rupeeicon.svg";
import { useNavigate } from "react-router-dom";

import moment from "moment";

const Billing = forwardRef((props, ref) => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    handleChange,
    customers,
    getAllCustomers,
    billedCustomer,
    billingOptions,
    billingType,
    billDate,
    billingTableData,
    addBillingDataRow,
    handleDeleteRowBillingData,
    handleSaveRowBillingData,
    createBill,
    billDiscount,
    billingComment,
    isEditing,
    gstCharge,
    editBill,
    billBank,
    billCash,
    user,
    finishEditing,
    voucher,
    clearValues,
    getAllProducts,
    products,
  } = useAppContext();
  const navigate = useNavigate();

  const fieldValues = {
    billingComment: "",
    billTotal: 0,
    gstCharge: 0,
    billDiscount: 0,
    billCash: 0,
    billBank: 0,
    voucher: "",
    billDate: moment().format("MM/DD/yyyy"),
    billingTableData: [],
    billingType: "",
    billedCustomer: "",
  };

  useEffect(() => {
    if (!isEditing) {
      clearValues(fieldValues);
      getAllCustomers();
      getAllProducts();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (isEditing) {
        finishEditing();
      }
    };
  }, []);

  const role = user && user.role;

  const componentRef = useRef();

  const handlePrintMain = (e) => {
    e.preventDefault();
    handlePrint();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const customerList =
    (customers &&
      customers.map((customer) => {
        return { id: customer._id, label: customer.name };
      })) ||
    [];

  const handleSubmit = (e, phone, city) => {
    e.preventDefault();
    if (!billDate || !billedCustomer || !billingType) {
      const alert = "Please provide a Customer and a Entry Type";
      displayAlert(alert);
      return;
    }
    createBill(phone, city);
    clearValues(fieldValues);
  };

  const handleBillingFormSubmit = (e, phone, city) => {
    if (!isEditing) {
      handleSubmit(e, phone, city);
    } else {
      editBill();
      navigate("/edit-bill");
    }
  };

  const handleSearch = (newValue) => {
    handleChange({ name: "billedCustomer", value: newValue });
  };

  const handleBillDate = (newValue) => {
    const newDate = moment(newValue).format("MM/DD/yyyy");
    handleChange({ name: "billDate", value: newDate });
  };

  const handleBillingForm = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const phoneArray =
    customers &&
    billedCustomer &&
    customers.filter((customer) => {
      return customer.name === billedCustomer.label;
    });

  const phone = phoneArray && phoneArray[0] && phoneArray[0]["phone"];

  const cityArray =
    customers &&
    billedCustomer &&
    customers.filter((customer) => {
      return customer.name === billedCustomer.label;
    });

  const city = cityArray && cityArray[0] && cityArray[0]["city"];

  const calculateTotal = () => {
    const tableTotal =
      billingTableData &&
      billingTableData
        .map((element) => {
          return parseFloat(element.total);
        })
        .reduce((partialSum, element) => partialSum + element, 0);

    return parseInt(
      tableTotal +
        (parseFloat(gstCharge) || 0) +
        (parseFloat(billDiscount) || 0) +
        (parseFloat(billBank) || 0) +
        (parseFloat(billCash) || 0)
    );
  };

  const grandTotal = calculateTotal();

  const showButton = !isEditing ? true : role === "admin" ? true : false;

  return (
    <div className="bill-print" ref={componentRef}>
      <div>
        <Wrapper>
          <>
            {isLoading ? (
              <Loading center />
            ) : (
              <>
                <form className="form">
                  {showAlert && <Alert />}
                  <button
                    className="btn print noPrint"
                    onClick={(e) => handlePrintMain(e)}
                  >
                    Print
                  </button>
                  <h3 className="noPrint">
                    {isEditing ? "Edit Entry" : "Create Entry"}
                  </h3>
                  <h3 className="printPage">Bill</h3>

                  <div className="form-center">
                    <div style={{ pointerEvents: isEditing ? "none" : "" }}>
                      <FormRowSelectAutoComplete
                        labelText="Customer"
                        name="billedCustomer"
                        handleChange={handleSearch}
                        list={customerList}
                        value={billedCustomer}
                      />
                    </div>

                    <FormRow
                      type="text"
                      name="phone"
                      labelText="Phone"
                      handleChange={handleBillingForm}
                      value={phone || ""}
                      disabled
                    />
                    <FormRow
                      type="text"
                      name="city"
                      labelText="City"
                      handleChange={handleBillingForm}
                      value={city || ""}
                      disabled
                    />
                    <FormRowSelect
                      labelText="Entry Type"
                      name="billingType"
                      value={billingType || ""}
                      handleChange={handleBillingForm}
                      list={billingOptions}
                      disabled={isEditing ? true : false}
                    />
                    <FormRowDatePicker
                      name="billDate"
                      labelText="Entry Date"
                      value={billDate}
                      handleChange={handleBillDate}
                    />
                    {isEditing ? (
                      <FormRow
                        type="number"
                        name="voucher"
                        disabled={true}
                        labelText="Voucher"
                        handleChange={handleBillingForm}
                        value={voucher || ""}
                      />
                    ) : null}

                    {billingType === "Sales" ? (
                      <>
                        <div className="table">
                          <BillingTable
                            billingTableData={billingTableData}
                            addBillingDataRow={addBillingDataRow}
                            handleDeleteRowBillingData={
                              handleDeleteRowBillingData
                            }
                            handleSaveRowBillingData={handleSaveRowBillingData}
                            role={role}
                            showButton={showButton}
                            products={products}
                          />
                        </div>
                      </>
                    ) : null}

                    <Card sx={{ minHeight: 150 }} className="total total-sum">
                      <CardContent className="card-content">
                        {billingType !== "Sales" ? (
                          <>
                            <div className="charges">
                              <div className="charge-label">Bank:</div>
                              <div className="charge-amount">
                                <img src={rupeeicon} />
                                <input
                                  type="number"
                                  name="billBank"
                                  onWheel={(e) => e.target.blur()}
                                  value={billBank || ""}
                                  onChange={handleBillingForm}
                                />
                              </div>
                            </div>
                            <div className="charges">
                              <div className="charge-label">Cash:</div>
                              <div className="charge-amount">
                                <img src={rupeeicon} />
                                <input
                                  type="number"
                                  onWheel={(e) => e.target.blur()}
                                  name="billCash"
                                  value={billCash || ""}
                                  onChange={handleBillingForm}
                                />
                              </div>
                            </div>
                          </>
                        ) : null}

                        {billingType === "Sales" ? (
                          <>
                            {" "}
                            <div className="charges">
                              <div className="charge-label">Other Charges:</div>
                              <div className="charge-amount">
                                <img src={rupeeicon} />
                                <input
                                  type="number"
                                  onWheel={(e) => e.target.blur()}
                                  name="billDiscount"
                                  value={billDiscount || ""}
                                  onChange={handleBillingForm}
                                />
                              </div>
                            </div>
                            <div className="charges">
                              <div className="charge-label">Tax on Bill:</div>
                              <div className="charge-amount">
                                <img src={rupeeicon} />
                                <input
                                  type="number"
                                  onWheel={(e) => e.target.blur()}
                                  name="gstCharge"
                                  value={gstCharge || ""}
                                  onChange={handleBillingForm}
                                />
                              </div>
                            </div>
                          </>
                        ) : null}
                        <div className="charges">
                          <div className="charge-label">Grand Total:</div>
                          <div className="charge-amount">
                            <img src={rupeeicon} />
                            <input
                              type="number"
                              onWheel={(e) => e.target.blur()}
                              name="billTotal"
                              value={grandTotal || ""}
                              disabled
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="text-area">
                      <FormRowTextArea
                        type="text"
                        name="billingComment"
                        value={billingComment}
                        labelText="Please provide your Comment here ... "
                        handleChange={handleBillingForm}
                      />
                    </div>

                    {/* btn container */}
                    {showButton ? (
                      <div className="btn-container noPrint">
                        <button
                          type="submit"
                          className="btn btn-block submit-btn"
                          onClick={(e) =>
                            handleBillingFormSubmit(e, phone, city)
                          }
                          disabled={isLoading}
                        >
                          submit
                        </button>
                        {isEditing ? null : (
                          <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              clearValues(fieldValues);
                            }}
                          >
                            clear
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>
                </form>
              </>
            )}
          </>
        </Wrapper>
      </div>
    </div>
  );
});

export default Billing;
