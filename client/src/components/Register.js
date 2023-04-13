import React,{useState, useContext} from "react";
import "../App.css";
import { NavLink , useNavigate} from "react-router-dom";
import { addData } from "./context/ContextProvider";


 const Register = () => {
    const[udata, setUdata] = useContext(addData);
    
    const Navigate = useNavigate();

  const [inpval,setINp]=useState({
    name:"",
    age:"",
    work:"",
    email:"",
    mobile:"",
    address:"",
    desc:""
  })

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

    const addinpdata=async(e)=>{
        e.preventDefault();
        const { name,age,work,email,mobile,address,desc}=inpval;
        const res =await fetch("/register",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,age,work,email,mobile,address,desc
            })
        })
        const data= await res.json();
        console.log(data);
        if(res.status === 404 || !data){
            alert("Error");
            console.log("Error");
        }
        else{
            alert("data is added");
            updateState(true);
            Navigate("/");
           
            clearform();
        }

    }

    const clearform=(e)=>{

        setINp(()=>{
           return{
            name:"",
            age:"",
            work:"",
            email:"",
            mobile:"",
            address:"",
            desc:""
           }
    })
}

const updateState = (i)=>{
  setUdata(i);
}
        
    

    return (
        <div className="container" id="RegisterText">
            <NavLink to="/">Home</NavLink>
            <form  onSubmit={addinpdata}>
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

                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                    <button type="reset" onClick={clearform} className="btn btn-primary mt-3">
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
