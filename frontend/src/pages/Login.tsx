import { useEffect } from "react"
import { useLoginAccess } from "../context/LoginAccess";
import { useNavigate } from "react-router-dom";
export default function Login () {
    const { accessToken, setAccessToken } = useLoginAccess();
    const navigate = useNavigate()

    const login = () => {
        window.FB.login(
          (response) =>  {
              if(response.status === "connected") {
                 navigate('/home')
              }
              
          },
          {config_id: process.env.FACEBOOK_DEVELOPER_CONFIG_ID},
          //  {scope: 'public_profile,email'},
          
        )
      }
      
    useEffect(() => {
        
        
        window.FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            if(response.authResponse.accessToken){
            setAccessToken(response.authResponse.accessToken)
            }
            navigate('/home')
          } 
        });
      },[])
    return (
        <div id="login">
            <button onClick={login}>Login with Facebook</button>
        </div>
    )
}