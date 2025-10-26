import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cartItem", () => {
  const cartList = ref([]); // 儲存購物車項目
  const cartTotal = ref(0); // 購物車總計
  const coupons = ref([
    { id: 1, name: "折50元", code: "SALE50", discount: 50, type: "fixed" },
    { id: 2, name: "折100元", code: "SALE100", discount: 100, type: "fixed" },
    { id: 3, name: "打9折", code: "SALE10OFF", discount: 0.9, type: "percent" },
    { id: 4, name: "打8折", code: "SALE20OFF", discount: 0.8, type: "percent" },
    { id: 5, name: "滿1000折200", code: "SALE200", discount: 200, type: "fixed", condition: 1000 },
  ]);
  // 優惠卷
  // 點數

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

  return { cartList, addCart, cartAllTotal };
});
