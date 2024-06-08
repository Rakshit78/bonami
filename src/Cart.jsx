import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  decrement,
  decrementcart,
  increment,
  incrementcart,
  removeFromCart,
  removeAllItemFromCart,
} from './redux/slice/products';
function Cart() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);

  return (
    <>
      <div style={{ width: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Cart</h1>
        <h3 style={{ textAlign: 'center' }}>
          Total price:
          {state.cart.map((res) => Math.floor(res.qty * res.price + 0))}
        </h3>
        <button
          style={{
            textAlign: 'center',
            padding: 10,
            backgroundColor: 'lightgreen',
            width: 200,
            border: 'none',
          }}
          onClick={() => dispatch(removeAllItemFromCart())}
        >
          remove all items from cart
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 10,
          marginTop: 10,
        }}
      >
        {state.cart !== null &&
          state.cart.map((res) => {
            return (
              <div
                key={res.id}
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: 'gray',
                  borderRadius: 10,
                  boxShadow: 10,
                }}
              >
                <div
                  style={{
                    padding: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <img
                    src={res.image}
                    alt='product_image'
                    style={{ width: 150, height: 130 }}
                  />
                  <p>
                    {res?.title?.length > 30
                      ? res?.title.slice(0, 30) + '...'
                      : res?.title}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      style={{
                        padding: 5,
                        backgroundColor: 'lightgray',
                      }}
                      onClick={() =>
                        dispatch(decrementcart({ payload: res.id }))
                      }
                    >
                      -
                    </p>
                    <p style={{ padding: 5, width: 10 }}>{res.qty}</p>
                    <p
                      style={{
                        padding: 5,
                        backgroundColor: 'lightgray',
                      }}
                      onClick={() =>
                        dispatch(incrementcart({ payload: res.id }))
                      }
                    >
                      +
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart({ payload: res.id }))
                    }
                    style={{
                      width: '100%',
                      color: '#FFF',
                      backgroundColor: 'lightblue',
                      border: 'none',
                      padding: 10,
                    }}
                  >
                    Remove from card
                  </button>
                </div>
              </div>
            );
          })}

        {/* {prist} */}
      </div>
    </>
  );
}

export default Cart;
