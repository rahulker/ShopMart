import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  totalItemsInCart: 0,
  cart: {
    items: [],
  },
  showModal: false,
  userData: {
    userAlreadyExists: false,
    createUser: true,
    userDetail: {},
  },
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.isLogin = false;
    },
    handleAddToCart: (state, action) => {
      const newCart = [...state.cart.items];
      const existingItem = newCart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = newCart[existingItem];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        newCart[existingItem] = updatedItem;
      } else {
        newCart.push({ ...action.payload, quantity: 1 });
      }
      state.cart.items = newCart;
      state.totalItemsInCart = newCart.reduce(
        (totale, item) => totale + item.quantity,
        0
      );
    },
    handleRemoveFromCart: (state, action) => {
      const updatedItems = [...state.cart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity -= 1;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      state.cart.items = updatedItems;
      state.totalItemsInCart = updatedItems.reduce(
        (totale, item) => totale + item.quantity,
        0
      );
    },
    handleSearchModal: (state) => {
      state.searchModal = !state.searchModal;
    },
    handleUserAlreadyLogIn: (state) => {
      state.userData.userAlreadyExists = !state.userData.userAlreadyExists;
      console.log(state.userData.userAlreadyExists);
    },
    handleUserData: (state, action) => {
      state.userData.userDetail = action.payload;
      console.log(action.payload);
    },
    handleShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    handleCreateUser: (state) => {
      state.userData.createUser = !state.userData.createUser;
      console.log(state.userData.createUser);
    },
    handleLogin: (state) => {
      state.isLogin = true;
      console.log(state.isLogin);
    },
  },
});

export const store = configureStore({
  reducer: slice.reducer,
});

export const {
  handleLogin,
  handleLogout,
  handleAddToCart,
  handleRemoveFromCart,
  handleSearchModal,
  handleUserAlreadyLogIn,
  handleUserData,
  handleShowModal,
  handleCreateUser,
} = slice.actions;
