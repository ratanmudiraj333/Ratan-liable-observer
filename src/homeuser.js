import React,{useState, useEffect} from 'react';
import './louser.css';

//Add API base
const API_BASE= 'http://localhost:4000/lo';

function Homeuser()
{

    const [inputText, SetinputText] = useState("");
    const [inputText1, SetinputText1] = useState("");
    const [inputText2, SetinputText2] = useState("");
    const [inputText3, SetinputText3] = useState("");
    const [inputText4, SetinputText4] = useState("");
    const [inputText5, SetinputText5] = useState("Inprogress");
    const [editinputText5, editSetinputText5] = useState("");
    const [inputTexttype, SetinputTexttype] = useState("");
    const [inputFile, setInputFile] = useState();
    const [items, Setitems] = useState([]);

    const [itemst, Setitemst] = useState([]);
    const [itemsa, Setitemsa] = useState([]);
    const [drop, dropShow] = useState("Select");
    const [drop1, dropShow1] = useState("Inprogress");
    const [editableId, setEditableId] = useState(null); 
    //const [items1, Setitems1] = useState([]);

    const filteredp = items.filter( value => value.category === "pollution");

    const filteredt = items.filter( value => value.category === "traffic");

    const filtereda = items.filter( value => value.category === "accident");

    //Add useEffect, GetTodos() will run every time the component renders
useEffect(() => {
  GetTodos();
}, []);


    function handletext(event)
    {
        const newtext = event.target.value;
        SetinputText(newtext);
    }

    function handletext1(event)
    {
        const newtext1 = event.target.value;
        SetinputText1(newtext1);
    }

    function handletext2(event)
    {
        const newtext2 = event.target.value;
        SetinputText2(newtext2);
    }

    function handletext3(event)
    {
        const newtext3 = event.target.value;
        SetinputText3(newtext3);
    }
    function handletext4(event)
    {
        const newtext4 = event.target.value;
        SetinputText4(newtext4);
    }


    const GetTodos = () => {
      fetch(API_BASE)
      .then(res => res.json())
      .then(data => Setitems(data))
      .catch(err => console.log(err))
     }

     const addItem = async() => {
      if (!inputText || !inputText1 || !inputText2 || !inputText3 || !inputText4 || !inputTexttype || !inputFile) { 
        alert("All fields must be filled out."); 
        //SetinputText5("progress")
        return; 
    } 
    //SetinputText5("Inprogress")
      const data = await fetch(API_BASE + "/new", {
       method: "POST",
       headers: {
         "content-type" : "application/json",
         accept: "application/json",
         "Access-Control-Allow-Origin": "*"
       },
       body: JSON.stringify({
         name: inputText,
         email: inputText1,
         country: inputText2,
         city: inputText3,
         descr: inputText4,
         category: inputTexttype,
         status: inputText5,
         image: inputFile
           })
      }).then(res => res.json()) 
      await GetTodos()
      SetinputText('')
      SetinputText1('')
      SetinputText2('')
      SetinputText3('')
      SetinputText4('')
      SetinputText5('Inprogress')
      SetinputTexttype('')
      setInputFile('')
     }

     const deleteTodo = async(id) => {
      try{
          const response = await fetch(API_BASE + "/delete/" + id, {
              method: "DELETE",
            });
          if(!response.ok){
              throw new Error("Faild to delete a task")
          } 
          const data = await response.json()
          Setitems(items=> items.filter(item=> item._id !== data._id))
      }catch (error) {
          console.error("Error updating task status:", error);
        }
    }

     function convertbase(e)
     {
         console.log(e);
         var reader = new FileReader();
         reader.readAsDataURL(e.target.files[0]);
         reader.onload = () => {
             console.log(reader.result);
             setInputFile(reader.result);
         };
         reader.onerror = error => {
             console.log("error",error);
         };
     }

     // Function to toggle the editable state for a specific row 
     const toggleEditable = (id) => { 
      const rowData = items.find((data) => data._id === id); 
      if (rowData) { 
          setEditableId(id); 
          editSetinputText5(rowData.status); 
      } else { 
          setEditableId(null); 
          editSetinputText5(""); 
      } 
  }; 

  const updateTodo = async(id) => {
    const data = await fetch(API_BASE + "/new/" + id, {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        status: editinputText5,
          })
     }).then(res => res.json()) 
     setEditableId(null); 
     editSetinputText5(""); 
     await GetTodos()
     //setInput('')
     //setInput1('')
     //setInput2('')
     //setInputFile('')
  }


    function handletext5(event)
    {
        const newtext5 = event.target.value;
        SetinputText5(newtext5);
    }
    
    /*
    function handleimage(event) {
        console.log(event.target.files);
        setInputFile(URL.createObjectURL(event.target.files[0]));
    }
    
    const deleteByValue = val => {
        Setitems(oldValues => {
          return oldValues.filter(value => value !== val)
        })}

        const deleteByValuet = val => {
            Setitemst(oldValues => {
              return oldValues.filter(value => value !== val)
            })}

            const deleteByValuea = val => {
                Setitemsa(oldValues => {
                  return oldValues.filter(value => value !== val)
                })}

    function addlist()
    {
        if (inputTexttype === "pollution")
        {
        Setitems(value => {return [...value,<div className='displayin'><h5>Observed by: {inputText}<span>

<label className='stat' for="status">status:</label>

<select name="status" id="status">
  <option value="Inprogress">Inprogress</option>
  <option value="Resolved">Resolved</option>
</select>
        </span></h5><p>Country: {inputText2}</p><p>City: {inputText3}</p><p>Description: {inputText1}</p><img className = "image" src={inputFile} /></div>]});
        SetinputTexttype("");
        SetinputText("");
        SetinputText1("");
        SetinputText2("");
        SetinputText3("");
        SetinputText4("");
        SetinputText5("");
        setInputFile("");
        }
        else if (inputTexttype === "traffic")
        {
            Setitemst(value => {return [...value,<div className='displayin'><h5>Observed by: {inputText}</h5><p>Country: {inputText2}</p><p>City: {inputText3}</p><p>Description: {inputText1}</p><img className = "image" src={inputFile} /></div>]});
            SetinputTexttype("");
            SetinputText("");
            SetinputText1("");
            SetinputText2("");
            SetinputText3("");
            SetinputText4("");
            SetinputText5("");
            setInputFile("");
        }
        else if (inputTexttype === "accident")
        {
            Setitemsa(value => {return [...value,<div className='displayin'><h5>Observed by: {inputText}</h5><p>Country: {inputText2}</p><p>City: {inputText3}</p><p>Description: {inputText1}</p><img className = "image" src={inputFile} /></div>]});
            SetinputTexttype("");
            SetinputText("");
            SetinputText1("");
            SetinputText2("");
            SetinputText3("");
            SetinputText4("");
            SetinputText5("");
            setInputFile("");
        }
        else
        {

        }
    }*/

    //console.log({inputTexttype});
    console.log({inputTexttype});
    return(
    <div>
    <h1 className = "head1">Liable Observer<span className = "head2"> - Observe and share liabilities</span></h1>

    <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active navb" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
    <button class="nav-link navb" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Pollution</button>
    <button class="nav-link navb" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Traffic Jam</button>
    <button class="nav-link navb" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">Accident Prone areas</button>
    <button class="nav-link navb" id="nav-submit-tab" data-bs-toggle="tab" data-bs-target="#nav-submit" type="button" role="tab" aria-controls="nav-submit" aria-selected="false">Submit case</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">

  <div class="tab-pane fade show active home" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
  <br></br><br></br>
  <h2 className='home1'>Liable Observer is a portal where citizens can check liable elements around them</h2><br></br>
  <h4 className='home2'>We focus on 3 Liable elements</h4>
  <ul className='home3'>
    <li className='home3'>Pollution</li>
    <li className='home3'>Traffic Jam</li>
    <li className='home3'>Accident Prone areas</li>
  </ul><br></br>
  <h4 className='home4'>People can share if they encounter any of the liabilities and submit them under submit case to register there observations</h4>
  </div>


  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
  <div className='displayuser'>

{filteredp.map((item)=> {

const {_id, name,email,country,city,descr,category,status,image} = item
return  <div className="todo">
   <div className="text displayinuser">
   {image==""|| image==null?"": <img width={330} height={250} src={image} />}
   <p>Observer Name: {item.name}</p>
   <p>Country: {country}</p>
   <p>City: {city}</p>
   <p>Description: {descr}</p>
   <p>Status: {status}</p>
   </div>
 </div>   
})}

</div>
</div>

  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
  <div className='displayuser'>

  {filteredt.map((item)=> {

const {_id, name,email,country,city,descr,category,status,image} = item
return <div className="todo">
   <div className="text displayinuser">
   {image==""|| image==null?"": <img width={330} height={250} src={image} />}
   <p>Observer Name: {item.name}</p>
   <p>Country: {country}</p>
   <p>City: {city}</p>
   <p>Description: {descr}</p>
   <p>Status: {status}</p>
   </div>
 </div>  
})}

</div>
  </div>

  <div class="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">
  <div className='displayuser'>

  {filtereda.map((item)=> {

const {_id, name,email,country,city,descr,category,status,image} = item
return <div className="todo">
   <div className="text displayinuser">
   {image==""|| image==null?"": <img width={330} height={250} src={image} />}
   <p>Observer Name: {item.name}</p>
   <p>Country: {country}</p>
   <p>City: {city}</p>
   <p>Description: {descr}</p>
   <p>Status: {status}</p>
   </div>
 </div>  
})}

</div>
  </div>

  <div class="tab-pane fade submit" id="nav-submit" role="tabpanel" aria-labelledby="nav-submit-tab" tabindex="0">
  <h2>Submit Observations</h2>
  <label for="Oname">Observer name:</label><br></br>
  <input style={{width : "230px"}} type="text" id="Oname" name="Oname" onChange={handletext} value={inputText} maxlength="20"/><br></br>
  <label for="Oemail">Observer email:</label><br></br>
  <input style={{width : "230px"}} type="text" id="Oemail" name="Oemail" onChange={handletext1} value={inputText1} maxlength="30"/><br></br>
  <label for="country">Country:</label><br></br>
  <input style={{width : "230px"}} type="text" id="country" name="country" onChange={handletext2} value={inputText2} maxlength="20"/><br></br>
  <label for="city">City:</label><br></br>
  <input style={{width : "230px"}} type="text" id="city" name="city" onChange={handletext3} value={inputText3} maxlength="20"/><br></br>
  <label for="descr">Description about liability:</label><br></br>
  <input style={{width : "230px"}} type="text" id="descr" name="descr" onChange={handletext4} value={inputText4} maxlength="70"/><br></br>

  <label for="type">Liability type:</label><br></br>


  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {drop}
  </button>
  <ul class="dropdown-menu">
  <li class="dropdown-item" onClick = {() => {SetinputTexttype("pollution")
  dropShow("Pollution")}}>Pollution</li>

  <li class="dropdown-item" onClick =  {() => {SetinputTexttype("traffic")
  dropShow("Traffic Jam")}}>Traffic Jam</li>

  <li class="dropdown-item" onClick =  {() => {SetinputTexttype("accident")
  dropShow("Accident Prone areas")}}>Accident Prone areas</li>
  </ul>



<br></br><br></br>


<label for="file">Upload image(File size should be less than 70KB):</label><br></br>
<input type="file" id="file" name="file" onChange={convertbase}/><br></br><br></br>
<button type="submit" value="Submit" onClick=
{() => {addItem()
  dropShow("Select")}}

>Submit</button><br></br>

  </div>

</div>

    </div>
    );
}

export default Homeuser;


/*

{itemst.map((value) => {return <div>{value}<button onClick={() => deleteByValuet(value)}>Delete</button></div>})}

{itemsa.map((value) => {return <div>{value}<button onClick={() => deleteByValuea(value)}>Delete</button></div>})}

  <label for="Onumber">Observer Number:</label><br></br>
  <input type="text" id="Onumber" name="Onumber" onChange={handletext5} value={inputText5}/><br></br>
<ul>{items.map((value) => {return <li>{value}</li>})}
{items1.map((value) => {return <li>{value}</li>})}
</ul>
  <button value="pollution" onClick={() => SetinputTexttype("pollution")}>Pollution</button>
  <button value="traffic" onClick={() => SetinputTexttype("traffic")}>Traffic Jam</button>
  <button value="accident" onClick={() => SetinputTexttype("accident")}>Accident Prone areas</button>


        <button className="btn btn-secondary dropdown-toggle stat" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {drop1}
          </button>
          <ul class="dropdown-menu">
          <li class="dropdown-item" onClick = {() => {
          dropShow1("Inprogress")}}>Inprogress</li>
        
          <li class="dropdown-item" onClick =  {() => {
          dropShow1("Resolved")}}>Resolved</li>
        
          </ul>


  */
