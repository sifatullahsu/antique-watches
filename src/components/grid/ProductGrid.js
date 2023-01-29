import { formatDistanceToNowStrict } from 'date-fns';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { BiCategory } from 'react-icons/bi';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


const ProductGrid = ({ product, setBuyNow, setComplaint, userProfile }) => {

  const {
    name, price, buyingPrice, purchasedYear, condition, categoryInfo, number,
    location, itemStatus, advertise, imgURL, authorInfo, publishedDate, currentUser
  } = product;

  // const isOrdered = orderedIds.filter(ids => ids.productID === _id).length > 0 ? true : false;

  return (
    <div className='product bg-white border px-3 pt-5 pb-3 md:p-5 relative'>
      <div className='absolute top-0 right-0 flex'>
        <div>
          <div className="tooltip tooltip-bottom text-xs" data-tip="Report to admin">
            <label
              htmlFor="complaint-modal"
              onClick={() => setComplaint(product)}
            ><BsShieldFillExclamation className='m-5 text-lg text-gray-400'></BsShieldFillExclamation></label>
          </div>
        </div>
        <PhotoProvider>
          <PhotoView src={imgURL}>
            <img src={imgURL} className='w-24 lg:w-32 border-l border-b' alt="" />
          </PhotoView>
        </PhotoProvider>

      </div>

      <div className='text-xs text-gray-400 mb-6 lg:mb-0'>
        <span>{formatDistanceToNowStrict(new Date(publishedDate))} ago</span>
        {
          advertise === 'true' &&
          <div className="badge badge-accent ml-5 text-xs">Sponsored</div>
        }
      </div>
      <h4>{name}</h4>
      <div className='flex flex-nowrap gap-5 text-sm text-accent font-medium mt-3'>
        <div>
          <div>Sell Price</div>
          <div>${price}</div>
        </div>
        <div>
          <div>Buying Price</div>
          <div>${buyingPrice}</div>
        </div>
        <div>
          <div>Purchased</div>
          <div>on {purchasedYear}</div>
        </div>
      </div>

      <div className='text-sm text-accent font-medium mt-5 '>
        <span className='mr-5'>
          <BiCategory className='inline -mt-1 mr-2'></BiCategory>
          <Link
            to={`/categories/${categoryInfo._id}`}
            className="btn btn-link p-0 min-h-0 h-0 lowercase"
          >{categoryInfo.catName}</Link>
        </span>
        <span>
          <HiOutlineShoppingBag className='inline -mt-1 mr-2'></HiOutlineShoppingBag>{condition} condition
        </span>
      </div>
      <div className='text-sm text-accent font-medium mt-5 '>
        <span className='mr-5'><TfiHeadphoneAlt className='inline -mt-1 mr-2'></TfiHeadphoneAlt>{number}</span>
        <span><FiMapPin className='inline -mt-1 mr-2'></FiMapPin>{location}</span>
      </div>

      <div className='flex flex-nowrap items-end justify-between mt-5'>
        <div className='author flex flex-nowrap'>
          <div className='basis-auto'>
            <img src={authorInfo?.image} className='w-12 h-12' alt="" />
          </div>
          <div className='basis-auto pl-3'>
            <div>
              <h5 className='uppercase font-semibold inline'>{authorInfo?.name}</h5>
              {
                authorInfo?.verified === 'true' &&
                <FaCheckCircle className='text-blue-500 inline ml-2 -mt-1'></FaCheckCircle>
              }
            </div>
            <span className='uppercase text-xs text-gray-400'>{authorInfo?.role === 'seller' ? 'SELLER' : null}</span>
          </div>
        </div>
        {
          itemStatus === 'unsold' && currentUser.loggedIn === userProfile._id && !currentUser.orderd &&
          <label
            htmlFor="book-now-modal"
            className='btn btn-primary btn-sm text-xs'
            onClick={() => setBuyNow(product)}
          >Book now</label>
        }
        {
          itemStatus === 'unsold' && currentUser.loggedIn === userProfile._id && currentUser.orderd &&
          <div className='text-right'>
            <div className="badge badge-info text-xs">booked</div>
            <div className='text-xs text-accent font-medium'>Payment Incomplete</div>
            <div className='text-xs text-accent font-medium'>Checkout from dashboard</div>
          </div>
        }
        {
          itemStatus === 'sold' &&
          <div className="badge badge-success ml-5 text-xs">Item Sold</div>
        }
        {
          (currentUser.loggedIn === undefined || currentUser.loggedIn !== userProfile._id) &&
          <div className="ml-5 text-xs font-medium underline">
            <Link to='/login'>login for booking</Link>
          </div>
        }
      </div>
    </div >
  );
};

export default ProductGrid;