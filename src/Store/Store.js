import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  totalItemsInCart: 0,
  cart: {
    items: [],
  },
  Alert: { showAlert: false, alertMessage: "" },
  showModal: false,
  userData: {
    userDetail: {},
  },
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
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
      const cartDataToStore = JSON.stringify(state.cart.items);
      localStorage.setItem("userCartData", cartDataToStore);
      if (state.totalItemsInCart <= 0) {
        localStorage.removeItem("totalCount");
      } else {
        localStorage.setItem(
          "totalCount",
          JSON.stringify(state.totalItemsInCart)
        );
      }
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
        localStorage.removeItem("userCartData");
        console.log("hello");

        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      state.cart.items = updatedItems;
      state.totalItemsInCart = updatedItems.reduce(
        (totale, item) => totale + item.quantity,
        0
      );
      const cartDataToStore = JSON.stringify(state.cart.items);
      if (state.cart.items.length > 0) {
        localStorage.setItem("userCartData", cartDataToStore);
      }
      if (state.totalItemsInCart <= 0) {
        localStorage.removeItem("totalCount");
      } else {
        localStorage.setItem(
          "totalCount",
          JSON.stringify(state.totalItemsInCart)
        );
      }
    },
    handleMakeAlert: (state) => {
      state.showAlert = !state.showAlert;
    },
    handleShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    handleUserData: (state, action) => {
      state.userData.userDetail = action.payload;
      localStorage.setItem(
        "CurrentUserData",
        JSON.stringify(state.userData.userDetail)
      );
    },
    handleLogin: (state) => {
      state.isLogin = true;
    },
    handleLogOut: (state) => {
      state.isLogin = false;
      localStorage.removeItem("CurrentUserData");
    },
    handleSetLocalUser: (state, action) => {
      state.userData.userDetail = action.payload;
    },
    handleSetLocalCart: (state, action) => {
      state.cart.items = action.payload;
    },
    handleSetLocalCount: (state, action) => {
      state.totalItemsInCart = action.payload;
    },
    handleAlertMessage: (state, action) => {
      state.Alert.alertMessage = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: slice.reducer,
});

export const {
  handleLogin,
  handleAddToCart,
  handleRemoveFromCart,
  handleUserData,
  handleSetLocalUser,
  handleShowModal,
  handleSetLocalCart,
  handleSetLocalCount,
  handleLogOut,
  handleMakeAlert,
} = slice.actions;
