import EmployeeTable from '../../../components/EmployeeTable/EmployeeTable';

const EmployeeList = () => {
  return (
    <div>
      <h2>Current Employees</h2>
      {/* //avec localstorage// <EmployeeTable data={JSON.parse(localStorage.getItem('employees'))} /> */}
      <EmployeeTable />
    </div>
  );
};

export default EmployeeList;
