<script setup>
import { ref } from "vue";
import { useCart } from "./composables/useCart";
import ComposablesVsPiniaDemo from "./components/ComposablesVsPiniaDemo.vue";
import MemoryLeakDemo from "./components/MemoryLeakDemo.vue";

// 切換顯示模式：'cart' | 'demo' | 'memory'
const viewMode = ref("cart");

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
  <!-- 切換按鈕 -->
  <div class="fixed top-4 right-4 z-50 flex gap-2">
    <button
      @click="viewMode = 'cart'"
      class="px-4 py-2 rounded-lg shadow-lg font-semibold transition-colors"
      :class="
        viewMode === 'cart'
          ? 'bg-green-500 text-white'
          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
      "
    >
      購物車
    </button>
    <button
      @click="viewMode = 'demo'"
      class="px-4 py-2 rounded-lg shadow-lg font-semibold transition-colors"
      :class="
        viewMode === 'demo'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
      "
    >
      示範
    </button>
    <button
      @click="viewMode = 'memory'"
      class="px-4 py-2 rounded-lg shadow-lg font-semibold transition-colors"
      :class="
        viewMode === 'memory'
          ? 'bg-red-500 text-white'
          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
      "
    >
      記憶體測試
    </button>
  </div>

  <!-- 示範組件：Composables vs Pinia -->
  <ComposablesVsPiniaDemo v-if="viewMode === 'demo'" />

  <!-- 記憶體示範組件 -->
  <MemoryLeakDemo v-if="viewMode === 'memory'" />

  <!-- 原本的購物車 -->
  <section v-if="viewMode === 'cart'" class="products max-w-md mx-auto p-4">
    <header class="section-header text-center mb-4">
      <h2 class="text-lg font-semibold">商品列表</h2>
      <p class="subtitle text-sm text-gray-500">固定假資料示意</p>
    </header>

    <div class="space-y-4">
      <article
        class="border rounded-lg p-4 bg-white"
        v-for="item in products"
        :key="item.id"
      >
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
          @click="addCart(item)"
        >
          加入購物車
        </button>
      </article>
    </div>

    <div class="text-center text-sm text-gray-500 py-10">載入中…</div>

    <div class="cart-list mt-8">
      <h3 class="text-lg font-semibold mb-3">購物車</h3>
      <div v-if="cartList.length" class="space-y-3">
        <div
          class="cart-item border rounded p-3"
          v-for="item in cartList"
          :key="item.id"
        >
          <div class="cart-item-name font-medium">{{ item.name }}</div>
          <div class="cart-item-price text-sm text-gray-700">
            單價：NT${{ item.price }}
          </div>
          <div class="cart-item-quantity text-sm">
            <div class="flex border justify-start items-center gap-3">
              <span class="text-xl">數量：{{ item.quantity }}</span>

              <button
                class="bg-amber-600 w-[50px] h-[30px] rounded-xl flex justify-center items-center"
                @click="reduceQuantity(item)"
              >
                <i class="fa-solid fa-minus"></i>
              </button>

              <button
                class="bg-amber-600 w-[50px] h-[30px] rounded-xl flex justify-center items-center"
                @click="addQuantity(item)"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="cart-item-subtotal text-sm">
            小計：NT${{ item.quantity * item.price }}
          </div>
        </div>
        <div class="cart-total border rounded p-3 bg-gray-50">
          購物車金額總額：NT${{ cartAllTotal }}
        </div>
      </div>

      <div
        v-else
        class="cart-total border rounded p-3 text-gray-600 bg-gray-50"
      >
        購物車是空的
      </div>
    </div>
  </section>
</template>
