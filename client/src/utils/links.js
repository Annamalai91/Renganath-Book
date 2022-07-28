import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "billing", path: "billing", icon: <ImProfile /> },
  { id: 3, text: "Edit bills", path: "edit-bill", icon: <FaWpforms /> },
  { id: 4, text: "add customer", path: "add-customer", icon: <FaWpforms /> },
  { id: 5, text: "Edit customer", path: "edit-customer", icon: <FaWpforms /> },
  { id: 6, text: "profile", path: "profile", icon: <ImProfile /> },
  // { id: 6, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  // { id: 7, text: "add job", path: "add-job", icon: <FaWpforms /> },
];

export default links;
