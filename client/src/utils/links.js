import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  // { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 1, text: "billing", path: "/", icon: <ImProfile /> },
  { id: 2, text: "Edit bills", path: "edit-bill", icon: <FaWpforms /> },
  { id: 3, text: "add customer", path: "add-customer", icon: <FaWpforms /> },
  { id: 4, text: "Edit customer", path: "edit-customer", icon: <FaWpforms /> },
  { id: 5, text: "profile", path: "profile", icon: <ImProfile /> },
  // { id: 6, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  // { id: 7, text: "add job", path: "add-job", icon: <FaWpforms /> },
];

export default links;
