import { ref, computed } from "vue";
import axios from "axios";
export const useCart = () => {
  const products = ref(null);
  const cartList = ref([]); // 儲存購物車項目
  const cartTotal = ref(0); // 購物車總計

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

  function addQuantity(item) {
    console.log(item.quantity++);

    console.log(cartList.value.quantity);
  }
  function reduceQuantity(item) {
    if (item.quantity <= 1) {
      item.quantity = 0;
    } else {
      console.log(item.quantity--);
    }

    console.log(cartList.value.quantity);
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

  return {
    products,
    cartList,
    cartTotal,
    addCart,
    addQuantity,
    reduceQuantity,
    cartAllTotal,
  };
};
