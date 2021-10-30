import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link} from 'react-router-dom';
 
function ActorsDetail()
{
  const [search,setSearch] =useState('');
  const [record,setRecord] = useState([]);
 
  const [user, setUser] = useState({
    actor_id:"",
    first_name: "",
    last_name: "",
  });
  
    //  Object Destructuring 
    const { actor_id, first_name, last_name} = user;
    const onInputChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
     
    // On Page load display all records 
    const loadActorDetail = async () =>  
    {
        const endpoint='http://localhost:3000/actors';
       fetch(endpoint)
         .then(function(response){
            return response.json();
          })
         .then(function(myJson) {
            setRecord(myJson);
          });
    }
    useEffect(() => {
        loadActorDetail();
    }, []);
 
    // Insert Records 
    const submitActorRecord = async (e) => {
        
        e.preventDefault();
        e.target.reset();
        try {
            console.log("user", user);
            await axios.post("http://localhost:3000/actors",user);    
        } catch (error) {
            console.log(error)
        }
        
        alert('Data Inserted');
         
        loadActorDetail();
    };
     
    //Search Records here 
    const searchRecords = () =>
    {
        axios.get(`http://localhost:3000/actors/searchRecord/${search}`)
        .then(response => {
          setRecord(response.data);
        });
        // loadCustomerDetail();

    }
    const loadRecordAgain = () =>
    {
      var response = fetch('http://localhost:3000/actors')
      .then(function(response){
         return response.json();
       })
      .then(function(myJson) {
         setRecord(myJson);
       });
         
    }
    useEffect(() => {
      loadRecordAgain();
    }, []);
    // const [APIData, setAPIData] = useState([])
    // useEffect(() => {
    //     axios.get(`https://jsonplaceholder.typicode.com/users`)
    //         .then((response) => {
    //             setAPIData(response.data);
    //         })
    // }, [])
    // Delete Record
   
    const deleteRecord = (productId) =>
    {
      axios.delete(`http://localhost:3000/actors/${productId}`)
      .then((result)=>{
        loadActorDetail();
      })
      .catch(()=>{
        alert('Error in the Code');
      });
    };
 
  return(
    <section>  
     <nav class="navbar navbar-expand-lg navbar-light bg-dark">
     <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
       {/* <li class="nav-item active ">
          sssssssss
        </li> */}
        <li class="nav-item active">
          <a class="nav-link text-white" href="">Customer </a>
        </li>
       <li class="nav-item">
          <a class="nav-link text-white" href="">Actor</a>
      </li>
       {/* <li class="nav-item">
          <a class="nav-link text-white" href="#">Address</a>
       </li>
       <li class="nav-item">
          <a class="nav-link text-white" href="#">Contact</a>
       </li> */}
       {/* <span class="sr-only">(current)</span> */}
      </ul>
     </div>
    </nav>   
    <div class="container">  
    <h4 className="mb-3 text-center mt-4">CRUD on My APP</h4>
      <div class="row mt-3">
       <div class="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={submitActorRecord}> 
            <h5 className="mb-3 ">Insert Actor Records</h5>
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="actor_id"   value={actor_id} onChange={e => onInputChange(e)} placeholder="Enter actor ID" required=""/>
                </div>
                  
                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="first_name" value={first_name} onChange={e => onInputChange(e)}  placeholder="Enter First Name" required=""/>
                </div>

                <div class="form-group">
                   <input type="text" class="form-control  mb-4" name="last_name" value={last_name} onChange={e => onInputChange(e)}  placeholder="Enter Last Name" required=""/>
                </div>
     
                <button type="submit" class="btn btn-primary btn-block mt-4">Insert Record</button>
             </form>
        </div>
      </div>
      <div class="col-sm-8">
        <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>
        <div class="input-group mb-4 mt-3">
          <div class="form-outline">
           <input 
           type="text" 
           id="form1" 
           onKeyDown={loadRecordAgain}
           onKeyUp={searchRecords}
           onChange={(e)=>setSearch(e.target.value)} 
           class="form-control" 
           placeholder="Search Employee Here" 
           style={{backgroundColor:"#ececec"}}/>
        
        </div>  
        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>Actor ID</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
     
            {record.map((name)=>
                <tr>
                <td>{name.actor_id}</td>
                <td>{name.first_name}</td>
                <td>{name.last_name}</td>
                <td>
                      <a  className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete "+ name.first_name
                          )
                          if (confirmBox === true) {
                            deleteRecord(name.actor_id)
                          }
                        }}
                        >
                        <i class="fa fa-trash" style={{fontSize:"18px",marginRight:"5px"}}></i> </a>
                   
                    <Link class=" mr-2" to={`/EditActor/${name.actor_id}`}>
                       <i class="fa fa-edit" aria-hidden="true"></i> 
                    </Link>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
      </div>
    </div>
    </div>
   </section>
  )
}
 
export default ActorsDetail;