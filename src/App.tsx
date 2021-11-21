import { NavLink, Outlet } from "react-router-dom";
import { orgName } from './constants';

export default function App() {
  return(
    <div>
      <h1>Welcome to the app!</h1>
      <h1>{!orgName ? 'Please set orgName in constants.tsx' : ''}</h1>
      <div>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem"
          }}
        >
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => {
                  return {
                    marginRight: '1rem',
                    color: isActive ? 'red' : '',
                  }
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/repositories"
                style={({ isActive }) => {
                  return {
                    marginRight: '1rem',
                    color: isActive ? 'red' : '',
                  }
                }}
              >
                GitHub repositories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
