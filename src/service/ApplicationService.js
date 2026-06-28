import axios from "axios";

// const base_url = 'http://localhost:8080/api/applications';
const BASE_URL = 'http://localhost:8080/api/applications';




const ApplicationService =   {
    getAll:  ()=>axios.get(BASE_URL),
    
    create: (application)=>axios.post(BASE_URL,application),
    
    update :(id, application)=>axios.put(`${BASE_URL}/${id}`,application),
   
    delete : (id)=> axios.delete(`${BASE_URL}/${id}`)
}
    


export default ApplicationService
