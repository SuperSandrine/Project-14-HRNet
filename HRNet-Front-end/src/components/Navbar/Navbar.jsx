import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/employee/create">Create employee</NavLink>
      <NavLink to="/employee/list">Employee(s) list</NavLink>
    </nav>
  );
};

export default Navbar;
