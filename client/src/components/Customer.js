import moment from "moment";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Customer";
import CustomerInfo from "./CustomerInfo";

const Customer = ({ _id, name, phone, city, comment, createdAt }) => {
  const { setEditCustomer, deleteCustomer, user } = useAppContext();
  const role = user && user.role;

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{phone}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <CustomerInfo icon={<FaLocationArrow />} text={city} />
          <CustomerInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer>
          {role === "admin" ? (
            <div className="actions">
              <Link
                style={{ pointerEvents: role !== "admin" ? "none" : "" }}
                to="/add-customer"
                className="btn edit-btn"
                onClick={() => setEditCustomer(_id)}
              >
                Edit
              </Link>
              <button
                style={{ pointerEvents: role !== "admin" ? "none" : "" }}
                type="button"
                className="btn delete-btn"
                onClick={() => deleteCustomer(_id, name)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Customer;
