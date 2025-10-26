｀
<script setup>
//  購物車寫法    頁面撰寫 ---> Composables --- > Pinia
import axios from "axios";
import { onMounted, ref, computed } from "vue";

// 商品假資料列表
const products = ref(null);
const cartList = ref([]); // 儲存購物車項目
const cartTotal = ref(0); // 購物車總計

// const getProducts = () => {
//   return Promise.resolve([
//     {
//       id: 1,
//       name: "特調咖啡豆 A",
//       price: 299,
//       quantity: 0,
//       image: "https://picsum.photos/seed/582937/400/260",
//     },
//     {
//       id: 2,
//       name: "經典拿鐵 B",
//       price: 149,
//       quantity: 0,
//       image: "https://picsum.photos/seed/986321/400/260",
//     },
//     {
//       id: 3,
//       name: "抹茶拿鐵 C",
//       price: 169,
//       quantity: 0,
//       image: "https://picsum.photos/seed/285471/400/260",
//     },
//     {
//       id: 4,
//       name: "焦糖瑪奇朵 D",
//       price: 179,
//       quantity: 0,
//       image: "https://picsum.photos/seed/742915/400/260",
//     },
//     {
//       id: 5,
//       name: "冷萃咖啡 E",
//       price: 129,
//       quantity: 0,
//       image: "https://picsum.photos/seed/194835/400/260",
//     },
//     {
//       id: 6,
//       name: "濾掛咖啡 F",
//       price: 99,
//       quantity: 0,
//       image: "https://picsum.photos/seed/529761/400/260",
//     },
//   ]);
// };

async function getProducts() {
  try {
    const res = await axios.get(
      "https://gift-shop-backend-api.onrender.com/api/products/all"
    );
    console.log(res.data);
    console.log(res.data.items);
    products.value = res.data.items;
  } catch (e) {
    console.log(e);
  }
}
getProducts();

// onMounted(() => {
//   getProducts().then((data) => {
//     // console.log(data);
//     products.value = data;
//     console.log(products.value);
//   });
// });

// 加入購物車
function addCart(value) {
  console.log(value);
  // cartList.value.push(value);

  // cartList.value = [...cartList.value, value];

  const findItem = cartList.value.find((item) => item.id == value.id);

  console.log(findItem);

  if (findItem) {
    console.log("存在");
    findItem.quantity++;
  } else {
    console.log("不存在");
    cartList.value = [...cartList.value, { ...value, quantity: 1 }];
    console.log("原始", value);
    console.log("展開後：", { ...value, quantity: 1 });
  }
}

const cartAllTotal = computed(() => {
  let total = 0;
  for (let i = 0; i < cartList.value.length; i++) {
    console.log(cartList.value[i]);
    total += cartList.value[i].price * cartList.value[i].quantity;
    // total要被retirn
  }
  // 共計
  //  品項1 數量 * 單價 + 品項3 數量 * 單價
  return total;
});
</script>

<template>
  <section class="products max-w-md mx-auto p-4">
    <header class="section-header text-center mb-4">
      <h2 class="text-lg font-semibold">商品列表</h2>
      <p class="subtitle text-sm text-gray-500">固定假資料示意</p>
    </header>

    <div v-if="products?.length" class="space-y-4">
      <article
        v-for="item in products"
        :key="item.id"
        class="border rounded-lg p-4 bg-white"
      >
        <div class="thumb w-full h-40 overflow-hidden rounded">
          <img :src="item.image_url" alt="" class="w-full h-full object-cover" />
        </div>

        <div class="info mt-3">
          <h3 class="title text-base font-medium">{{ item.name }}</h3>
          <p class="price text-gray-700 mt-1">NT$ {{ item.price.toLocaleString() }}</p>
        </div>

        <button
          class="add mt-3 w-full border rounded py-2 text-sm hover:bg-gray-50 hover:bg-sky-700"
          @click="addCart(item)"
        >
          加入購物車
        </button>
      </article>
    </div>


    <div v-else class="text-center text-sm text-gray-500 py-10">
      載入中…
    </div>


    <div class="cart-list mt-8">
      <h3 class="text-lg font-semibold mb-3">購物車</h3>
      <div v-if="cartList.length" class="space-y-3">
        <div class="cart-item border rounded p-3" v-for="item in cartList" :key="item.id">
          <div class="cart-item-name font-medium">{{ item.name }}</div>
          <div class="cart-item-price text-sm text-gray-700">
            單價：NT$ {{ item.price.toLocaleString() }}
          </div>
          <div class="cart-item-quantity text-sm">數量：{{ item.quantity }}</div>
          <div class="cart-item-subtotal text-sm">
            小計：NT$ {{ (item.quantity * item.price).toLocaleString() }}
          </div>
        </div>
        <div class="cart-total border rounded p-3 bg-gray-50">
          購物車金額總額：NT$ {{ cartAllTotal.toLocaleString() }}
        </div>
      </div>

      <div v-else class="cart-total border rounded p-3 text-gray-600 bg-gray-50">
        購物車是空的
      </div>
    </div>
  </section>
</template>

