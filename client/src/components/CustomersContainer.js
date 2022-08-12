import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Customer from "./Customer";
import Wrapper from "../assets/wrappers/CustomerContainer";
import PageBtnContainer from "./PageBtnContainer";

const CustomersContainer = () => {
  const {
    isLoading,
    numOfPages,
    page,
    customers,
    getCustomers,
    searchSubmit,
    getAllCustomers,
  } = useAppContext();

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    if (searchSubmit === true) {
      getCustomers();
    }
  }, [searchSubmit, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (customers.length === 0) {
    return (
      <Wrapper>
        <h2>No Customer to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {customers.length} customer{customers.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {customers.map((customer) => {
          return <Customer key={customer._id} {...customer} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default CustomersContainer;
