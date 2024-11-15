import { FaUser } from "react-icons/fa";
import EmployeeCard from "./EmployeeCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEmployeesDetails, removeEmployee } from "../api/api";

interface Employee {
  _id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    fetchEmployeesDetails();
  }, []);

  // fetch all employees
  const fetchEmployeesDetails = async () => {
    try {
      const data = await getAllEmployeesDetails();
      setEmployees(data as Employee[]);
    } catch (error) {
      console.error("ERROR in fetching employees details: ", error);
    }
  };

  //removing employee
  const handleDelete = async (id: string) => {
    try {
      const res = await removeEmployee(id);
      if (res) {
        fetchEmployeesDetails();
      }
    } catch (error) {
      console.error("ERROR in deleting employee: ", error);
    }
  };

  return (
    <>
      <div className="w-[75%] mx-auto">
        <Link to={"/add_employee"}>
          <button className="mb-2 px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600">
            <span className="font-semibold">New Employee</span>
            <FaUser className="ml-1 inline" />
          </button>
        </Link>
        <div className="w-full max-h-[570px] rounded-lg overflow-auto">
          <table className="w-full">
            <thead className="w-full sticky top-0">
              <tr className="bg-teal-600 text-white text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((el, i) => (
                <EmployeeCard
                  key={el._id}
                  employeeDetails={el}
                  empNo={i + 1}
                  isOdd={i % 2 === 0}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
