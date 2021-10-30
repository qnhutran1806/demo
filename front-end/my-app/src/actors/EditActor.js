import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
 
const EditActor = () => {
   
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  
 
  const [user ,setUser] = useState({
     
      first_name:"",
      last_name:"",
  })
 
 
  const {first_name, last_name } = user;
 
  const onInputChange = e => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateActor = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/actors/${id}`, user);
    history.push("/");
  };
 
  const loadUser =  () => {
    fetch(`http://localhost:3000/actors/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
        setUser({
                    id: id,
                    update: true,
                    first_name: result.response[0].first_name,
                    last_name: result.response[0].last_name,
                   
 
                });
            })
            .catch((error) => console.log("error", error));
  };
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Edit A Ator</h4>
       
          {/* <h5 className="text-success">Customer ID : {user.customer_id} </h5> */}
          {/* <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Store ID"
              name="store_id"
              value={store_id}
              onChange={e => onInputChange(e)}
            />
          </div> */}
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="first_name"
              value={first_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="last_name"
              value={last_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          {/* <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Address ID"
              name="address_id"
              value={address_id}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter active"
              name="active"
              value={active}
              onChange={e => onInputChange(e)}
            />
          </div> */}
          <button onClick={updateActor} className="btn btn-secondary btn-block">Update</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditActor;