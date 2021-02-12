import React, { Fragment, useState, useEffect } from 'react';
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions'; 
import Loader from './layout/Loader';
import { useAlert } from 'react-alert'
import Product from './product/Product';
import Pagination from 'react-js-pagination';

const Home = ({ match }) => {

  const [currentPage, setCurrentPage] = useState(1)    
  const alert = useAlert();
  const  dispatch =  useDispatch();
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)
  
  const categories =[
    'hayopka!'
    
  ]

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products) 

  const keyword = match.params.keyword

  useEffect(() => { 
    if(error) {      
     return alert.error(error)
    }
    dispatch(getProducts(keyword, currentPage, category, rating));
  },
   [ dispatch, alert, error, keyword, currentPage, category, rating])  
  
    function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if(keyword) {
      count = filteredProductsCount
    }

  return (
            <Fragment>
              {loading ? <Loader /> : (
                <Fragment>
                   <MetaData title={'Buy Best Products Online'} />
            <h1 id="products_heading">Latest Products</h1>
           
            <section id="products" className="container mt-5">
            <div className="row">
           <hr className="my-5" />
            <div className="mt-5">
                <h4 className="mb-3">
                  Categories
                </h4>
                <ul className="pl-0">
                {categories.map(category =>(
                  <li
                      style={{cursor: 'pointer',
                              listStyleType: 'none'
                            }}
                            key={category}
                            onClick={() => setCategory(category)
                            }
                              >
                                {category}
                    </li>
                ))}
                </ul>
            </div>
            {products && products.map(product => (
         <Product key={product._id} product={product}
         col={3}
         />
         ))}       
          </div>     
                </section>

                    {resPerPage <= count && (
                            <div className="d-flex justify-content-center mt-5">
                            <Pagination
                             activePage={currentPage}
                            itemsCountPerPage={resPerPage} 
                            totalItemsCount ={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'} 
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item" 
                            linkClass="page-link"
                            />
                              </div>
                    )}
                </Fragment>
                )}  
        </Fragment>  
    )
}
 
export default Home
