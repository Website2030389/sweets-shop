
let phone="2001221183490"

let products=[
{name:"كيك شوكولاتة",price:50,cat:"cake",img:"img/pexels-ali-dashti-506667798-29177177.jpg"},
{name:"تشيز كيك",price:60,cat:"cake",img:"img/pexels-biannkbya-19897304.jpg"},
{name:"براونيز",price:40,cat:"cake",img:"img/pexels-christina-polupanova-138429930-10281287.jpg"},
{name:"دونات",price:25,cat:"donut",img:"img/pexels-diva-plavalaguna-5711231.jpg"},
{name:"دونات شوكولاتة",price:30,cat:"donut",img:"img/pexels-nestor-cortez-341956-1131810.jpg"},
{name:"آيس كريم",price:30,cat:"ice",img:"img/pexels-gustavoraton-6441136.jpg"},
{name:"آيس كريم شوكولاتة",price:35,cat:"ice",img:"img/pexels-mccutcheon-1191639.jpg"},
{name:"كيك شوكولاتة",price:50,cat:"cake",img:"img/pexels-ali-dashti-506667798-29177177.jpg"},

{name:"تشيز كيك",price:60,cat:"cake",img:"img/pexels-biannkbya-19897304.jpg"},
{name:"براونيز",price:40,cat:"cake",img:"img/pexels-christina-polupanova-138429930-10281287.jpg"},
{name:"دونات",price:25,cat:"donut",img:"img/pexels-diva-plavalaguna-5711231.jpg"},
{name:"دونات شوكولاتة",price:30,cat:"donut",img:"img/pexels-nestor-cortez-341956-1131810.jpg"},
{name:"آيس كريم",price:30,cat:"ice",img:"img/pexels-gustavoraton-6441136.jpg"},
{name:"آيس كريم شوكولاتة",price:35,cat:"ice",img:"img/pexels-mccutcheon-1191639.jpg"},
{name:"كيك شوكولاتة",price:50,cat:"cake",img:"img/pexels-ali-dashti-506667798-29177177.jpg"},
{name:"تشيز كيك",price:60,cat:"cake",img:"img/pexels-biannkbya-19897304.jpg"},
{name:"براونيز",price:40,cat:"cake",img:"img/pexels-christina-polupanova-138429930-10281287.jpg"},
{name:"دونات",price:25,cat:"donut",img:"img/pexels-diva-plavalaguna-5711231.jpg"},
{name:"دونات شوكولاتة",price:30,cat:"donut",img:"img/pexels-nestor-cortez-341956-1131810.jpg"},
{name:"آيس كريم",price:30,cat:"ice",img:"img/pexels-gustavoraton-6441136.jpg"},
{name:"آيس كريم شوكولاتة",price:35,cat:"ice",img:"img/pexels-mccutcheon-1191639.jpg"},
]

let cart={}
let currentCat="all"
/* slider */

let slides=document.querySelectorAll(".slide")
let currentSlide=0

setInterval(()=>{

slides[currentSlide].classList.remove("active")

currentSlide++

if(currentSlide>=slides.length){
currentSlide=0
}

slides[currentSlide].classList.add("active")

},3000)
function renderProducts(){

let search=document.getElementById("search").value.toLowerCase()

let html=""

products.forEach((p,i)=>{

if((currentCat=="all"||p.cat==currentCat) && p.name.toLowerCase().includes(search)){

html+=`

<div class="card">

<img src="${p.img}">

<h3>${p.name}</h3>

<div class="price">${p.price} جنيه</div>

<div class="qty">
<button onclick="changeQty(${i},-1)">-</button>
<span id="qty${i}">0</span>
<button onclick="changeQty(${i},1)">+</button>
</div>

<button class="order" onclick="addToCart(${i})">
إضافة للسلة
</button>

</div>

`
}

})

document.getElementById("products").innerHTML=html

}

function changeQty(i,v){

let el=document.getElementById("qty"+i)
let q=parseInt(el.innerText)+v

if(q<0)q=0

el.innerText=q

}
function showToast(msg){

let toast=document.getElementById("toast")

toast.innerText=msg

toast.classList.add("show")

setTimeout(()=>{
toast.classList.remove("show")
},2500)

}
// function addToCart(i){

// let q=parseInt(document.getElementById("qty"+i).innerText)

// if(q==0)return

// cart[i]=(cart[i]||0)+q

// updateCart()

// }
function addToCart(i){

let q=parseInt(document.getElementById("qty"+i).innerText)

if(q==0){
showToast("⚠ برجاء تحديد الكمية")
return
}

cart[i]=(cart[i]||0)+q

updateCart()

showToast("✅ تم إضافة المنتج إلى السلة")

document.getElementById("qty"+i).innerText=0

}
function updateCart(){

let html=""
let count=0
let total=0

for(let i in cart){

let p=products[i]

count+=cart[i]

total+=p.price*cart[i]

// html+=`
// <div class="cart-item">
// ${p.name} × ${cart[i]}
// <button class="remove" onclick="removeItem(${i})">X</button>
// </div>
// `
html+=`
<div class="cart-item">

<img src="${p.img}">

<div class="cart-info">
<div class="cart-name">${p.name}</div>
<div class="cart-qty">الكمية: ${cart[i]}</div>
</div>

<button class="remove" onclick="removeItem(${i})">✖</button>

</div>
`
}

document.getElementById("cartItems").innerHTML=html
document.getElementById("cartCount").innerText=count
document.getElementById("totalPrice").innerText=total

}
document.querySelector(".cart-icon").classList.add("bump")

setTimeout(()=>{
document.querySelector(".cart-icon").classList.remove("bump")
},300)
function removeItem(i){

delete cart[i]

updateCart()

}

function clearCart(){

cart={}
updateCart()

}

function toggleCart(){

let box=document.getElementById("cartBox")

box.style.display=box.style.display=="block"?"none":"block"

}

function filterCat(c){

currentCat=c

renderProducts()

}

document.getElementById("search").addEventListener("keyup",renderProducts)

// function sendWhats(){

// let text="طلب جديد:%0A"

// for(let i in cart){

// let p=products[i]

// text+=p.name+" × "+cart[i]+"%0A"

// }

// text+="%0Aالإجمالي: "+document.getElementById("totalPrice").innerText+" جنيه"

// window.open(`https://wa.me/${phone}?text=${text}`)

// }

// renderProducts()
function sendWhats(){

let name=document.getElementById("custName").value
let address=document.getElementById("custAddress").value
let delivery=document.getElementById("delivery").value
let payment=document.getElementById("payment").value

if(name=="" || address==""){
showToast("⚠ من فضلك اكتب الاسم والعنوان")
return
}

let text="طلب جديد من الموقع:%0A%0A"

text+="الاسم: "+name+"%0A"
text+="العنوان: "+address+"%0A"
text+="طريقة الاستلام: "+delivery+"%0A"
text+="طريقة الدفع: "+payment+"%0A"

text+="%0A------ الطلب ------%0A"

for(let i in cart){

let p=products[i]

text+=p.name+" × "+cart[i]+"%0A"

}

text+="%0Aالإجمالي: "+document.getElementById("totalPrice").innerText+" جنيه"

window.open(`https://wa.me/${phone}?text=${text}`,"_blank")

}
renderProducts()