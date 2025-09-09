const backendDomain = "http://localhost:8080";

const summaryApi = {
   signUp:{
    url: `${backendDomain}/api/signup`,
    method: "POST",
    description: "User sign up",
   }
};

export default summaryApi;