import { useAppContext } from "../context/appContext";
import { useEffect, forwardRef, useRef } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import { ReadOnyTable } from "../components";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

const BillsViewContainer = forwardRef(({ report }, ref) => {
  const {
    isLoading,
    bills,
    getBills,
    searchSubmit,
    deleteBill,
    setEditBill,
    user,
    getAllBills,
    openingBalance,
    openingBalanceType,
  } = useAppContext();

  const role = user && user.role;

  useEffect(() => {
    getAllBills();
  }, []);

  useEffect(() => {
    if (searchSubmit === true) {
      getBills();
    }
  }, [searchSubmit]);

  const componentRef = useRef();

  const handlePrintMain = (e) => {
    e.preventDefault();
    handlePrint();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let billTableData =
    bills &&
    bills.map((bill) => {
      const newBill = {
        ...bill,
        id: bill._id,
        billStatus: bill.status,
        billDate: moment(bill.billDate).format("MM/DD/yyyy"),
        sysDate: moment(bill.createdAt).format("MM/DD/yyyy"),
        customerPhone: bill.phone,
        customerCity: bill.city,
        credit: 0,
        debit: 0,
      };

      if (bill.billType === "Sales" || bill.billType === "Payments") {
        newBill["debit"] = bill.grandTotal;
      } else {
        newBill["credit"] = bill.grandTotal;
      }
      return newBill;
    });

  billTableData = billTableData ? billTableData : [];

  const totalCreditCurrent = billTableData
    .map((bill) => bill.credit)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const totalDebitCurrent = billTableData
    .map((bill) => bill.debit)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const currentTotal = totalDebitCurrent - totalCreditCurrent;

  const closingBalance = Math.abs(currentTotal + openingBalance);

  const closingBalanceType =
    report === "Customer Report" && openingBalanceType
      ? closingBalance > 0
        ? "debit"
        : "credit"
      : undefined;

  const customerReportBillTableColumns = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Entry Date",
    },
    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Customer Name",
    },
    {
      id: "billType",
      numeric: false,
      disablePadding: false,
      label: "Entry Type",
    },
    {
      id: "voucher",
      numeric: true,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "debit",
      numeric: true,
      disablePadding: false,
      label: "Debit",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      label: "Credit",
    },
  ];

  const reportBillTableColumns = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Entry Date",
    },

    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Customer Name",
    },
    {
      id: "billType",
      numeric: false,
      disablePadding: false,
      label: "Entry Type",
    },
    {
      id: "voucher",
      numeric: true,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "customerCity",
      numeric: false,
      disablePadding: false,
      label: "City",
    },
    {
      id: "debit",
      numeric: true,
      disablePadding: false,
      label: "Debit",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      label: "Credit",
    },

    {
      id: "sysDate",
      numeric: false,
      disablePadding: false,
      label: "System Date",
    },
  ];

  const billTableColumns = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Entry Date",
    },

    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Customer Name",
    },
    {
      id: "billType",
      numeric: false,
      disablePadding: false,
      label: "Entry Type",
    },
    {
      id: "voucher",
      numeric: true,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "phone",
      numeric: true,
      disablePadding: false,
      label: "Phone",
    },
    {
      id: "customerCity",
      numeric: false,
      disablePadding: false,
      label: "City",
    },
    {
      id: "debit",
      numeric: true,
      disablePadding: false,
      label: "Debit",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      label: "Credit",
    },

    {
      id: "sysDate",
      numeric: false,
      disablePadding: false,
      label: "System Date",
    },
    {
      id: "action",
      disablePadding: false,
      label: "Actions",
      numeric: true,
    },
  ];

  const billTableColumnsPrint = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Entry Date",
    },

    {
      id: "customerName",
      numeric: false,
      disablePadding: false,
      label: "Customer Name",
    },
    {
      id: "billType",
      numeric: false,
      disablePadding: false,
      label: "Entry Type",
    },
    {
      id: "voucher",
      numeric: true,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "customerCity",
      numeric: false,
      disablePadding: false,
      label: "City",
    },
    {
      id: "debit",
      numeric: true,
      disablePadding: false,
      label: "Debit",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      label: "Credit",
    },
    {
      id: "sysDate",
      numeric: false,
      disablePadding: false,
      label: "System Date",
    },
  ];

  const reportBillTableColumnsPrint = [
    {
      id: "billDate",
      numeric: false,
      disablePadding: false,
      label: "Entry Date",
    },
    {
      id: "billType",
      numeric: false,
      disablePadding: false,
      label: "Entry Type",
    },
    {
      id: "voucher",
      numeric: true,
      disablePadding: false,
      label: "Voucher",
    },
    {
      id: "customerCity",
      numeric: false,
      disablePadding: false,
      label: "City",
    },
    {
      id: "debit",
      numeric: true,
      disablePadding: false,
      label: "Debit",
    },
    {
      id: "credit",
      numeric: true,
      disablePadding: false,
      label: "Credit",
    },
    {
      id: "sysDate",
      numeric: false,
      disablePadding: false,
      label: "System Date",
    },
  ];

  const statusCell = {
    id: "billStatus",
    numeric: false,
    disablePadding: false,
    label: "Status",
  };

  const createdBy = {
    id: "billCreatedBy",
    numeric: false,
    disablePadding: false,
    label: "Created By",
  };

  if (role === "admin") {
    billTableColumns.splice(9, 0, statusCell);
    reportBillTableColumns.splice(9, 0, statusCell);
    billTableColumns.splice(10, 0, createdBy);
    reportBillTableColumns.splice(10, 0, createdBy);
  }

  // If it is Reports page, then reportBillTableColumn
  //If it is Customer Report Column, then it is customerReportBillTableCoumns
  //If it is EditBills, then it is billTableColumns
  const headCells =
    report === "Report"
      ? reportBillTableColumns
      : report === "Customer Report"
      ? customerReportBillTableColumns
      : billTableColumns;
  const headPrintCells =
    report === "Report"
      ? reportBillTableColumnsPrint
      : report === "Customer Report"
      ? customerReportBillTableColumns
      : billTableColumnsPrint;

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div ref={componentRef}>
      <Wrapper>
        <ReadOnyTable
          billTableColumnsPrint={headPrintCells}
          headCells={headCells}
          rows={billTableData}
          deleteBill={deleteBill}
          setEditBill={setEditBill}
          handlePrintMain={handlePrintMain}
          role={role}
          openingBalance={openingBalance}
          openingBalanceType={openingBalanceType}
          report={report}
          closingBalance={closingBalance}
          closingBalanceType={closingBalanceType}
        />
      </Wrapper>
    </div>
  );
});

export default BillsViewContainer;
