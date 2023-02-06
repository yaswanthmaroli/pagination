import { useEffect, useState } from "react";



function Form() {

 const [ products,setproducts] = useState([])
 const [page,setpage] = useState(2)

  const fetchproducts =  async()=>{
   const res = await fetch("https://dummyjson.com/products?limit=100&skip=10&select=title,price")

   const data = await res.json()
  
   if(data&& data.products){
     setproducts(data.products)
   }
    
  }
 console.log(products)

  

  useEffect(()=>{

    fetchproducts()

  },[])

  const selectpage = (selectpage)=>{

    if(selectpage >=1 && selectpage <= products.length/10 && selectpage !==page)
    setpage(selectpage)
  }

  return (
    <div>

      {
         products.length > 0 && (

          <div className="productslist">
            {
              products.slice(page * 10 - 10, page * 10).map((item)=>{
                return(
                  <div className="products " key={item.id}>
                    <h1>{item.title}</h1>
                  </div>
                )
              })
            }
          </div>
         )
      }


      {
        products.length > 0 && 
        <div className="pagination">
         <span className={page>1 ? "":"pagination-disable"} onClick={()=>selectpage(page-1)}>⬅️</span>
         {
          [ ...Array(products.length / 10)].map((_,i)=>{
            return(
              <span className={page == i+1 ?"pagination-selected":""} onClick={()=>selectpage(i+1)} key={i}>{i+1}</span>
            )
          })
         }
         <span className={page < products.length /10 ? "": "pagination-disable"} onClick={()=>selectpage(page+1)}>➡️</span>
        </div>
      }
        
    </div>
  )
  
}

export default Form;

 
