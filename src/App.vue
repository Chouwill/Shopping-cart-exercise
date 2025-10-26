｀
<script setup>
import { onMounted, ref } from "vue";
import { useCartStore } from "./store/cart";

const store = useCartStore();
// 商品假資料列表
const products = ref(null);

console.log("讀取Pinia購物車列表：", store.cartList);

const getProducts = () => {
  return Promise.resolve([
    {
      id: 1,
      name: "特調咖啡豆 A",
      price: 299,
      quantity: 0,
      image: "https://picsum.photos/seed/coffee1/400/260",
    },
    {
      id: 2,
      name: "經典拿鐵 B",
      price: 149,
      quantity: 0,
      image: "https://picsum.photos/seed/latte2/400/260",
    },
    {
      id: 3,
      name: "抹茶拿鐵 C",
      price: 169,
      quantity: 0,
      image: "https://picsum.photos/seed/matcha3/400/260",
    },
    {
      id: 4,
      name: "焦糖瑪奇朵 D",
      price: 179,
      quantity: 0,
      image: "https://picsum.photos/seed/caramel4/400/260",
    },
    {
      id: 5,
      name: "冷萃咖啡 E",
      price: 129,
      quantity: 0,
      image: "https://picsum.photos/seed/coldbrew5/400/260",
    },
    {
      id: 6,
      name: "濾掛咖啡 F",
      price: 99,
      quantity: 0,
      image: "https://picsum.photos/seed/drip6/400/260",
    },
  ]);
};

onMounted(() => {
  getProducts().then((data) => {
    // console.log(data);
    products.value = data;
    console.log(products.value);
  });
});
// 頁面撰寫 ---> Composables --- > Pinia
</script>

<template>
  <section class="products">
    <header class="section-header">
      <h2>商品列表</h2>
      <p class="subtitle">固定假資料示意</p>
    </header>

    <div class="product-grid">
      <article class="product-card" v-for="item in products" :key="item.id">
        <div
          class="thumb"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
        <div class="info">
          <h3 class="title">{{ item.name }}</h3>
          <p class="price">NT$ {{ item.price.toLocaleString() }}</p>
        </div>
        <button class="add" @click="store.addCart(item)">加入購物車</button>
      </article>
    </div>

    <div v-for="item in store.cartList">
      名稱：{{ item.name }} 價錢：{{ item.price }} 數量：{{
        item.quantity
      }}
      小計：{{ item.quantity * item.price }}
    </div>
    <div>購物車金額總額：{{ store.cartAllTotal }}元</div>
  </section>
</template>

<style scoped>
/* 版面配置 */
.shop-layout {
  display: grid;
  gap: 24px;
  align-items: start;
}

@media (min-width: 900px) {
  .shop-layout {
    grid-template-columns: 1fr 360px;
  }
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-header h2 {
  font-size: 20px;
  margin: 0;
}

.subtitle {
  opacity: 0.7;
  font-size: 12px;
}

/* 商品區域 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.product-card {
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  background: rgba(255, 255, 255, 0.04);
}

.thumb {
  width: 100%;
  padding-top: 62%; /* 16:10 */
  background-size: cover;
  background-position: center;
}

.info {
  padding: 12px 12px 0 12px;
}

.title {
  margin: 0 0 4px 0;
  font-size: 16px;
}

.price {
  margin: 0 0 12px 0;
  opacity: 0.9;
}

.add {
  width: calc(100% - 24px);
  margin: 0 12px 12px 12px;
}

/* 購物車區域 */
.cart {
  position: sticky;
  top: 24px;
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.04);
}

.empty {
  opacity: 0.6;
  margin: 12px 0;
}

.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  border: 1px dashed rgba(128, 128, 128, 0.25);
}

.item-main {
  display: grid;
}

.item-title {
  font-weight: 600;
}

.item-unit {
  opacity: 0.7;
  font-size: 12px;
}

.item-ctrls {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.qty {
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-weight: 600;
}

.remove {
  width: 32px;
  height: 32px;
  padding: 0;
}

.cart-summary {
  margin-top: 12px;
  display: grid;
  gap: 8px;
}

.cart-summary .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 8px;
}

.checkout {
  flex: 1;
}

.clear {
  background: transparent;
  border-color: rgba(128, 128, 128, 0.35);
}
</style>
