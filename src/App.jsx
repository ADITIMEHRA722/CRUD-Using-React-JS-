import {useState, useEffect} from 'react'
import { Data } from './Emp';


function App() {

const [data, setData] = useState([]);
const [ firstname , setFirstname ]= useState("");
const [ lasttname , setLastname ]= useState("");
const [ age , setAge ]= useState(0);
const [ id , setId ]= useState(0);
const [ isUpdate , setIsUpdate ]= useState(false);

useEffect(()=>{
  setData(Data)
});

const handleEdit= (id)=>{
setIsUpdate(true)
  const dt= data.filter((item)=> item.id === id);
  if(dt !== undefined){
    setId(dt[0].id);
    setFirstname(dt[0].firstname);
    setLastname(dt[0].lastname);
    setAge(dt[0].age);

  }
};

const handleDelete = (id) =>{
  if(id>0){
    if(window.confirm("are you sure to delete this item ?")){
    const dt = data.filter(item => item.id !== id);
    setData(dt);
  }
  }
}

const handleSave= (e)=>{
  let error = '';
  if(firstname === '')
    error += 'first name is required , ';

  if(lasttname === '')
    error += 'last name is required , ';

  if(age <= 0 )
    error += 'age name is required.';
  
  if(error === ''){

  e.preventDefault();
  const dt = [...data];
  const newObject = {
    id: Data.length + 1,
        firstname: firstname,
        lastname: lasttname,
        age: age
  }
  dt.push(newObject);
  setData(dt);
} else{
  alert(error)
}
  };

  const handleUpdate = ()=>{
const index = data.map((item)=>{
  return item.id 
}).indexOf(id); 
const dt = [...data];
dt[index].firstname = firstname;
dt[index].lastname = lasttname
dt[index].age = age;
setData(dt);
handleClear();
  }

  const handleClear= ()=>{
    setId(0);
    setFirstname('');
    setLastname('');
    setAge('');
    setIsUpdate(false)
    };

  return (
    <>

    <div className=" flex  justify-items-center gap-2 m-20">
<div>
  <label>First Name: 
  <input type="text" placeholder ="Enter the first Name" onChange = {(e)=> setFirstname(e.target.value)} value ={firstname} /></label>
</div>

<div>
  <label>Last Name: 
  <input type="text" placeholder ="Enter the last Name" onChange = {(e)=> setLastname(e.target.value)}  value ={lasttname}/></label>
</div>

<div>
  <label>Age : 
  <input type="text" placeholder ="Enter the age" onChange = {(e)=> setAge(e.target.value)}  value ={age}/></label>
</div>

<div>
{
  ! isUpdate ? 
  <button className="btn btn-primary" onClick={(e)=>handleSave(e)}>Save</button>
  : <button className="btn btn-primary" onClick={()=>handleUpdate()}>Update</button>
}


<button className="btn btn-danger ml-3" onClick={()=>handleClear()}>Clear</button>
</div>
    </div>
     <table className = "table table-hover">
      <thead>
        <tr>
          <td>Sr. No.</td>
          <td>Id</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Age</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, index)=>{
            return (
              <tr key={index}> 
              <td>{index+1} </td>
              <td>{item.id} </td>
              <td>{item.firstname} </td>
              <td>{item.lastname} </td>
              <td>{item.age} </td>
              <td>
                <button className="btn btn-primary" onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
               
                <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
              </td>
              </tr>
            )
          })
        }
      </tbody>
     </table> 
    </>
  )
}

export default App
