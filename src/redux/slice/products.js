import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';
export const fetchProducts = createAsyncThunk('fetchProduct', async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  return res.json();
});
const initialState = {
  isLoading: false,
  data: null,
  isError: false,
  filterData: null,
  cart: [],
  itemCount: 1,
};
const productsSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    filterByCat: (state, action) => {
      //   const { payload } = action;
      let tempArr = current(state.data);
      console.log(tempArr);
      const filArr = tempArr.filter((res) => {
        return res.category === action.payload.payload;
      });
      console.log(filArr, 'soming');
      state.filterData = filArr;
    },
    increment: (state, action) => {
      let tempQty = state.data;
      //   tempQty += 1;
      let qty = tempQty.map((res) => {
        console.log(res.id == action.payload.payload, 'hello55');
        if (res.id == action.payload.payload) {
          //   console.log('hello56');
          //   res.qty += 1;
          return { ...res, qty: res.qty + 1 };
        } else {
          console.log('hello57');
          return res;
        }
      });
      state.data = qty;
      console.log(qty, 'jdwu');
    },
    decrement: (state, action) => {
      let tempQty = state.data;
      //   tempQty += 1;
      let qty = tempQty.map((res) => {
        console.log(res.id == action.payload.payload, 'hello55');
        if (res.id == action.payload.payload) {
          return { ...res, qty: res.qty - 1 };
        } else {
          return res;
        }
      });
      state.data = qty;
    },
    incrementcart: (state, action) => {
      let tempQty = state.cart;
      //   tempQty += 1;
      let qty = tempQty.map((res) => {
        console.log(res.id == action.payload.payload, 'hello55');
        if (res.id == action.payload.payload) {
          //   console.log('hello56');
          //   res.qty += 1;
          if (res.qty == 0) {
            tempQty = tempQty.filter((res) => res.qty !== 0);
          }
          return { ...res, qty: res.qty + 1 };
        } else {
          console.log('hello57');
          return res;
        }
      });
      state.cart = qty;
      console.log(qty, 'jdwu');
    },
    decrementcart: (state, action) => {
      let tempQty = state.cart;
      //   tempQty += 1;
      //   if (action.payload.payload) {
      //     state.cart.filter((res) => res !== res);
      //   }
      let qty = tempQty.map((res) => {
        console.log(res.id == action.payload.payload, 'hello55', res.qty);
        if (res.id == action.payload.payload) {
          if (res.qty === 0) return;
          return { ...res, qty: res.qty - 1 };
        } else {
          return res;
        }
      });
      let filData = qty.filter((res) => res.qty !== 0);
      state.cart = filData;
    },
    incrementfilter: (state, action) => {
      let tempQty = state.filterData;
      //   tempQty += 1;
      let qty = tempQty.map((res) => {
        console.log(res.id == action.payload.payload, 'hello55');
        if (res.id == action.payload.payload) {
          //   console.log('hello56');
          //   res.qty += 1;
          //   if (res.qty == 0) {
          //     tempQty = tempQty.filter((res) => res.qty !== 0);
          //   }
          return { ...res, qty: res.qty + 1 };
        } else {
          console.log('hello57');
          return res;
        }
      });
      state.filterData = qty;
      console.log(qty, 'jdwu');
    },
    decrementfilter: (state, action) => {
      let tempQty = state.filterData;
      //   tempQty += 1;
      let qty = tempQty.map((res) => {
        console.log(res.id == action.payload.payload, 'hello55');
        if (res.id == action.payload.payload) {
          return { ...res, qty: res.qty - 1 };
        } else {
          return res;
        }
      });
      state.filterData = qty;
    },
    addToCart: (state, { payload }) => {
      console.log('payLoad', payload.qty);
      if (payload.qty === 0) {
        state.cart.filter((res) => res !== res);
      }
      state.cart = [...state.cart, payload];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        let arr = action.payload.map((res) => {
          return { ...res, qty: 1 };
        });
        state.data = arr;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});
export const {
  filterByCat,
  increment,
  decrement,
  addToCart,
  incrementcart,
  decrementcart,
  decrementfilter,
  incrementfilter,
} = productsSlice.actions;
export default productsSlice.reducer;
