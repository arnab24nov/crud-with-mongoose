import React, { useEffect, useState } from "react";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeDetailsById,
  addNewEmployee,
  updateEmployeeDetails,
} from "../api/api";

interface Employee {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const AddEmployee: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Employee>({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    if (params.id) {
      fetchEmployeeById(params.id);
    }
  }, [params.id]);

  const fetchEmployeeById = async (id: string) => {
    try {
      const empDetails = await getEmployeeDetailsById(id);
      setFormData(empDetails as Employee);
    } catch (error) {
      console.error("ERROR in fetching an employee: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log("Form Submitted:", formData);
      if (params.id) {
        await updateEmployeeDetails(params.id, formData);
        navigate("/");
      } else {
        await addNewEmployee(formData);
      }
      setFormData({ name: "", email: "", gender: "", status: "" });
    } catch (error) {
      console.error("ERROR in adding/updating employee: ", error);
    }
  };

  return (
    <div>
      <Link to={"/"}>
        <button className="ml-10 -mt-2 px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600">
          <TbArrowBackUpDouble className="mr-1 inline" />
          <span className="font-semibold">All Employees</span>
        </button>
      </Link>
      <div className="w-2/5 min-w-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-teal-200 rounded-lg">
        <div className="bg-teal-500 h-10 flex justify-start items-center font-bold text-white text-xl px-4 rounded-t-lg">
          Add Employee
        </div>
        <form onSubmit={handleSubmit} method="post" className="p-8 text-[#555]">
          {/* name */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-[#999]">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full outline-none"
            />
          </div>
          {/* email */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-[#999]">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full outline-none"
            />
          </div>
          {/* gender */}
          <div className="mb-4 flex">
            <label className="mr-8 font-medium text-[#999]">Gender</label>
            <div className="flex items-center">
              <label htmlFor="male" className="mr-4 font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  id="male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label htmlFor="female" className="font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  id="female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>
          {/* status */}
          <div className="mb-4 flex">
            <label className="mr-8 font-medium text-[#999]">Status</label>
            <div className="flex items-center">
              <label htmlFor="active" className="mr-4 font-medium">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  id="active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Active
              </label>
              <label htmlFor="female" className="font-medium">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  id="inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Inactive
              </label>
            </div>
          </div>
          {/* submit button */}
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
