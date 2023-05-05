import { useEffect } from "react";
import { addProducts, getProducts } from "./services";
const Home = () => {
    useEffect(()=>{
        addProducts().then((res) => console.log(res))        
    },[])

    
    
    return ( <p>'Home'</p>);
}
 
export default Home;