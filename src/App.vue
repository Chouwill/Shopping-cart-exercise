<script setup>
import { useCart } from "./composables/useCart";

// console.log(useCart);

// console.log(useCart.products);

const {
  products,
  cartList,
  cartTotal,
  addCart,
  addQuantity,
  reduceQuantity,
  cartAllTotal,
} = useCart();

console.log(products.rawValue);
console.log(products.value);
</script>

<template>
  <section class="products max-w-md mx-auto p-4">
    <header class="section-header text-center mb-4">
      <h2 class="text-lg font-semibold">商品列表</h2>
      <p class="subtitle text-sm text-gray-500">固定假資料示意</p>
    </header>

    <div class="space-y-4">
      <article class="border rounded-lg p-4 bg-white" v-for="item in products">
        <div class="thumb w-full h-40 overflow-hidden rounded">
          <img
            :src="item.image_url"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>

        <div class="info mt-3">
          <h3 class="title text-base font-medium">{{ item.name }}</h3>
          <p class="price text-gray-700 mt-1">NT${{ item.price }}</p>
        </div>

        <button
          class="add mt-3 w-full border rounded py-2 text-sm hover:bg-gray-50 hover:bg-sky-700"
        >
          加入購物車
        </button>
      </article>
    </div>

    <div class="text-center text-sm text-gray-500 py-10">載入中…</div>

    <div class="cart-list mt-8">
      <h3 class="text-lg font-semibold mb-3">購物車</h3>
      <div class="space-y-3">
        <div class="cart-item border rounded p-3">
          <div class="cart-item-name font-medium"></div>
          <div class="cart-item-price text-sm text-gray-700">單價：NT$</div>
          <div class="cart-item-quantity text-sm">
            <div class="flex border justify-start items-center gap-3">
              <span class="text-xl">數量：</span>

              <button
                class="bg-amber-600 w-[50px] h-[30px] rounded-xl flex justify-center items-center"
              >
                <i class="fa-solid fa-minus"></i>
              </button>

              <button
                class="bg-amber-600 w-[50px] h-[30px] rounded-xl flex justify-center items-center"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="cart-item-subtotal text-sm">小計：NT$</div>
        </div>
        <div class="cart-total border rounded p-3 bg-gray-50">
          購物車金額總額：NT$
        </div>
      </div>

      <div class="cart-total border rounded p-3 text-gray-600 bg-gray-50">
        購物車是空的
      </div>
    </div>
  </section>
</template>
