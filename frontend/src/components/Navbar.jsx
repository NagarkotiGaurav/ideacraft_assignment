import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoPerson } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import logo from '../assets/logo.svg'


const Navbar = () => {

  const [navs,setNavs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL ;
  console.log(apiUrl)
  useEffect(  ()=>{
    const fetchCategoriesWithSub = async () => {

    const res = await fetch('http://localhost:4000/api/category/getall');
      const data = await res.json();
      console.log('Formatted categories:', data);
      setNavs(data);
    }
    fetchCategoriesWithSub()
  },[])
  return (
    <>
     

      {/* Logo & Search */}
      <div className="bg-yellow-500 flex justify-between items-center px-6 py-3">
        <Link to='/' ><img height={40} width={200} src={logo}/></Link>
        <div className="flex">
          <input
            type="text"
            placeholder="Search for products"
            className="px-4 py-2 rounded-l-full w-72 focus:outline-none"
          />
          <button className="bg-yellow-600 text-white px-5 py-2 rounded-r-full font-semibold hover:bg-yellow-700">
            Search
          </button>
        </div>
        <div className=" text-white flex gap-2 justify-between items-center px-4 py-1 text-sm">
        
          <Link to='/login'>
          <GoPerson  size={30}/>
          </Link>
          <CiHeart size={30}/>
          <CiShoppingCart size={30}/>
       
      </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-black text-white px-6 py-2 flex justify-between space-x-6 text-sm font-medium relative z-10">
        <div className=' p-4 flex gap-8'>
        {/* {[
          { name: 'Clothing', items: ['T-Shirts', 'Shirts', 'Jackets'] },
          { name: 'Lifestyle', items: ['Caps', 'Socks'] },
          { name: 'Travel', items: ['Luggage', 'Laptop Bags', 'Travel Accessories'] },
          { name: 'Kids', items: ['T-Shirts', 'Shorts'] },
        ]*/
        navs.map((menu) => ( 
          <div className="group relative" key={menu.name}>
            <button className="hover:text-yellow-400  "><Link to={`/category/${menu.name}`}>{menu.name} </Link> ▾</button>
            <div className="absolute hidden group-hover:flex flex-col bg-white text-black shadow-lg  rounded w-48">
              {menu.items.map((item) => (
                <Link
                  key={item}
                    to={`/category/${menu.name}/subcategory/${item}`}
                  className="px-4 py-2 hover:bg-gray-100 transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
        </div>
        
                <div>📞 0124–6010900 &nbsp; | &nbsp; ✉️ jcb@ideacraft.com</div>

      </div>

      {/* Chat Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button className="bg-black text-white px-4 py-2 rounded-full font-semibold shadow-lg">
          💬 Chat with us
        </button>
      </div>
    </>
  );
};

export default Navbar;
