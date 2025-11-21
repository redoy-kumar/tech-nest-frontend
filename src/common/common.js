const backendDomain = "http://localhost:8080";

const summaryApi = {
   signUp: {
      url: `${backendDomain}/api/signup`,
      method: "POST",
      description: "User sign up",
   },
   signIn: {
      url: `${backendDomain}/api/signin`,
      method: "POST",
      description: "User sign in",
   },
   currentUser: {
      url: `${backendDomain}/api/user-details`,
      method: "GET",
      description: "Fetch user details",
   },
   logoutUser: {
      url: `${backendDomain}/api/user-logout`,
      method: "GET",
      description: "User logout",
   },
   allUser: {
      url: `${backendDomain}/api/allUsers`,
      method: "GET",
      description: "Users details",
   },
   updateUser: {
      url: `${backendDomain}/api/update-user`,
      method: "POST",
      description: "Update user details",
   },
   uploadProduct: {
      url: `${backendDomain}/api/upload-product`,
      method: "POST",
      description: "Upload product details",
   },
   allProduct: {
      url: `${backendDomain}/api/get-product`,
      method: "GET",
      description: "All product details",
   },
   updateProduct: {
      url: `${backendDomain}/api/update-product`,
      method: "POST",
      description: "Update product details",
   },
   categoryProduct: {
      url: `${backendDomain}/api/get-category-product`,
      method: "GET",
      description: "Get product category",
   },
   categoryWiseProduct: {
      url: `${backendDomain}/api/category-wise-product`,
      method: "POST",
      description: "Get category wise product",
   },
   productDetails: {
      url: `${backendDomain}/api/product-details`,
      method: "POST",
      description: "Get product details by id",
   },
   addToCartProduct: {
      url: `${backendDomain}/api/add-to-cart`,
      method: "POST",
      description: "Add to cart by id",
   },
   countAddToCartProduct: {
      url: `${backendDomain}/api/countAddToCart`,
      method: "GET",
      description: "Count add to cart by id",
   },
   viewAddToCartProduct: {
      url: `${backendDomain}/api/view-cart-product`,
      method: "GET",
      description: "View all add to cart product according to user id",
   },
   updateAddToCartProduct: {
      url: `${backendDomain}/api/update-cart-product`,
      method: "POST",
      description: "Update add to cart product according to user id",
   },
   deleteAddToCartProduct: {
      url: `${backendDomain}/api/delete-cart-product`,
      method: "POST",
      description: "Update add to cart product according to user id",
   },
   searchProduct: {
      url: `${backendDomain}/api/search-product`,
      method: "GET",
      description: "Search product",
   },
   filterProduct: {
      url: `${backendDomain}/api/filter-product`,
      method: "POST",
      description: "Filter products by category",
   }
};

export default summaryApi;