<script setup lang="ts">
import { apiGetCart } from '@/api/cart'
import type { CartInfo } from '@/types/cart'
import { onMounted, ref } from 'vue'

const cart = ref<CartInfo>({
  carts: [],
  total: 0,
  final_total: 0,
})

const getCart = async () => {
  try {
    const res = await apiGetCart()
    cart.value = res.data.data
  } catch (error) {
    alert('取得購物車失敗')
  }
}

onMounted(() => {
  getCart()
})
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white mt-n1 py-2 px-3 z-1"
    style="margin: 0 -0.75rem"
  >
    <RouterLink class="navbar-brand" to="/">
      <img
        class="img-fluid"
        style="width: 3.75rem; height: 3.75rem"
        src="../assets/images/logo.webp"
        alt="logo"
      />
    </RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <RouterLink class="nav-item nav-link me-4" to="/products">產品列表</RouterLink>
        <RouterLink class="d-md-none nav-item nav-link" to="/cart">購物車</RouterLink>
        <RouterLink class="d-none d-md-block nav-item nav-link" to="/cart"
          ><div className="position-relative">
            <i className="fas fa-shopping-cart"></i>
            <span
              class="position-absolute badge text-bg-dark rounded-circle"
              style="bottom: 12px; left: 12px"
              >{{ cart?.carts.length }}</span
            >
          </div></RouterLink
        >
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
