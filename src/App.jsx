import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Notfound from "./components/Notfound/Notfound";
import { Navbar } from "react-bootstrap";
import NavbarComp from "./components/Navbar/NavbarComp";
import Note from "./components/Note/Note";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {

 let routing= createBrowserRouter([
    {path:"",element:<Layout></Layout> , children:[
      {index:true , element:<Home></Home>},
      {path:"register" , element :<Register></Register>},
      {path:"login" , element :<Login></Login>},

  ]}
  ])

  return (
    <>

<RecoilRoot>
<RouterProvider router={routing} ></RouterProvider>
</RecoilRoot>

    </>
  );
}

export default App;
