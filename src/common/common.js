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
   }
};

export default summaryApi;