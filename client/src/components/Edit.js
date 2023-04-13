import React,{useState,useEffect} from'react';
import {NavLink, useParams, useNavigate} from 'react-router-dom';



const Edit=()=>{

    
    const navigate = useNavigate("");
    
    const {id}=useParams("");
    console.log(id);
        
    const[inpval,setINp]=useState({
        name:"",
        age:"",
        work:"",
        email:"",
        mobile:"",
        address:"",
        desc:""
    });
    
    
        const setData=(e)=>{
            
            //console.log(e.target.value);
            //console.log(e.target.name);
            //const{name,value}=e.target
            setINp((preinpval)=>{
                    return {
                        ...preinpval,
                        [e.target.name]:e.target.value
                    }
            })
        }
   


  const getdata = async (e) => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    // console.log(data);
    if (res.status === 404 || !data) {
      //console.log("Error");
    }
    else {
      //setUserdata(data);
      update(data);
       
      console.log("data is added");
    }
  }

  const update=(data)=>{
    setINp(()=>{
        return{
        
            name:data[0].name,
            age:data[0].age,
            work:data[0].work,
            email:data[0].email,
            mobile:data[0].mobile,
            address:data[0].address,
            desc:data[0].desc

        }
    })
  }

  useEffect(() => {
    getdata();
  },[])

  const updateUser = async(e)=>{
    e.preventDefault();
    const {name, email, age, work, mobile, address, desc}=inpval;
    console.log(name);
    const res2 = await fetch(`/updateuser/${id}`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name, email, age, work, address, mobile, desc
        })
    })

    const data2 = await res2.json();
    console.log(data2);
    if(res2.status === 422 || !data2){
        alert("Fill the Data");
    }
    else{
        alert("Data is added");
        navigate("/");
        
    }
  }
    return(
        <div className="container" id="RegisterText">
            
        <NavLink to="/">Home Edit</NavLink>
        <form >
            <div className="row">
                <div className="col-lg-6 my-3">
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputEmail1 ">Name</label>
                        <input
                        onChange={setData}
                            type="text"
                            className="form-control  mt-2"
                            placeholder="Enter your Name"
                            name="name" value={inpval.name}
                            

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputEmail1 ">Age</label>
                        <input
                        onChange={setData}
                            type="number"
                            className="form-control mt-2"
                            placeholder="Enter email"
                            name="age" value={inpval.age}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputEmail1 ">Work</label>
                        <input
                        onChange={setData}
                            type="text"
                            className="form-control  mt-2"
                            placeholder="Enter email"
                            name="work" value={inpval.work}
                        />
                    </div>
                </div>
                <div className="col-lg-6 my-3">
                    <div className="form-group mt-lg-3">
                        <label htmlFor="exampleInputPassword1">Email</label>
                        <input
                        onChange={setData}
                            type="email"
                            className="form-control mt-2"
                            placeholder="Enter Password"
                            name="email" value={inpval.email}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1">Mobile</label>
                        <input
                        onChange={setData}
                            type="number"
                            className="form-control mt-2"
                            placeholder="Enter Password"
                            name="mobile" value={inpval.mobile}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1">Address</label>
                        <input
                        onChange={setData}
                            type="text"
                            className="form-control mt-2"
                            placeholder="Enter Password"
                            name="address" value={inpval.address}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <textarea
                        onChange={setData}
                            type="textarea"
                            className="form-control mt-2"
                            placeholder="Enter Password"
                            cols="30"
                            rows="5"
                            name="desc" value={inpval.desc}
                        />
                    </div>
                </div>

                <button type="submit" onClick={updateUser}className="btn btn-primary mt-3">
                    Submit
                </button>
            </div>
        </form>
    </div>
    )
}
export default Edit;