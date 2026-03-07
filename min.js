
let phone="2001221183490"

let products=[
    // سابية و بسكوت
{name:"ك سابلية ",price:350,cat:"salbleh",img:"img/photo_5859211956374408381_y.jpg"},
{name:"ك بسكوت سادة",price:285,cat:"salbleh",img:"img/photo_5859211956374408379_y.jpg"},
{name:"ك يسكوت نص و نص",price:330,cat:"salbleh",img:"img/photo_5859211956374408384_y.jpg"},
{name:"ك بسكوت باميو",price:300,cat:"salbleh",img:"img/photo_5859211956374408385_y.jpg"},
{name:"ك بسكوت قهوة",price:300,cat:"salbleh",img:"img/photo_5859211956374408380_y (1).jpg"},
{name:"ك بسكوت ميلكا",price:350,cat:"salbleh",img:"img/photo_5859211956374408377_y.jpg"},
{name:"ك سكوت شوكلاتة",price:325,cat:"salbleh",img:"img/hq720.jpg"},

// بيتيفورد
{name:"ك بتيفور سادة بدون مكسرات",price:300,cat:"betefor",img:"img/photo_5859211956374408375_y.jpg"},
{name:"ك بتيفور مشكل مكسرات",price:350,cat:"betefor",img:"img/photo_5859211956374408378_y.jpg"},
// كعك
{name:"ك كعك سادة",price:300,cat:"ka3k",img:"img/6402101893998202503140922152215.jpg"},
{name:"ك كعك ملبن ",price:300,cat:"ka3k",img:"img/image.jpg"},
{name:"ك كعك بندق",price:350,cat:"ka3k",img:"img/4133317511711717296.jpg"},
{name:"ك كعك عين جمل",price:350,cat:"ka3k",img:"img/Cooki-man8974_Copy_e14b7884-b0a0-44e6-b5f0-79c4d7421e64.jpg"},
{name:"ك كعك عين جمل ملبن ",price:350,cat:"ka3k",img:"img/image.jpg"},
{name:"ك كعك بندق مع ملبن ",price:350,cat:"ka3k",img:"img/93.jpg"},
// غريبة
{name:"ك غريبة لولى",price:290,cat:"gryba",img:"img/MG_0122-1.jpg"},
{name:"ك غريبة بندق",price:330,cat:"gryba",img:"img/maxresdefault.jpg"},
{name:"ك غريبة فسندق",price:370,cat:"gryba",img:"img/176-100503-modus-operandi-petit-four-eid-fitr-2021_700x400.jpg"},
{name:"ك غريبة لوز",price:350,cat:"gryba",img:"img/16941144789437202403291256175617.jpg"},
// مشكل
{name:"ك مشكل ",price:330,cat:"mshkel",img:"img/مخبوزات-العيد-1.jpg"},
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
add to cart
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


html+=`
<div class="cart-item">

<img src="${p.img}">

<div class="cart-info">
<div class="cart-name">${p.name}</div>
<div class="cart-qty">  الكمية ب الكيلو: ${cart[i]}</div>
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


