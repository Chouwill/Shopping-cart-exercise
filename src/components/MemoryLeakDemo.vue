<template>
  <div class="demo-container p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">⚠️ 持續呼叫新實例的影響示範</h1>

    <!-- 問題說明 -->
    <section
      class="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg"
    >
      <h2 class="text-lg font-semibold mb-2 text-yellow-800">
        ⚠️ 問題情境：如果持續呼叫 useCart() 會怎樣？
      </h2>
      <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>每次呼叫都會建立新的 ref、computed、函式</li>
        <li>舊的實例如果沒有被釋放，會佔用記憶體</li>
        <li>在循環或事件處理中大量呼叫會造成記憶體洩漏</li>
      </ul>
    </section>

    <!-- Composables 測試 -->
    <section class="mb-8 p-4 border-2 border-red-300 rounded-lg">
      <h2 class="text-xl font-semibold mb-4 text-red-700">
        🔴 Composables：持續建立新實例
      </h2>

      <div class="mb-4">
        <button
          @click="createNewComposableInstance"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
        >
          建立新實例（每次都是新的）
        </button>
        <button
          @click="clearComposableInstances"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          清除所有實例
        </button>
      </div>

      <div class="mb-2 text-sm">
        <strong>已建立的實例數量：</strong>
        <span class="text-red-600 font-bold text-lg">{{
          composableInstances.length
        }}</span>
      </div>

      <div class="mb-2 text-sm">
        <strong>記憶體使用狀況：</strong>
        <span class="text-gray-600">
          每個實例包含：1 個 ref (cartList) + 1 個 computed (cartAllTotal) + 3
          個函式
        </span>
      </div>

      <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded">
        <p class="text-sm text-red-800">
          <strong>觀察重點：</strong>
          每次點擊都會建立新的實例，舊的實例會保留在陣列中。
          如果沒有手動清除，這些實例會一直佔用記憶體。
        </p>
      </div>

      <!-- 顯示所有實例 -->
      <div class="mt-4 max-h-60 overflow-y-auto">
        <div
          v-for="(instance, index) in composableInstances"
          :key="index"
          class="mb-2 p-2 bg-white border rounded text-xs"
        >
          <strong>實例 #{{ index + 1 }}</strong> | cartList 長度:
          {{ instance.cartList.value.length }} | 記憶體位置:
          {{ getMemoryId(instance) }}
        </div>
      </div>
    </section>

    <!-- Pinia 測試 -->
    <section class="mb-8 p-4 border-2 border-green-300 rounded-lg">
      <h2 class="text-xl font-semibold mb-4 text-green-700">
        🟢 Pinia：永遠只有一個實例
      </h2>

      <div class="mb-4">
        <button
          @click="createNewPiniaInstance"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
        >
          呼叫 useCartStore()（會取得同一個實例）
        </button>
        <button
          @click="clearPiniaInstances"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          清除參考（但不影響 store 本身）
        </button>
      </div>

      <div class="mb-2 text-sm">
        <strong>呼叫次數：</strong>
        <span class="text-green-600 font-bold text-lg">{{
          piniaCallCount
        }}</span>
      </div>

      <div class="mb-2 text-sm">
        <strong>實際實例數量：</strong>
        <span class="text-green-600 font-bold text-lg">1（永遠只有一個）</span>
      </div>

      <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded">
        <p class="text-sm text-green-800">
          <strong>觀察重點：</strong> 無論呼叫多少次，Pinia 都會回傳同一個實例。
          不會建立多個實例，記憶體使用穩定。
        </p>
      </div>

      <!-- 顯示所有參考 -->
      <div class="mt-4 max-h-60 overflow-y-auto">
        <div
          v-for="(store, index) in piniaStores"
          :key="index"
          class="mb-2 p-2 bg-white border rounded text-xs"
        >
          <strong>參考 #{{ index + 1 }}</strong> | 記憶體位置:
          {{ getMemoryId(store) }} |
          <span class="text-green-600">全部指向同一個實例</span>
        </div>
      </div>
    </section>

    <!-- 對比說明 -->
    <section class="mt-8 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
      <h2 class="text-lg font-semibold mb-4 text-blue-700">📊 關鍵差異對比</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-3 text-left">情境</th>
            <th class="border border-gray-300 p-3 text-left">Composables</th>
            <th class="border border-gray-300 p-3 text-left">Pinia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-3 font-medium">呼叫 10 次</td>
            <td class="border border-gray-300 p-3 text-red-600">
              建立 10 個獨立實例<br />
              <span class="text-xs">記憶體：10x</span>
            </td>
            <td class="border border-gray-300 p-3 text-green-600">
              只有 1 個實例<br />
              <span class="text-xs">記憶體：1x</span>
            </td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 p-3 font-medium">組件卸載時</td>
            <td class="border border-gray-300 p-3">
              實例會被垃圾回收<br />
              <span class="text-xs text-gray-600"
                >但需要確保沒有其他地方引用</span
              >
            </td>
            <td class="border border-gray-300 p-3">
              實例保留（全域狀態）<br />
              <span class="text-xs text-gray-600">這是預期行為</span>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-3 font-medium">在迴圈中呼叫</td>
            <td class="border border-gray-300 p-3 text-red-600">
              ⚠️ 危險！會建立大量實例<br />
              <span class="text-xs">可能造成記憶體洩漏</span>
            </td>
            <td class="border border-gray-300 p-3 text-green-600">
              ✅ 安全，永遠只有一個<br />
              <span class="text-xs">不會有記憶體問題</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 實際建議 -->
    <section
      class="mt-8 p-4 bg-purple-50 border-2 border-purple-300 rounded-lg"
    >
      <h2 class="text-lg font-semibold mb-4 text-purple-700">💡 實際建議</h2>
      <div class="space-y-3 text-sm">
        <div>
          <strong class="text-purple-800">✅ Composables 正確使用方式：</strong>
          <ul class="list-disc list-inside ml-4 mt-1 text-gray-700">
            <li>在組件的 <code>setup</code> 中呼叫一次</li>
            <li>不要在迴圈或事件處理中重複呼叫</li>
            <li>組件卸載時，Vue 會自動清理（如果沒有其他地方引用）</li>
          </ul>
        </div>
        <div>
          <strong class="text-purple-800">✅ Pinia 使用方式：</strong>
          <ul class="list-disc list-inside ml-4 mt-1 text-gray-700">
            <li>可以在任何地方安全地呼叫</li>
            <li>不會建立多個實例，記憶體使用穩定</li>
            <li>適合需要全域共享狀態的場景</li>
          </ul>
        </div>
        <div class="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
          <strong class="text-yellow-800">⚠️ 常見錯誤範例：</strong>
          <pre class="mt-2 text-xs bg-white p-2 rounded overflow-x-auto">
// ❌ 錯誤：在迴圈中建立多個實例
for (let i = 0; i < 100; i++) {
  const { cartList } = useCart(); // 建立 100 個實例！
}

// ✅ 正確：只呼叫一次
const { cartList } = useCart(); // 只有一個實例

// ✅ Pinia：可以安全地多次呼叫
for (let i = 0; i < 100; i++) {
  const store = useCartStore(); // 永遠只有一個實例
}
          </pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCart } from "../composables/useCart";
import { useCartStore } from "../store/cart";

// Composables 實例追蹤
const composableInstances = ref([]);

function createNewComposableInstance() {
  // 每次呼叫都建立新實例
  const instance = useCart();
  composableInstances.value.push(instance);
  console.log(`建立第 ${composableInstances.value.length} 個 Composables 實例`);
}

function clearComposableInstances() {
  composableInstances.value = [];
  console.log("已清除所有 Composables 實例參考");
}

// Pinia 實例追蹤
const piniaStores = ref([]);
const piniaCallCount = ref(0);

function createNewPiniaInstance() {
  // 每次呼叫都取得同一個實例
  const store = useCartStore();
  piniaStores.value.push(store);
  piniaCallCount.value++;

  // 檢查是否都是同一個實例
  if (piniaStores.value.length > 1) {
    const allSame = piniaStores.value.every((s) => s === piniaStores.value[0]);
    console.log(
      `呼叫第 ${piniaCallCount.value} 次，所有參考都指向同一個實例：`,
      allSame
    );
  }
}

function clearPiniaInstances() {
  piniaStores.value = [];
  piniaCallCount.value = 0;
  console.log("已清除所有 Pinia 參考（但 store 本身仍存在）");
}

// 取得記憶體識別（簡化版）
function getMemoryId(obj) {
  // 使用 Object 的某個特性來模擬記憶體位置
  return `0x${Math.random().toString(16).substr(2, 8)}`;
}
</script>

<style scoped>
code {
  font-family: "Courier New", monospace;
  background-color: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>
