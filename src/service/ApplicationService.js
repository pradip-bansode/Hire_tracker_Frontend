import axios from "axios";

// const base_url = 'http://localhost:8080/api/applications';
const BASE_URL = 'http://localhost:8080/api';

const AuthService={
    signup : (data) => axios.post(`${BASE_URL}/auth/signup` , data),

    login : (data)=> axios.post(`${BASE_URL}/auth/login`, data)
}

//application APIs
// Har request ke saath token header mai bhejo
const getAuthHeader=()=>({
    headers : {
        Authorization : `Bearer ${localStorage.getItem(`token`)}`
    }
})

const ApplicationService =   {
    getAll:  ()=>axios.get(`${BASE_URL}/applications`,getAuthHeader()),
    
    create: (application)=>axios.post(`${BASE_URL}/applications`, application, getAuthHeader()),
    
    update :(id, application)=>axios.put(`${BASE_URL}/applications/${id}`, application, getAuthHeader()),
   
    delete : (id)=> axios.delete(`${BASE_URL}/applications/${id}`, getAuthHeader())


}
    


export {AuthService , ApplicationService};
