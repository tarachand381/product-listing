import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { MainContext } from "../Context";

export default function List() {
    const { AddtoCard } = useContext(MainContext)
    const [Product, SetProduct] = useState([]);
    const [categor, Setcategor] = useState([]);
    const { categor_slug } = useParams();
    const [loading, Setloading] = useState(true)
    let limit = 20;
    const [totalPage, SettotalPage] = useState(0)
    const [curentPage, SetcurentPage] = useState(0)

    // Fetch product categories
    useEffect(() => {
        axios.get("https://dummyjson.com/products/categories").then(
            (success) => {
                Setcategor(success.data);
            }
        ).catch((error) => console.log(error))

    }, []);

    // Fetch all products


    // useEffect(() => {
    //     fetchProduct();
    // }, []);

    // Fetch products based on category
    useEffect(() => {
        let API;
        if (categor_slug == null) {
            API = "https://dummyjson.com/products"

        } else {
            API = `https://dummyjson.com/products/category/${categor_slug}`

        }
        axios
            .get(API).then(
                (success) => {
                    Setloading(true)
                    SetProduct(success.data.products);
                    SettotalPage(Math.ceil(success.data.total / limit))
                }
            ).catch((error) => { })
            .finally(() => Setloading(false))
    }, [categor_slug]);
    let paginations = [];
    for (let i = 0; i < totalPage; i++) {
        paginations.push(
            <li onClick={() => SetcurentPage(i)} className="list-none cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg
             hover:bg-gray-100 hover:text-gray-700 dark:bg-pink-700 dark:border-gray-700 
             dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-whit">




                {i + 1}


            </li>
        )
    }
    useEffect(
        () => {
            axios.get(`https://dummyjson.com/products?skip=${limit * curentPage}`)
                .then(
                    (success) => {
                        Setloading(true)
                        SetProduct(success.data.products);

                    }
                ).catch((error) => { })
                .finally(() => Setloading(false))
        },
        [curentPage]
    )
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 lg:px-7">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6">
                    {/* Category List */}
                    <div>
                        <h1 className="text-[28px] font-[Poppins] text-center font-semibold text-gray-900">Categories</h1>
                        <div className="mt-5">
                            <Link to="/"
                                className={`${categor_slug == null ? " bg-green-400" : ""} block text-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-blue-500 rounded-md shadow mt-3`}>All </Link>
                            <ul className="mt-4">
                                {categor.map((cat, i) => (
                                    <li key={i}>
                                        <Link to={`/${cat.slug}`}
                                            className={`${categor_slug == cat.slug ? " bg-green-400" : ""} block text-center py-2 px-4 text-sm font-medium text-gray-700 hover:bg-blue-500 rounded-md shadow mt-3`}>
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    <div className="h-6  col-span-4   grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4" >
                        {/* Product Grid */}
                        <div className="flex flex-row  mt-4">
                            <nav aria-label="Page navigation example">
                                <ul className="flex items-center -space-x-px h-10 text-base gap-5">

                                    {
                                        paginations
                                    }
                                </ul>
                            </nav>

                        </div>
                        <div className="h-6 col-span-4   grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4" >
                            {
                                loading == true ?
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d, i) => {
                                        return <div key={i} className="group relative border rounded-md shadow-md bg-white animate-pulse">
                                            <div className="w-full aspect-square bg-gray-300 rounded-t-md"></div>
                                            <div className="p-4 ">
                                                <div className=" h-4  bg-gray-300 rounded w-3/4 mb-2"></div>
                                                <div className=" h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <div className=" h-4 bg-gray-300 rounded w-1/4 "></div>
                                                    <div className=" h-4 bg-gray-300 rounded w-1/5 "></div>

                                                </div>


                                            </div>

                                        </div>
                                    })
                                    :
                                    Product.map((data, index) => (
                                        <div key={index} className="group relative bg-white border rounded-lg shadow-md hover:shadow-xl">
                                            <img
                                                src={data.thumbnail}
                                                alt={data.title}
                                                className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-75"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-sm font-medium text-gray-700 truncate">
                                                    <Link to={`/details/${data.id}`} className="hover:text-gray-900">
                                                        {data.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-2">{data.rating} ★</p>
                                                <p className="text-sm text-gray-500">Stock: {data.stock}</p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-sm line-through text-gray-600">${data.price}</span>
                                                    <span className="text-lg font-semibold text-gray-900">${data.discountPercentage}</span>
                                                </div>
                                            </div>
                                            <button onClick={()=>{
                                                AddtoCard(data.id)
                                            }} className="text-white ml-9 bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-red-200">
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))
                            }
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
