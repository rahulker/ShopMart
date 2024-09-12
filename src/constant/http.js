export async function handleSendData(data) {
  let respone = await fetch(
    "https://flipcartdata-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  let dataR = await respone.json();
  return dataR;
}

export async function handleProductData(limit) {
  let URL = "https://fakestoreapi.com/products";
  if (limit) {
    URL += "?limit=" + limit;
  }
  let respone = await fetch(URL);
  let data = await respone.json();
  return data;
}

export async function handleSingleFetch(id) {
  let respone = await fetch(`https://fakestoreapi.com/products/${id}`);
  let data = await respone.json();
  return data;
}

export async function getAllCatagory() {
  let respone = await fetch("https://fakestoreapi.com/products/categories");
  let data = await respone.json();
  return data;
}

export async function handleGetUser() {
  let respone = await fetch(
    "https://flipcartdata-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
  );
  let data = await respone.json();
  if (data === null) {
    return;
  }
  let obj = Object.values(data);
  return obj;
}
