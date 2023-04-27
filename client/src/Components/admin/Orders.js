import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useCookies } from 'react-cookie';

const Orders = () => {

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(() => {
        const fetchData = async () => {
            if(!cookies.venjwt){
                alert('No token, authorization denied')
                setTimeout(() => {
                    window.location.href = "/"
                  }, 1000);
              
            }else{
                const response = await axios.get("http://localhost:3001/vendor_Auth", {
                    withCredentials: true,
                  });
                 
                   if(!response.status){
                      removeCookie("venjwt")
                  }else{
                      setUsername(response.data.users);
                      setLoading(false);
                  }
                  
        
            }
        }
        
        fetchData();
      }, [username]);
  return (
    <div>
      <h2>protect route</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Welcome, {username}!</h1>
          <p>This is your dashboard.</p>
        </>
      )}

    </div>
  )
}

export default Orders
