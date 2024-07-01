let products = [];

const getData = async () => {
  let request = await fetch("https://dummyjson.com/products/");
  let response = await request.json();
  products = response.products;

  displayProducts(products);
};

const storeProductId = (productId) => {
  localStorage.setItem("selectedProductId", productId);
  window.location.href = "Product.html";
};

const displayProducts = (productList) => {
  document.getElementById("products").innerHTML = "";
  productList.map((ele, index) => {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.src = ele.thumbnail;

    let title = document.createElement("h4");
    title.textContent = ele.title;

    let price = document.createElement("h3");
    price.textContent = `Price: $${ele.price}`;

    let category = document.createElement("h3");
    category.textContent = `Category: ${ele.category}`;

    let rating = document.createElement("h3");
    rating.textContent = `Rating: ${ele.rating}`;

    div.addEventListener("click", () => storeProductId(ele.id));

    div.append(image, title, price, category, rating);
    document.getElementById("products").append(div);
  });
};

getData();

const handleFilter = (category) => {
  let filteredProducts = products.filter((ele) => ele.category === category);
  displayProducts(filteredProducts);
};

const handleSort = (orderBy) => {
  let sortedProducts;
  if (orderBy === "LTH") {
    sortedProducts = [...products].sort((a, b) => a.price - b.price);
  } else {
    sortedProducts = [...products].sort((a, b) => b.price - a.price);
  }
  displayProducts(sortedProducts);
};

const handleSearch = (value) => {
  let temp = products.filter((ele) =>
    ele.title.toLowerCase().includes(value.toLowerCase())
  );
  displayProducts(temp);
};

const handleSearchData = (e) => {
  e.preventDefault();

  let value = document.getElementById("search").value;
  handleSearch(value);
};

const handleInput = (e) => {
  let value = document.getElementById("search").value;
  handleSearch(value);
};

document.getElementById("search").addEventListener("keypress", handleInput);
document
  .getElementById("search-btn")
  .addEventListener("click", handleSearchData);

document
  .getElementById("beauty")
  .addEventListener("click", () => handleFilter("beauty"));
document
  .getElementById("fragrances")
  .addEventListener("click", () => handleFilter("fragrances"));
document
  .getElementById("furniture")
  .addEventListener("click", () => handleFilter("furniture"));
document
  .getElementById("groceries")
  .addEventListener("click", () => handleFilter("groceries"));

document
  .getElementById("LTH")
  .addEventListener("click", () => handleSort("LTH"));
document
  .getElementById("HTL")
  .addEventListener("click", () => handleSort("HTL"));
