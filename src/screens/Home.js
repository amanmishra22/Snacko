import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [search,setsearch]=useState('');
  const [foodCat,setfoodCat]=useState([]);
  const [fooditem,setfooditem]=useState([]);
  const loadData=async()=>{
    let response= await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });
    response=await response.json();
   // console.log(response[0],response[1]);
    setfooditem(response[0])
    setfoodCat(response[1])
  }
  useEffect(()=>{
    loadData()
  },[])
  return (
    <div>
      <div> <Navbar/> </div>
      <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"3"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
     {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjJ_1ZP2kISVwXmf6cndE3eZI3HZLiPCJ4F1EuXvxAbA&s" className="d-block w-100 h-10" style={{filter:"brightness(50%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLctvkCqeUOxs_Kkq5udrnFK_We2madJ9OA&usqp=CAU" className="d-block w-100 h-10" style={{filter:"brightness(50%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7tkqabLocteL_OqmJwHgrIOpq3NonXAwAJA&usqp=CAU" className="d-block w-100 h-10" style={{filter:"brightness(50%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button></div></div>
      <div className='container'> 
      {
        foodCat!==[]
        ?foodCat.map((data)=>{
          return(
            <div className='row mb-3'>
            <div key={data.id} className='fs-3 m-3'>
              {data.CategoryName}</div>
              <hr/>
              {fooditem!==[]? fooditem.filter(
                (item)=>(item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems=>{
                  return(
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-3'><Card
                     fooditem={filterItems}
                    options={filterItems.options[0]}
             
                    ></Card></div>
                  )
                })
              :<div>No data</div>}
            </div>
          )
        }): ""
      }
      </div>
      <div> <Footer/></div>
    </div>
  )
}
