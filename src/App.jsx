import { useEffect } from 'react';
import {
  addToCart,
  decrement,
  decrementfilter,
  fetchProducts,
  increment,
  incrementfilter,
} from './redux/slice/products';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { filterByCat } from './redux/slice/products';
import Cart from './Cart';
import Navigation from './Navigation';
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    console.log(state.data, 'data');
  }, [state.data]);
  let countShow = (id) => state.cart.map((res) => res.id === id);

  return (
    <>
      <div
        style={{
          background: 'black',
          color: '#FFF',
          padding: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 20,
          paddingLeft: 20,
          flexWrap: 'wrap',
        }}
      >
        <h1>Bonami shop</h1>
        {/* {compoennt} */}
        <Form.Select aria-label='Default select example'>
          <option>Filter By Category</option>
          {state.data !== null &&
            state.data.map((res) => {
              return (
                <option
                  value='1'
                  key={res.id}
                  onClick={() =>
                    dispatch(filterByCat({ payload: res.category }))
                  }
                >
                  {res.category}
                </option>
              );
            })}
        </Form.Select>
        <Navigation />
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
        {/* filterData */}
        {state.filterData !== null &&
          state.filterData.map((res) => {
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
                    {res.title.length > 30
                      ? res.title.slice(0, 30) + '...'
                      : res.title}
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
                        dispatch(decrementfilter({ payload: res.id }))
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
                        dispatch(incrementfilter({ payload: res.id }))
                      }
                    >
                      +
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(addToCart(res))}
                    style={{
                      width: '100%',
                      color: '#FFF',
                      backgroundColor: 'lightblue',
                      border: 'none',
                      padding: 10,
                    }}
                  >
                    Add to card
                  </button>
                </div>
              </div>
            );
          })}
        {state.data !== null &&
          state.filterData === null &&
          state.data.map((res) => {
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
                    {res.title.length > 30
                      ? res.title.slice(0, 30) + '...'
                      : res.title}
                  </p>
                  {console.log(state.cart, 'ugxwyggy')}

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
                      onClick={() => dispatch(decrement({ payload: res.id }))}
                    >
                      -
                    </p>
                    <p style={{ padding: 5, width: 10 }}>{res.qty}</p>
                    <p
                      style={{
                        padding: 5,
                        backgroundColor: 'lightgray',
                      }}
                      onClick={() => dispatch(increment({ payload: res.id }))}
                    >
                      +
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(addToCart(res))}
                    style={{
                      width: '100%',
                      color: '#FFF',
                      backgroundColor: 'lightblue',
                      border: 'none',
                      padding: 10,
                    }}
                  >
                    Add to card
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
