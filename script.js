Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div id="product">
      <div class="product-image">
        <img :src="image" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory < 10 && inventory > 0">Almost sale</p>
        <p v-else>Out Of stock</p>
        <p v-show="onSale">On Sale</p>
        <p>Shipping: {{shipping}} </p>
        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div v-for="(variant,index) in variants" :key="variant.id" class="color-box" :style="{ backgroundColor: variant.color }"
          @mouseover="updateProduct(index)">
        </div>
        <div id="buy">
          <button v-on:click="addToCart()" class="btn" :disabled="!inStock" :class="{disabledButton: !inStock}">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
      product: "Socks",
      brand: "Kamil Store",
      selectedVariant: 0,
      onSale: false,
      details: [
        'Super-natural',
        '100% cotton'
      ],
      variants: [{
        id: 1,
        color: "blue",
        image: "./assets/socks1.jpg",
        quanity: 0
      }, {
        id: 2,
        color: "green",
        image: "./assets/socks2.jpg",
        quanity: 10
      }],
    }
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-card', this.variants[this.selectedVariant]);
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title: function () {
      return this.brand + ' ' + this.product;
    },
    image: function () {
      return this.variants[this.selectedVariant].image;
    },
    inventory: function () {
      return this.variants[this.selectedVariant].quanity;
    },
    inStock: function () {
      return this.variants[this.selectedVariant].quanity > 0;
    },
    shipping: function () {
      if (this.premium == true) {
        return "free"
      }
      return 2.99
    }
  }
});





var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart: function (object) {
      this.cart.push(object)

    }
  },
  computed: {
    cartLength: function () {
      return this.cart.length
    }
  }

});