import * as React from "react";
import { Routes, Route, Outlet, NavLink, Link, useParams } from "react-router-dom";
import "./App.css";

const App = () => {

  const users = [
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ];

  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>

      
      {/*{/* Using ROUTE COMPONENT AS CONTAINER for navigation.  
         Note: We will pass the Users list to User component */}          
      <Routes> 
         <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home /> } />

            {/* Because the Users component is passed users list as prop
             and iterates through the list it and create another path 
             when :userid is passed thereby making a dynamic route (or path).
             And because another path is created when we pass the :userid 
             we can nest it under a the "parent route" */}
            <Route path="users" element={<Users users={users} />}>
              <Route path=":userId" element={<User />} />
           </Route>

            <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
const NoMatch = () => {
  return (<p>There's nothing here: 404!</p>);
};

const Home = () => {
  return (
    <>
      <main style={{ padding: '1rem 0' }}>
        <h2>Welcome to the homepage!</h2>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>

       {/* We need the Outlet component to render a nested routes.
          we had to use the Outlet component in the parent route to render 
          the matched child route. In the this case the home route */}
      <Outlet />
    </>
  );
};


const About = () => {
  return (
    <>
    <main>
      <h2>About Page</h2>
      <p>
        That feels like an existential question, don't you
        think?
      </p>
    </main>
    <nav>
      <Link to="/home">Home</Link>
    </nav>
  </>

  );
};

// The Users component becomes a list component in React, because it 
// iterates over each user and returns JSX for it. In this case, it's a bit 
// more than a mere list, because we add a React Router's Link component 
//to the mix.
const Users = ({users}) => {

  return (
    <>
    <h2>Users</h2>

    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {/* Using the Link component we pass the userid to the path=users route.
              /users/${user.id} becomes a dynamic path because we iterate the list
          */}
          <Link to={`/users/${user.id}`}>
            {user.fullName}
          </Link>
        </li>
      ))}
    </ul>
      {/* We need the Outlet component here to render a nested routes.
        we had to use the Outlet component in the parent route to render 
        the matched child route. */}
      <Outlet />
  </>
  );
};

/* Next, we are going to create the missing User component which 
  gets nested via the Outlet in the Users component whenever a user's 
  identifier matches in the URL.*/
  const User = () => {
    const { userId } = useParams();
  
    return (
      <>
        <h2>User: {userId}</h2>
  
        <Link to="/users">Back to Users</Link>
      </>
    );
  };


//Move all App components implementation detail (headline, navigation) 
//to layout component
const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return(
    <>
      <h1>React Router</h1>
      <nav style={{borderBottom: 'solid 1px',  paddingBottom: '1rem', }}>
         <NavLink to="/home" style={style}>Home</NavLink>
         <NavLink to="/users" style={style}>Users</NavLink>
      </nav>

      <main style={{ padding: '1rem 0' }}>
        <Outlet />
      </main>

    </>
     
  );

}

export default App;
