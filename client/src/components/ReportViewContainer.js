import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import { ReportTable } from ".";
import moment from "moment";

const ReportViewContainer = ({ handlePrintMain, report }) => {
  const {
    isLoading,
    bills,
    getBills,
    searchSubmit,
    deleteBill,
    setEditBill,
    getAllBills,
    user,
    openingBalance,
    openingBalanceType,
  } = useAppContext();

  const role = user.role;

  useEffect(() => {
    if (report !== "customerReport") {
      getAllBills();
    }
  }, []);

  useEffect(() => {
    if (searchSubmit === true) {
      getBills();
    }
  }, [searchSubmit]);

  let billTableData =
    bills &&
    bills.map((bill) => {
      const newBill = {
        ...bill,
        id: bill._id,
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
  ];

  const billTableColumnsPrint = [
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

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div>
      <Wrapper>
        <ReportTable
          billTableColumnsPrint={billTableColumnsPrint}
          headCells={billTableColumns}
          rows={billTableData}
          deleteBill={deleteBill}
          setEditBill={setEditBill}
          handlePrintMain={handlePrintMain}
          role={role}
          openingBalance={openingBalance}
          openingBalanceType={openingBalanceType}
          report={report}
        />
      </Wrapper>
    </div>
  );
};

export default ReportViewContainer;
