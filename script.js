console.log("====================================");
console.log("Connected");
console.log("====================================");

let completeData = {};
async function fetchAllData() {
  // TODO: MODULE_PRODUCTS
  // 1. Fetch products by invoking the REST API and return them
  try {
    let response = await fetch(
      `https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`
    );
    let productData = await response.json();
    console.log(productData);
    return productData;
  } catch (e) {
    return null;
  }
}
(async function init() {
  //Fetches list of all cities along with their images and description
  // console.log("from init()");
  // console.log(config.backendEndpoint);
  let menBtn = document.getElementById("men-btn");

  menBtn.innerHTML = `<img src="./Assets/manColor.png" class="icon">&nbsp;&nbsp;Men`;
  menBtn.classList.add("men-btn");
  let products = await fetchAllData();
  completeData = products;
  let menData = products.categories.filter(
    (product) => product.category_name === "Men"
  );
  console.log(menData);
  addProduct(menData);
})();
function addProduct(data) {
  let productContainer = document.getElementById("product");
    productContainer.innerHTML="";
  data[0].category_products.map((item) => {
    let card = document.createElement("div");
    card.className = "card";
    let image = createImage(item.image);
    if (item.badge_text) {
        let badgeContainer = document.createElement("div");
        badgeContainer.className = "badgeContainer";
        badgeContainer.innerHTML = `<p>${item.badge_text}</p>`;
        card.appendChild(badgeContainer);
      }
    let titleContainer = createTitleContainer(item.title, item.vendor);
    let price = document.createElement("div");
    price.className = "price";
    price.innerHTML = `<p>Rs ${item.price}</p>  <span class="overlined-text">${item.compare_at_price}</span> <span class="offer">50% Off</span>`;
    let Addbutton = document.createElement("button");
    Addbutton.className = "cart-btn";
    Addbutton.innerText = "Add to Cart";
    card.appendChild(image);
    card.appendChild(titleContainer);
    card.appendChild(price);
    card.appendChild(Addbutton);
    productContainer.appendChild(card);
  });
}
function createImage(image) {
  let img = document.createElement("img");
  img.src = image;
  img.className = "image";
  return img;
}
function createTitleContainer(title, vendor) {
    if(title.length>11){
        title = title.substring(0,10)+"...";
    }
  let titleContainer = document.createElement("div");
  titleContainer.className = "titleContainer";
  titleContainer.innerHTML = `<h3>${title}</h3> <span class="dot">&middot;</span> <p>${vendor}</p>`;
  return titleContainer;
}
function loadMen() {
  let menData = completeData.categories.filter(
    (product) => product.category_name === "Men"
  );
  addProduct(menData);
  let menBtn = document.getElementById("men-btn");
  let womenBtn = document.getElementById("women-btn");
  let kidsBtn = document.getElementById("kids-btn");

  menBtn.innerHTML = `<img src="./Assets/manColor.png" class="icon">&nbsp;&nbsp;Men`;
  menBtn.classList.add("men-btn");
  womenBtn.classList.remove("women-btn");
  womenBtn.innerHTML=`Women`;
  kidsBtn.classList.remove("kids-btn");
  kidsBtn.innerHTML=`Kids`;
}
function loadWomen(){
    let womenData = completeData.categories.filter(
        (product) => product.category_name === "Women"
      );
      addProduct(womenData);
      let menBtn = document.getElementById("men-btn");
      let womenBtn = document.getElementById("women-btn");
      let kidsBtn = document.getElementById("kids-btn");
    
      womenBtn.innerHTML = `<img src="./Assets/womenColor.png" class="icon">&nbsp;&nbsp;Women`;
      womenBtn.classList.add("women-btn");
      menBtn.classList.remove("men-btn");
      menBtn.innerHTML=`Men`;
      kidsBtn.classList.remove("kids-btn");
      kidsBtn.innerHTML=`Kids`;
}
function loadBoy(){
    let kidData = completeData.categories.filter(
        (product) => product.category_name === "Kids"
      );
      addProduct(kidData);
      let menBtn = document.getElementById("men-btn");
      let womenBtn = document.getElementById("women-btn");
      let kidBtn = document.getElementById("kids-btn");
    
      kidBtn.innerHTML = `<img src="./Assets/boyColor.png" class="icon">&nbsp;&nbsp;Kids`;
      kidBtn.classList.add("kids-btn");
      menBtn.classList.remove("men-btn");
      menBtn.innerHTML=`Men`;
      womenBtn.classList.remove("women-btn");
      womenBtn.innerHTML=`Women`;
}
