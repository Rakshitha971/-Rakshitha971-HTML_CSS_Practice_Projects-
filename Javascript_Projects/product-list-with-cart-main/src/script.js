'use strict'

const addToCartBtn = document.querySelectorAll('.add-to-cart-button')
const cartItems = document.querySelector('.cart h3')
const cartContainer = document.querySelector('.cartitem-container')
const delivery = cartContainer.querySelector('.delivery')
const confirmBtn = cartContainer.querySelector('.confirm-btn')
const orderTotal = document.querySelector('.total-calc')

let totalCartQuantity = 0
let cartProduct = []

//Updating the Cart display
const updateTotalCartQuantity = () => {
  const cartElement = document.querySelector('.cart h3 span')
  cartElement.innerText = totalCartQuantity
}

const updateProductList = () => {
  const cartList = document.querySelector('.cart .cart-list')
  const emptyCart = document.querySelector('.cart-items')
  if (cartProduct.length === 0) {
    emptyCart.classList.remove('hidden')
    orderTotal.classList.remove('flex')
    orderTotal.classList.add('hidden')
    delivery.classList.remove('flex')
    delivery.classList.add('hidden')
    confirmBtn.classList.add('hidden')
    cartList.innerHTML = ''
    return
  }

  emptyCart.classList.add('hidden')
  delivery.classList.add('flex')
  delivery.classList.remove('hidden')
  orderTotal.classList.add('flex')
  orderTotal.classList.remove('hidden')
  confirmBtn.classList.remove('hidden')

  const HTMLElement = cartProduct
    .map(
      (product) =>
        `
  <div class="bg-white  max-w-[280px] md:min-w-[300px] flex justify-between items-center p-2">
        <div class="flex flex-col w-[90%]">
            <p class="text-rose-950 text-xs product-name" >${product.Pname}</p>
            <div class="amount-breakdown flex w-[50%] justify-between">
                <span class="no-of-items text-[#c73a0f] font-medium"><span>${product.Pquantity}</span>x</span>
                <span class="price text-[#a09996] font-medium">@<span>${product.Pprice}</span></span>
                <span class="net-price text-[#6b5b54] font-medium">$<span>${(product.Pquantity * parseFloat(product.Pprice)).toFixed(2)}</span></span>
            </div>
        </div>
        <button class=" w-6 h-6 text-lg rounded-full  text-slate-500 flex justify-center items-center delete-product" data-product-id="${product.pid}">
            <i class="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
    <hr>
  `
    )
    .join('')

  cartList.innerHTML = HTMLElement

  // Calculating total amount in Cart
  let sum = 0
  const netPrices = document.querySelectorAll('.net-price span')
  netPrices.forEach((price) => {
    sum += parseFloat(price.textContent)
  })
  let TotalCost = sum.toFixed(2)
  // cartProduct.orderTotal = TotalCost
  // localStorage.setItem('cartProduct',cartProduct)
  // console.log(TotalCost)

  orderTotal.querySelector('.total span').textContent = TotalCost

  //Add event Listeners for delete buttons
  const deleteBtn = document.querySelectorAll('.delete-product')
  deleteBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = e.currentTarget.dataset.productId
      cartProduct = cartProduct.filter((item) => {
        return item.pid !== productId
      })

      //Find the product  card in DOM
      const card = document.querySelector(
        `.product-details[data-pid="${productId}"]`
      )
      const minusPlusBtn = card.querySelector('.minus-plus-btn')
      const productCard = card.querySelector('.add-to-cart-button')

      // Hide the minusPlusBtn and show the productCard
      minusPlusBtn.classList.remove('flex')
      minusPlusBtn.classList.add('hidden')
      productCard.classList.remove('hidden')

      //update cart in local storage
      localStorage.setItem('cartProduct', JSON.stringify(cartProduct))

      //update cart display
      updateProductList()
      totalCartQuantity = cartProduct.reduce((sum, item) => {
        return sum + item.Pquantity
      }, 0)
      updateTotalCartQuantity()
    })
  })
}

// On clicking Add to Cart Button
addToCartBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    // debugger
    const card = e.currentTarget.closest('.product-details')
    const productCard = card.querySelector('.add-to-cart-button')
    const minusPlusBtn = card.querySelector('.minus-plus-btn')
    const ProductQuantityElement = minusPlusBtn.querySelector(
      '.minus-plus-btn .quantity span'
    )

    let productQuantity = 1
    const prodId = card.dataset.pid
    const prodDetails = {
      pid: prodId,
      Pname: card.querySelector('.product-name').innerText,
      Pprice: card.querySelector('.product-price span').innerText,
      Pquantity: productQuantity,
      orderTotal: document.querySelector('.total-calc .total span').innerText,
    }

    // Check if product already exists in the cart
    const prodIndex = cartProduct.findIndex((item) => item.pid === prodId)

    // updating the count of Product quantity and cart
    if (prodIndex === -1) {
      cartProduct.push(prodDetails)
    } else {
      cartProduct[prodIndex].Pquantity += 1
    }

    ProductQuantityElement.innerText = productQuantity
    totalCartQuantity += 1
    updateTotalCartQuantity()

    localStorage.setItem('cartProduct', JSON.stringify(cartProduct))

    // Hide and display the Add to to cart and +/- buttons
    productCard.classList.add('hidden')
    minusPlusBtn.classList.add('flex')
    minusPlusBtn.classList.remove('hidden')

    // Increment and Decrement the Quantity
    const decrementBtn = minusPlusBtn.querySelector('.decrement-btn')
    const incrementBtn = minusPlusBtn.querySelector('.increment-btn')

    //Decrementing the product Quantity
    decrementBtn.addEventListener('click', () => {
      if (productQuantity <= 0) {
        updateTotalCartQuantity()
        minusPlusBtn.classList.remove('flex')
        minusPlusBtn.classList.add('hidden')
        productCard.classList.remove('hidden')
        delivery.classList.remove('flex')
        delivery.classList.add('hidden')
        cartProduct = cartProduct.filter((item) => item.pid !== prodDetails.pid)
        localStorage.setItem('cartProduct', JSON.stringify(cartProduct))
      } else {
        productQuantity--
        totalCartQuantity -= 1
        updateTotalCartQuantity()
        const productIndex = cartProduct.findIndex(
          (item) => item.id === prodDetails.id
        )
        if (productIndex !== -1) {
          cartProduct[productIndex].Pquantity = productQuantity
          localStorage.setItem('cartProduct', JSON.stringify(cartProduct))
        }

        updateProductList()
        ProductQuantityElement.textContent = productQuantity
      }
    })

    //Incrementing the product Quantity
    incrementBtn.addEventListener('click', (e) => {
      if (productQuantity >= 0) {
        productQuantity++
        totalCartQuantity += 1
        updateTotalCartQuantity()
        updateProductList()
        ProductQuantityElement.textContent = productQuantity
        const productIndex = cartProduct.findIndex(
          (item) => item.pid === prodDetails.pid
        )
        if (productIndex !== -1) {
          cartProduct[productIndex].Pquantity = productQuantity
          localStorage.setItem('cartProduct', JSON.stringify(cartProduct))
        }

        updateProductList()
        ProductQuantityElement.textContent = productQuantity
      }
    })

    updateProductList()
  })
})

// ON clicking Confirm button in Cart

confirmBtn.addEventListener('click', () => {
  const overlay = document.querySelector('.overlay')
  overlay.classList.remove('hidden')

  const confirmPopUP = `
    <div class="confirm-popup p-2 ">
        <div class="confirm-popup-container  max-w-[360px] mx-auto p-4 bg-white rounded-lg mt-[100px]">
            <div class="flex  justify-between items-center">
            <img src="/assets/images/icon-order-confirmed.svg" alt="" class="w-[32px]">
            <div class="close-Btn"> <i class="fa-regular fa-circle-xmark "></i></div>
            </div>
            <p class="text-[36px] font-bold mt-2 mb-1">Order Confirmed</p>
            <p class="text-[14px] text-[#a09a9a] font-medium mb-3">We hope you enjoy your food!</p>
            <div class="product-list bg-[#fcf8f5] p-2">
                
            </div>
            <div class="total-calc p-2 justify-between items-center hidden">
                    <p class="text-xs text-[#82706C]">Order Total</p>
                    <span class='total font-bold !text-[#161110]'>$<span>100.00</span></span>
                </div>
            <div class="bg-[#d42825e1] p-2 rounded-full text-center text-[#dfdcdc] font-medium">
                <button>Start New Order</button>
            </div>
        </div>
    </div>
  `

  overlay.innerHTML = confirmPopUP
  // document
  //   .querySelector('.confirm-popup-container .total-calc')
  //   .classList.remove('hidden')
  // document
  //   .querySelector('.confirm-popup-container .total-calc')
  //   .classList.add('flex')

  updateProductsInPopUp()
})

// document.querySelector('.close-Btn').addEventListener('click',()=>{
//   document
//     .querySelector('.confirm-popup-container .total-calc')
//     .classList.remove('flex')
//   document
//     .querySelector('.confirm-popup-container .total-calc')
//     .classList.add('hidden')
// })
const updateProductsInPopUp = () => {
  const productsInPopUp = document.querySelector('.product-list')

  productsInPopUp.innerHTML = cartProduct
    .map((item) => {
      console.log(item)
      return `
  <div class="max-w-[280px] md:min-w-[300px] flex justify-between items-center gap-2 my-2">
                      <img src="/assets/images/image-waffle-thumbnail.jpg" alt="waffle-thumbnail" class="w-[32px]">
                      <div class="flex flex-col w-[90%]">
                          <p class="text-rose-950 text-xs">${item.Pname}</p>
                          <div class="amount-breakdown flex w-[50%] gap-3">
                              <span class="no-of-items text-[#c73a0f] font-medium"><span>${item.Pquantity}</span>x</span>
                              <span class="price text-[#a09996] font-medium">@<span>${item.Pprice}</span></span>
                          </div>
                      </div>
                      <div>
                      <span class="net-price text-[#6b5b54] font-medium">$<span>6.50</span></span>
                      </div>
                  </div>
                  <hr>`
    })
    .join('')

  console.log(productsInPopUp)
}

// Load cart products from localStorage on page load

window.addEventListener('DOMContentLoaded', () => {
  const savedProducts = localStorage.getItem('cartProduct')

  if (savedProducts) {
    cartProduct = JSON.parse(savedProducts)
    totalCartQuantity = cartProduct.reduce(
      (sum, item) => sum + item.Pquantity,
      0
    )
    updateProductList()
    updateTotalCartQuantity()
  }
})
