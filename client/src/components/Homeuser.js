import React, { useState, useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { addData } from "./context/ContextProvider";

const Homeuser = () => {

  const [getuserdata, setUserdata] = useState([]);
  const [udata, setUdata]= useContext(addData);
  //console.log("u data from homeuser", udata);
  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    //console.log(data);
    if (res.status === 404 || !data) {
      //console.log("Error");
    }
    else {
      setUserdata(data);
      console.log("data is added");
    }
  }

  useEffect(() => {
    getdata();
  }, [])

  const deleteUser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("Error");
    }
    else {
      console.log("Delete User");
      getdata();
    }
  }

  return (
    <>
      {
      udata?
        <>
        <p>Helllo</p>
        </> :""
      }
      <div className="mt-5">
        <div className="container ">
          <div className="add_btn mt-2">
            <NavLink to="/register"><button className="btn btn-primary "><AddIcon />Add User</button></NavLink>
          </div>
          <table className="table-responsive table mt-3 " >
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Mobile</th>
                <th scope="col">Work</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {
                getuserdata.length > 0 &&
                getuserdata.map((item, i) => {
                  return (
                    <>
                      <tr key={i}>
                        <th >{i + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.age}</td>
                        <td>{item.mobile}</td>
                        <td>{item.work}</td>
                        <td>{item.address}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`/detail/${item._id}`}>
                            <button className="btn btn-success" >
                              <abbr title="Edit" ><RemoveRedEyeIcon /></abbr>
                            </button></NavLink>
                          <NavLink to={`/edit/${item._id}`}><button className="btn btn-primary">
                            <abbr title="Update"><BorderColorIcon /></abbr>
                          </button></NavLink>

                          <button className="btn btn-danger" onClick={() => deleteUser(item._id)}>
                            <abbr title="Delete"><DeleteIcon /></abbr>
                          </button>
                        </td>
                      </tr>
                    </>)
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Homeuser;
