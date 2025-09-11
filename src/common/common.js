const backendDomain = "http://localhost:8080";

const summaryApi = {
   signUp:{
    url: `${backendDomain}/api/signup`,
    method: "POST",
    description: "User sign up",
   },
   signIn:{
      url: `${backendDomain}/api/signin`,
      method: "POST",
      description: "User sign in",
   },
   currentUser:{
      url: `${backendDomain}/api/user-details`,
      method: "GET",
      description: "Fetch user details",
   },
   logoutUser:{
      url: `${backendDomain}/api/user-logout`,
      method: "GET",
      description: "User logout",
   }
};

export default summaryApi;