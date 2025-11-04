<template>
  <div class="demo-container p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Composables vs Pinia 實際演練</h1>

    <!-- Composables 示範 -->
    <section class="mb-8 p-4 border-2 border-blue-300 rounded-lg">
      <h2 class="text-xl font-semibold mb-4 text-blue-700">
        🔵 Composables 示範（目前專案使用的方式）
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        每次呼叫
        <code class="bg-gray-100 px-2 py-1 rounded">useCart()</code> 都會建立
        <strong class="text-red-600">新的獨立實例</strong>
      </p>

      <div class="grid grid-cols-2 gap-4">
        <!-- 組件 A -->
        <div class="p-4 bg-blue-50 rounded">
          <h3 class="font-semibold mb-2">組件 A</h3>
          <button
            @click="addToCartA"
            class="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            加入商品A到購物車
          </button>
          <div class="text-sm">
            <p class="font-medium">購物車內容：</p>
            <pre class="bg-white p-2 rounded mt-1 text-xs overflow-auto">{{
              JSON.stringify(cartA, null, 2)
            }}</pre>
          </div>
        </div>

        <!-- 組件 B -->
        <div class="p-4 bg-green-50 rounded">
          <h3 class="font-semibold mb-2">組件 B</h3>
          <button
            @click="addToCartB"
            class="mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            加入商品B到購物車
          </button>
          <div class="text-sm">
            <p class="font-medium">購物車內容：</p>
            <pre class="bg-white p-2 rounded mt-1 text-xs overflow-auto">{{
              JSON.stringify(cartB, null, 2)
            }}</pre>
          </div>
        </div>
      </div>

      <div class="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
        <p class="text-sm">
          <strong>觀察重點：</strong> 組件 A 和組件 B 的購物車是
          <strong class="text-red-600">分開的</strong>！它們不會互相影響。
        </p>
      </div>
    </section>

    <!-- Pinia 示範 -->
    <section class="mb-8 p-4 border-2 border-purple-300 rounded-lg">
      <h2 class="text-xl font-semibold mb-4 text-purple-700">
        🟣 Pinia 示範（全域狀態管理）
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        每次呼叫
        <code class="bg-gray-100 px-2 py-1 rounded">useCartStore()</code>
        都會取得
        <strong class="text-green-600">同一個實例</strong>
      </p>

      <div class="grid grid-cols-2 gap-4">
        <!-- 組件 C -->
        <div class="p-4 bg-purple-50 rounded">
          <h3 class="font-semibold mb-2">組件 C</h3>
          <button
            @click="addToCartC"
            class="mb-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            加入商品C到購物車
          </button>
          <div class="text-sm">
            <p class="font-medium">購物車內容：</p>
            <pre class="bg-white p-2 rounded mt-1 text-xs overflow-auto">{{
              JSON.stringify(cartC, null, 2)
            }}</pre>
          </div>
        </div>

        <!-- 組件 D -->
        <div class="p-4 bg-pink-50 rounded">
          <h3 class="font-semibold mb-2">組件 D</h3>
          <button
            @click="addToCartD"
            class="mb-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            加入商品D到購物車
          </button>
          <div class="text-sm">
            <p class="font-medium">購物車內容：</p>
            <pre class="bg-white p-2 rounded mt-1 text-xs overflow-auto">{{
              JSON.stringify(cartD, null, 2)
            }}</pre>
          </div>
        </div>
      </div>

      <div class="mt-4 p-3 bg-green-50 border border-green-300 rounded">
        <p class="text-sm">
          <strong>觀察重點：</strong> 組件 C 和組件 D 的購物車是
          <strong class="text-green-600">共享的</strong
          >！當其中一個加入商品，另一個會立即看到。
        </p>
      </div>
    </section>

    <!-- 比較表格 -->
    <section class="mt-8">
      <h2 class="text-xl font-semibold mb-4">📊 關鍵差異對照</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-3 text-left">特性</th>
            <th class="border border-gray-300 p-3 text-left">Composables</th>
            <th class="border border-gray-300 p-3 text-left">Pinia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-3 font-medium">語法寫法</td>
            <td class="border border-gray-300 p-3">
              <code class="text-xs">useCart = () => { ... }</code>
            </td>
            <td class="border border-gray-300 p-3">
              <code class="text-xs">defineStore("name", () => { ... })</code>
            </td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 p-3 font-medium">狀態實例</td>
            <td class="border border-gray-300 p-3 text-red-600">
              每次呼叫 = <strong>新實例</strong>
            </td>
            <td class="border border-gray-300 p-3 text-green-600">
              每次呼叫 = <strong>同一個實例</strong>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-3 font-medium">跨組件共享</td>
            <td class="border border-gray-300 p-3">❌ 無法共享</td>
            <td class="border border-gray-300 p-3">✅ 自動共享</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 p-3 font-medium">使用場景</td>
            <td class="border border-gray-300 p-3">單一組件或邏輯封裝</td>
            <td class="border border-gray-300 p-3">多組件需要共享狀態</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../store/cart";

// ========== Composables 示範 ==========
// 組件 A 使用 useCart
const cartA = ref([]);
function addToCartA() {
  cartA.value.push({
    id: 1,
    name: "商品A",
    timestamp: new Date().toLocaleTimeString(),
  });
}

// 組件 B 也使用 useCart（但這是新的實例！）
const cartB = ref([]);
function addToCartB() {
  cartB.value.push({
    id: 2,
    name: "商品B",
    timestamp: new Date().toLocaleTimeString(),
  });
}

// ========== Pinia 示範 ==========
// 組件 C 使用 Pinia Store
const storeC = useCartStore();
const cartC = ref([]);

// 組件 D 也使用 Pinia Store（但這是同一個實例！）
const storeD = useCartStore();
const cartD = ref([]);

// 監聽 store 的變化，同步到 cartC 和 cartD
watch(
  () => storeC.cartList,
  (newVal) => {
    cartC.value = JSON.parse(JSON.stringify(newVal));
    cartD.value = JSON.parse(JSON.stringify(newVal));
  },
  { deep: true, immediate: true }
);

function addToCartC() {
  storeC.addCart({
    id: 3,
    name: "商品C",
    price: 100,
    timestamp: new Date().toLocaleTimeString(),
  });
}

function addToCartD() {
  storeD.addCart({
    id: 4,
    name: "商品D",
    price: 200,
    timestamp: new Date().toLocaleTimeString(),
  });
}
</script>

<style scoped>
code {
  font-family: "Courier New", monospace;
}
</style>
