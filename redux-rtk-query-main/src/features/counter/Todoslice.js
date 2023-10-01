import React from 'react'
import {
    useGetAllProductsQuery,
  } from "../../store/productsApi";

export default function Todoslice() {
    const { data:singleProduct, isLoading, error, isError } = useGetAllProductsQuery();
    // const [input, setInput] = useState("");
  
    // const {
    //   data: singleProduct,
    //   error,
    //   isError,
    //   isLoading,
    // } = useGetSingleProductQuery(input);
  
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <p>{error}</p>;
  console.log(singleProduct);
  return (
    <div>

{/* <div>Search Product:</div>
      <input type="text" onChange={(e) => setInput(e.target.value)} /> */}
      <h1>Results</h1>
      <div>
        <ul>
          {  singleProduct.data.map((item) => {
              return (
                <li>
                  {item.todoName}
                  {/* <img src={item.images[0]} alt="" width={200} /> */}
                  <p>{item.todoName}</p>
                  <hr />
                </li>
              );
            })}
        </ul>
      </div>


    </div>
  )
}
