const productId = localStorage.getItem("selectedProductId");
const displayProducts = (ele) => {
  document.getElementById("products").innerHTML = "";

  let div = document.createElement("div");

  let image = document.createElement("img");
  image.src = ele.thumbnail;

  let title = document.createElement("h4");
  title.textContent = ele.title;

  let price = document.createElement("h3");
  price.textContent = `Price: $${ele.price}`;

  let description = document.createElement("h3");
  description.textContent = `Category: ${ele.description}`;

  let category = document.createElement("h3");
  category.textContent = `Category: ${ele.category}`;

  let rating = document.createElement("h3");
  rating.textContent = `Rating: ${ele.rating}`;

  let discountPercentage = document.createElement("h3");
  discountPercentage.textContent = `discountPercentage: ${ele.discountPercentage}`;

  let stock = document.createElement("h3");
  stock.textContent = `stock: ${ele.stock}`;

  div.addEventListener("click", () => storeProductId(ele.id));

  div.append(
    image,
    title,
    price,
    description,
    category,
    rating,
    discountPercentage,
    stock
  );
  document.getElementById("products").append(div);
};
const getData = async (id) => {
  let request = await fetch(`https://dummyjson.com/products/${id}`);
  let response = await request.json();
  console.log(response);

  displayProducts(response);
};

getData(productId);
