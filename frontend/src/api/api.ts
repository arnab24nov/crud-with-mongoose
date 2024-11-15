const BASE_URL = "http://localhost:5000/api/employees";

type Employee = {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};

const handleResponse = (response: Response): Promise<unknown> => {
  if (!response.ok) {
    const errMsg = response.statusText;
    throw new Error(errMsg || "An error occureed.");
  }
  return response.json();
};

//get all employee details
export const getAllEmployeesDetails = async () => {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
};

//get employee details by ID
export const getEmployeeDetailsById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
};

//add new employee
export const addNewEmployee = async (empDetails: Employee) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(empDetails),
  });
  return handleResponse(res);
};

//update employee details
export const updateEmployeeDetails = async (
  id: string,
  empDetails: Employee
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(empDetails),
  });
  return handleResponse(res);
};

// remove an employee
export const removeEmployee = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};
