import React, {useState, useEffect} from 'react';
import { NavLink, useParams, useNavigate} from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ProfileImg from '../image/profile.png'

const Detail = () => {
    
  const [getuserdata, setUserdata] = useState([]);
   const navigate = useNavigate("");
 const {name}=useParams("");
console.log(name);


  const getdata = async (e) => {
    const res = await fetch(`/getuser/${name}`, {
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
      console.log("data found Detail Page");
  
    }
    
  }

  useEffect(() => {
    getdata();
    
  }, [])

  const deleteUser = async (id)=>{
    const res2 = await fetch(`/deleteuser/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json"
      }
    })

      const deletedata = await res2.json();
      console.log(deletedata);

      if(res2.status === 422 || !deletedata){
        console.log("Error");
      }
      else{
        console.log("Delete User");
        navigate("/");
      }
  }

    return (
        
        <div className='container mt-3' style={{ textAlign: 'left' }}>
            <h1 style={{ fontWeight: '700' }}>Welcome {getuserdata.length >0 && getuserdata[0].name} </h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className='add_btn'>
                        <img src={ProfileImg} style={{ width: 50, float: 'left' }} alt="Hello" />
                        

                        
                        <NavLink to={`/edit/${getuserdata.length >0 && getuserdata[0]._id}`}>
                            <button className="btn btn-primary mx-2">
                                <abbr title="Update"><BorderColorIcon /></abbr>
                            </button>
                        </NavLink>
                        <button className="btn btn-danger " onClick={()=> deleteUser(getuserdata.length >0 && getuserdata[0]._id)}>
                            <abbr title="Delete"><DeleteIcon /></abbr>
                        </button>
                    </div>
                    <div className='row'>
                        <div className='left_view col-lg-6 col-md-6 col-12'>
                            <h3 className='mt-3'>Name: <span>{getuserdata.length >0 && getuserdata[0].name}</span></h3>
                            <h3 className='mt-3'>Age: <span>{getuserdata.length >0 && getuserdata[0].age}</span></h3>
                            <p className='mt-3'><MailOutlineIcon />Email: <span>{getuserdata.length >0 && getuserdata[0].email}</span></p>
                            <p className='mt-3'><WorkIcon />Occupation: <span>{getuserdata.length >0 && getuserdata[0].work}</span></p>
                        </div>
                        <div className='right_view col-lg-6 col-md-6 col-12'>
                        <p className='mt-4'><PhoneIphoneIcon />Mobile: <span>{getuserdata.length >0 && getuserdata[0].mobile}</span></p>
                        <p className='mt-3'><LocationOnIcon />Location: <span>{getuserdata.length >0 && getuserdata[0].address}</span></p>
                        <p className='mt-3'>Description: <span>{getuserdata.length >0 && getuserdata[0].desc}</span></p>
                        </div>
                    </div>
                    

                </CardContent>
            </Card>

        </div>
        
    )
}
export default Detail;