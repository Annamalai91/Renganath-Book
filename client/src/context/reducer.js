import {
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  GET_BILLS_BEGIN,
  GET_BILLS_SUCCESS,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  FINISH_EDITING,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CREATE_BILL_BEGIN,
  CREATE_BILL_SUCCESS,
  CREATE_BILL_ERROR,
  SET_EDIT_CUSTOMER,
  SET_EDIT_BILL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_BEGIN,
  CLEAR_FILTERS,
  ADD_BILLING_TABLE_DATA,
  CLEAR_CUSTOMER_FILTERS,
  CHANGE_PAGE,
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  EDIT_CUSTOMER_BEGIN,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_ERROR,
  UPDATE_BILLING_TABLE_DATA,
  HANDLE_SUBMIT_SEARCH,
  DELETE_CUSTOMER_ERROR,
  DELETE_BILL_BEGIN,
  DELETE_BILL_ERROR,
  EDIT_BILL_BEGIN,
  EDIT_BILL_SUCCESS,
  EDIT_BILL_ERROR,
  HANDLE_SUBMIT_SEARCH_FINISHED,
  DELETE_BILL_SUCCESS,
  CLEAR_VALUES,
  SET_EDIT_PRODUCT,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  EDIT_PRODUCT_BEGIN,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
} from "./actions";
import moment from "moment";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.alert,
    };
  }
  if (action.type === DELETE_BILL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Something Went Wrong, Please try again letter!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === FINISH_EDITING) {
    return {
      ...state,
      isEditing: false,
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === HANDLE_SUBMIT_SEARCH) {
    return {
      ...state,
      searchSubmit: true,
    };
  }
  if (action.type === HANDLE_SUBMIT_SEARCH_FINISHED) {
    return {
      ...state,
      searchSubmit: false,
    };
  }

  if (action.type === ADD_BILLING_TABLE_DATA) {
    return { ...state, billingTableData: [...action.payload.billingTableData] };
  }
  if (action.type === UPDATE_BILLING_TABLE_DATA) {
    return {
      ...state,
      billingTableData: [...action.payload.newBillingTableData],
    };
  }
  if (
    action.type === CREATE_CUSTOMER_BEGIN ||
    action.type === CREATE_PRODUCT_BEGIN
  ) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_BILL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Customer Created!",
    };
  }

  if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Product Created!",
    };
  }

  if (action.type === CREATE_BILL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Bill Created!",
    };
  }

  if (
    action.type === CREATE_CUSTOMER_ERROR ||
    action.type === CREATE_PRODUCT_ERROR
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CREATE_BILL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_CUSTOMERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_BILLS_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_CUSTOMERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customers: action.payload.customers,
      totalCustomers: action.payload.totalCustomers,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_BILLS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      bills: action.payload.bills,
      totalBills: action.payload.totalBills,
      openingBalanceType: action.payload.openingBalanceType,
      openingBalance: action.payload.openingBalance,
    };
  }

  if (action.type === SET_EDIT_CUSTOMER) {
    const customer = state.customers.find(
      (customer) => customer._id === action.payload.id
    );
    const { _id, name, phone, city, comment } = customer;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      name,
      phone,
      city,
      comment,
    };
  }

  if (action.type === SET_EDIT_PRODUCT) {
    const product = state.products.find(
      (product) => product._id === action.payload.id
    );
    const { _id, productName, unitsOfMeasure } = product;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      productName,
      unitsOfMeasure,
    };
  }

  if (action.type === SET_EDIT_BILL) {
    const bill = state.bills.find((bill) => bill._id === action.payload.id);

    const {
      _id,
      billDate,
      billDiscount,
      billType,
      billingTableData,
      city,
      comment,
      customerName,
      gstCharge,
      grandTotal,
      phone,
      bank,
      cash,
      voucher,
    } = bill;

    const billedCustomer = { id: _id, label: customerName };
    const billingComment = comment;
    const billingType = billType;
    return {
      ...state,
      isEditing: true,
      editBillId: _id,
      billDiscount,
      billingType,
      billingTableData,
      city,
      billingComment,
      billedCustomer,
      gstCharge,
      phone,
      billDate,
      voucher,
      name: customerName,
      billBank: bank,
      billCash: cash,
      grandTotal,
    };
  }

  if (action.type === DELETE_CUSTOMER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_BILL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (
    action.type === EDIT_CUSTOMER_BEGIN ||
    action.type === EDIT_PRODUCT_BEGIN
  ) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_BILL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Customer Updated!",
    };
  }
  if (action.type === EDIT_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Product Updated!",
    };
  }

  if (action.type === DELETE_BILL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Bill deleted!",
    };
  }

  if (action.type === DELETE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Customer deleted!",
    };
  }

  if (action.type === DELETE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Product deleted!",
    };
  }

  if (action.type === EDIT_BILL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Bill Updated!",
    };
  }
  if (
    action.type === EDIT_CUSTOMER_ERROR ||
    action.type === EDIT_PRODUCT_ERROR
  ) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_BILL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CLEAR_CUSTOMER_FILTERS) {
    return {
      ...state,
      name: "",
      phone: "",
      city: "",
      sort: "Latest",
      fromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
      toDate: moment().format("MM/DD/yyyy"),
      sysFromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
      sysToDate: moment().format("MM/DD/yyyy"),
      billingType: "",
      billingComment: "",
      billingTableData: [],
      billDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
      billedCustomer: "",
      customers: undefined,
      comment: "",
      billBank: 0,
      billCash: 0,
      billDiscount: 0,
      gstCharge: 0,
      voucher: "",
      openingBalanceType: undefined,
      openingBalance: undefined,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  if (action.type === CLEAR_VALUES) {
    return { ...state, ...action.payload };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
