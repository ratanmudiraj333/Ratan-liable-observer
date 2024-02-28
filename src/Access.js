import React,{useState, useEffect} from 'react';
import {Link, useNavigate } from "react-router-dom";
import './Access.css';


function Access()
{
    const [inputText, SetinputText] = useState("");
    const [inputText1, SetinputText1] = useState("");

    function handletext(event)
    {
        const newtext = event.target.value;
        SetinputText(newtext);
    }

    function handlepswd(event)
    {
        const newtext1 = event.target.value;
        SetinputText1(newtext1);
    }


let navigate = useNavigate(); 
function Click2()
{
    if (inputText === "ratan333" && inputText1 === "liableobserver3")
    {
    let path = `admin`; 
    navigate(path);
    }
    else
    {
        alert("Incorrect username/password");
    }
}
/*
let navigate = useNavigate(); 
const routeChange = () =>{ 
  let path = `admin`; 
  navigate(path);
}*/


    return(
        <div className='ahome'>
                <h1 className = "head1">Liable Observer<span className = "head2"> - Observe and share liabilities</span></h1>
        <div className='flex'>

<div className='flex1'>
<h3 style={{fontWeight : "bold"}}>Access portal</h3><br></br>
<h4>Login as Administrator</h4><br></br>
    <label for="uname"><b>Username</b></label><br></br>
    <input style={{width : "230px"}} type="text" placeholder="Enter Username" name="uname" value={inputText} onChange={handletext} required/><br></br>
<br></br>
    <label for="psw"><b>Password</b></label><br></br>
    <input style={{width : "230px"}} type="password" placeholder="Enter Password" name="psw" value={inputText1} onChange={handlepswd}  required />
<br></br><br></br>
<button type="submit" onClick={Click2}>Login</button><br></br><br></br>

    <h4>or</h4><br></br>

    <Link to="/observer"><button type="submit">Access as universal observer</button></Link>
</div>

        <div className='flex2'>
        <h4 className='ahome1'>Liable Observer is a portal where citizens can check liable elements around them. Citizens can submit new observations & Administrator will provide update on the status of the liability.</h4><br></br>
  <h4 className='home2'>We focus on 3 Liable elements:-</h4>
  <ul className='ahome3'>
    <li className='ahome3'>Pollution</li>
    <li className='ahome3'>Traffic Jam</li>
    <li className='ahome3'>Accident Prone areas</li>
  </ul>
  </div>
  </div>
        </div>
    );

}

export default Access;