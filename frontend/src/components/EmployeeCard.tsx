import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

interface Employee {
  _id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface EmployeeCardProps {
  employeeDetails: Employee;
  isOdd: boolean;
  empNo: number;
  onDelete: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employeeDetails,
  isOdd,
  empNo,
  onDelete,
}) => {
  return (
    <tr className={isOdd ? "bg-[#fff]" : "bg-[#ddd]"}>
      <td className="p-3">{empNo}</td>
      <td className="p-3">{employeeDetails.name}</td>
      <td className="p-3">{employeeDetails.email}</td>
      <td className="p-3">{employeeDetails.gender}</td>
      <td className="p-3">{employeeDetails.status}</td>
      <td className="p-3">
        <Link to={`/edit_employee/${employeeDetails._id}`}>
          <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            <MdModeEdit />
          </button>
        </Link>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDelete(employeeDetails._id)}
        >
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default EmployeeCard;
