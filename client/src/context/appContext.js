import React, { useReducer, useContext } from "react";
import moment from "moment";
import { nanoid } from "nanoid";
import reducer from "./reducer";

import axios from "axios";
import {
  DISPLAY_ALERT,
  FINISH_EDITING,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  DELETE_CUSTOMER_SUCCESS,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  HANDLE_CUSTOMER_CHANGE,
  CREATE_CUSTOMER_BEGIN,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  CREATE_BILL_BEGIN,
  CREATE_BILL_SUCCESS,
  CREATE_BILL_ERROR,
  ADD_BILLING_TABLE_DATA,
  GET_CUSTOMERS_BEGIN,
  GET_CUSTOMERS_SUCCESS,
  SET_EDIT_CUSTOMER,
  DELETE_CUSTOMER_BEGIN,
  EDIT_CUSTOMER_BEGIN,
  EDIT_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_ERROR,
  CLEAR_CUSTOMER_FILTERS,
  UPDATE_BILLING_TABLE_DATA,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  HANDLE_SUBMIT_SEARCH,
  GET_BILLS_BEGIN,
  GET_BILLS_SUCCESS,
  DELETE_BILL_BEGIN,
  DELETE_BILL_ERROR,
  SET_EDIT_BILL,
  EDIT_BILL_BEGIN,
  EDIT_BILL_SUCCESS,
  EDIT_BILL_ERROR,
  DELETE_CUSTOMER_ERROR,
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
  CLEAR_PRODUCT_FILTERS,
  CREATE_PRODUCT_ERROR,
  EDIT_PRODUCT_BEGIN,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  customers: [],
  products: [],
  totalJobs: 0,
  totalCustomers: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "",
  sortOptions: ["Latest", "Oldest", "Ascending", "Descending"],
  billingOptions: ["", "Sales", "Purchase", "Receipt", "Payments"],
  billStatusOptions: ["All", "Active", "Deleted"],
  billStatus: "Active",
  billCreatedBy: "",
  billingType: "",
  billingComment: "",
  billingTableData: [],
  billDate: moment().format("MM/DD/yyyy"),
  name: "",
  phone: "",
  comment: "",
  city: "",
  searchSubmit: false,
  fromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
  toDate: moment().format("MM/DD/yyyy"),
  sysFromDate: moment().subtract(1, "month").format("MM/DD/yyyy"),
  sysToDate: moment().format("MM/DD/yyyy"),
  gstCharge: 0,
  billDiscount: 0,
  bills: undefined,
  billBank: 0,
  billCash: 0,
  voucher: "",
  openingBalanceType: undefined,
  openingBalance: undefined,
  productName: "",
  unitsOfMeasure: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (alert = "Please provide all the required input !") => {
    dispatch({ type: DISPLAY_ALERT, payload: { alert } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 7000);
  };

  const handleSubmitSearch = () => {
    dispatch({ type: HANDLE_SUBMIT_SEARCH });
  };

  const setHandleSubmitSearchtrue = () => {
    dispatch({ type: HANDLE_SUBMIT_SEARCH });
  };

  const finishEditing = () => dispatch({ type: FINISH_EDITING });

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const clearValues = (fields) => {
    dispatch({ type: CLEAR_VALUES, payload: fields });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const createBillingDataObj = (
    productName,
    unitsOfMeasurement,
    quantity,
    price,
    total
  ) => {
    return {
      id: nanoid(),
      productName,
      unitsOfMeasurement,
      quantity,
      price,
      total,
    };
  };

  const addBillingDataRow = (billingTableData) => {
    const newRow = createBillingDataObj("", "", "0", "0", "0");
    billingTableData.push(newRow);
    dispatch({ type: ADD_BILLING_TABLE_DATA, payload: { billingTableData } });
  };

  const handleCustomerChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CUSTOMER_CHANGE, payload: { name, value } });
  };

  const createCustomer = async () => {
    dispatch({ type: CREATE_CUSTOMER_BEGIN });
    try {
      const { name, phone, city, comment } = state;
      await authFetch.post("/customers", {
        name,
        phone,
        city,
        comment,
      });
      dispatch({ type: CREATE_CUSTOMER_SUCCESS });
      dispatch({ type: CLEAR_CUSTOMER_FILTERS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createProduct = async (fieldValues) => {
    dispatch({ type: CREATE_PRODUCT_BEGIN });
    try {
      const { unitsOfMeasure, productName } = state;
      await authFetch.post("/products", {
        productName,
        unitsOfMeasure,
      });
      dispatch({ type: CREATE_PRODUCT_SUCCESS });
      clearValues(fieldValues);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const calculateTotal = (
    billingTableData,
    gstCharge,
    billDiscount,
    billBank,
    billCash
  ) => {
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

  const editBill = async () => {
    dispatch({ type: EDIT_BILL_BEGIN });

    try {
      const {
        billDate,
        editBillId,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        gstCharge,
        billDiscount,
        billBank,
        billCash,
      } = state;
      const grandTotal = calculateTotal(
        billingTableData,
        gstCharge,
        billDiscount,
        billBank,
        billCash
      );

      await authFetch.patch(`/billings/${state.editBillId}`, {
        billDate,
        editBillId,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        gstCharge,
        bank: billBank,
        cash: billCash,
        grandTotal,
        billDiscount,
      });
      dispatch({ type: EDIT_BILL_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_BILL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const createBill = async (phone, city) => {
    dispatch({ type: CREATE_BILL_BEGIN });
    try {
      const {
        billDate,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        gstCharge,
        billDiscount,
        billBank,
        billCash,
      } = state;

      const grandTotal = calculateTotal(
        billingTableData,
        gstCharge,
        billDiscount,
        billBank,
        billCash
      );

      await authFetch.post("/billings", {
        billDate,
        billedCustomer,
        billingComment,
        billingTableData,
        billingType,
        phone,
        city,
        gstCharge,
        billDiscount,
        grandTotal,
        bank: billBank,
        cash: billCash,
      });
      dispatch({ type: CREATE_BILL_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_BILL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAllCustomers = async () => {
    const { sort, page } = state;

    const url = `/customers?sort=${sort}&page=${page}&all=true`;

    dispatch({ type: GET_CUSTOMERS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { customers } = data;
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: {
          customers,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllProducts = async () => {
    const { sort, page } = state;

    const url = `/products?sort=${sort}&page=${page}&all=true`;

    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { products } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getCustomers = async () => {
    const { name, phone, city, sort, page } = state;

    let url = `/customers?sort=${sort}&page=${page}`;
    if (phone || name || city) {
      url = url + `&name=${name}&phone=${phone}&city=${city}`;
    }
    dispatch({ type: GET_CUSTOMERS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { customers, totalCustomers, numOfPages } = data;
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: {
          customers,
          totalCustomers,
          numOfPages,
        },
      });
      dispatch({ type: HANDLE_SUBMIT_SEARCH_FINISHED });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getProducts = async () => {
    const { productName, unitsOfMeasure, sort, page } = state;

    let url = `/products?sort=${sort}&page=${page}`;
    if (productName || unitsOfMeasure) {
      url =
        url + `&productName=${productName}&unitsOfMeasure=${unitsOfMeasure}`;
    }
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { products, totalProducts, numOfPages } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts,
          numOfPages,
        },
      });
      dispatch({ type: HANDLE_SUBMIT_SEARCH_FINISHED });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllBills = async () => {
    const { sort, fromDate, toDate, sysFromDate, sysToDate, user } = state;
    const role = user && user.role;

    let url = `/billings?sort=${sort}&fromDate=${fromDate}&toDate=${toDate}&sysFromDate=${sysFromDate}&sysToDate=${sysToDate}&role=${role}&status=Active`;

    dispatch({ type: GET_BILLS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { bills, totalBills } = data;

      dispatch({
        type: GET_BILLS_SUCCESS,
        payload: {
          bills,
          totalBills,
        },
      });
      dispatch({ type: HANDLE_SUBMIT_SEARCH_FINISHED });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getBills = async () => {
    const {
      billedCustomer,
      phone,
      city,
      sort,
      billingType,
      fromDate,
      toDate,
      sysFromDate,
      sysToDate,
      voucher,
      user,
      billStatus,
      billCreatedBy,
    } = state;
    const customerName = billedCustomer && billedCustomer.label;
    const role = user && user.role;

    let url = `/billings?sort=${sort}&fromDate=${fromDate}&toDate=${toDate}&voucher=${voucher}&role=${role}&status=${billStatus}`;
    if (
      phone ||
      customerName ||
      city ||
      billingType ||
      sysFromDate ||
      sysToDate ||
      billCreatedBy
    ) {
      url =
        url +
        `&billedCustomer=${customerName}&phone=${phone}&city=${city}&billingType=${billingType}&sysFromDate=${sysFromDate}&sysToDate=${sysToDate}&createdBy=${billCreatedBy}`;
    }
    dispatch({ type: GET_BILLS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { bills, totalBills, openingBalance, openingBalanceType } = data;
      dispatch({
        type: GET_BILLS_SUCCESS,
        payload: {
          bills,
          totalBills,
          openingBalance,
          openingBalanceType,
        },
      });
      dispatch({ type: HANDLE_SUBMIT_SEARCH_FINISHED });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditCustomer = (id) => {
    dispatch({ type: SET_EDIT_CUSTOMER, payload: { id } });
  };
  const setEditProduct = (id) => {
    dispatch({ type: SET_EDIT_PRODUCT, payload: { id } });
  };
  const setEditBill = (id) => {
    dispatch({ type: SET_EDIT_BILL, payload: { id } });
  };

  const editCustomer = async () => {
    dispatch({ type: EDIT_CUSTOMER_BEGIN });

    try {
      const { name, phone, city, comment } = state;
      await authFetch.patch(`/customers/${state.editJobId}`, {
        name,
        phone,
        city,
        comment,
      });
      dispatch({ type: EDIT_CUSTOMER_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const editProduct = async () => {
    dispatch({ type: EDIT_PRODUCT_BEGIN });

    try {
      const { productName, unitsOfMeasure } = state;
      await authFetch.patch(`/products/${state.editJobId}`, {
        productName,
        unitsOfMeasure,
      });
      dispatch({ type: EDIT_PRODUCT_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteCustomer = async (customerId, name) => {
    dispatch({ type: DELETE_CUSTOMER_BEGIN });
    try {
      await authFetch.delete(`/customers/${customerId}/?name=${name}`);
      dispatch({ type: DELETE_CUSTOMER_SUCCESS });
      getCustomers();
    } catch (error) {
      dispatch({
        type: DELETE_CUSTOMER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteProduct = async (productId, name) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN });
    try {
      await authFetch.delete(`/products/${productId}/?name=${name}`);
      dispatch({ type: DELETE_PRODUCT_SUCCESS });
      getProducts();
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteBill = async (billId) => {
    dispatch({ type: DELETE_BILL_BEGIN });
    try {
      await authFetch.delete(`/billings/${billId}`);
      dispatch({ type: DELETE_BILL_SUCCESS });

      getBills();
    } catch (error) {
      dispatch({ type: DELETE_BILL_ERROR });
      // logoutUser();
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const clearCustomerFilters = () => {
    dispatch({ type: CLEAR_CUSTOMER_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const handleDeleteRowBillingData = (id) => {
    const newBillingTableData = state.billingTableData.filter(
      (billingTableData) => {
        return id !== billingTableData.id;
      }
    );
    dispatch({
      type: UPDATE_BILLING_TABLE_DATA,
      payload: { newBillingTableData },
    });
  };

  const handleSaveRowBillingData = (id, formData, setEditBillingId) => {
    const newBillingTableData = state.billingTableData.map(
      (billingTableData) => {
        let newFormData = { ...billingTableData };
        if (id === newFormData.id) {
          newFormData = { ...formData };
        }
        return newFormData;
      }
    );
    dispatch({
      type: UPDATE_BILLING_TABLE_DATA,
      payload: { newBillingTableData },
    });
    setEditBillingId(null);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        createCustomer,
        handleCustomerChange,
        getCustomers,
        setEditCustomer,
        setEditBill,
        deleteCustomer,
        editCustomer,
        clearCustomerFilters,
        clearFilters,
        changePage,
        addBillingDataRow,
        handleDeleteRowBillingData,
        handleSaveRowBillingData,
        createBill,
        handleSubmitSearch,
        getBills,
        deleteBill,
        editBill,
        getAllCustomers,
        setHandleSubmitSearchtrue,
        getAllBills,
        finishEditing,
        clearValues,
        setEditProduct,
        getProducts,
        deleteProduct,
        getAllProducts,
        createProduct,
        editProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
