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
   }
};

export default summaryApi;