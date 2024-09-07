import { ChangeEvent, useEffect, useState } from "react"
import { useLoginAccess } from "../context/LoginAccess";
import { useNavigate } from "react-router-dom";

interface UserInfo {
    userId: string,
    username: string,
}
interface UserPages {
    category: string,
    name: string,
    id: string,
    access_token: string
}
interface MeResponse {
    id: string,
    name: string
}
interface ProfileResponse {
    data: {
    url: string
    }
}
interface PagesResponse {
    
    data: UserPages[]
}
export default function Home () {
    const navigate = useNavigate()
    const {accessToken, setAccessToken,pageAccessToken, setPageAccessToken} = useLoginAccess();
    const [selectedPage, setSelectedPage] = useState('');
    const [userProfile, setUserProfile] = useState<string>('')
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userId: '',
        username: '',
    })
    const [userPages, setUserPages] = useState<UserPages[]>([]);
    const logout = () => {
        window.FB.logout(function(response) {
            if(response) {
                navigate('/')
            }
        });

    }
    useEffect(() => {
        
        
        window.FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            if(response.authResponse.accessToken){
            setAccessToken(response.authResponse.accessToken)
            }
            window.FB.api(
              'me',
              'get',
              {access_token: accessToken},
              function(response: MeResponse) {
                setUserInfo({
                    userId: response.id,
                    username: response.name
                })
              }
            );
            window.FB.api(
                `/me/accounts`,
                'get',
                {access_token: accessToken,},
                function(response: PagesResponse) {
                    const pagesData = response.data.map(page => ({
                        id: page.id,
                        category: page.category,
                        name: page.name,
                        access_token: page.access_token
                    }));
                    setPageAccessToken(response.data[0].access_token)
                    setUserPages(pagesData);
                }
              );
            window.FB.api(
                `/me/picture?redirect=false`,
                'get',
                {access_token: accessToken,},
                function(response: ProfileResponse) {
                  setUserProfile(response.data.url)
                }
              );

             
          } 
        });
      },[])


      const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const pageId = event.target.value;
        if (pageId) {
            navigate(`/${pageId}`); 
        }
    };


    return (
        <div id="home">
            <div className="profile-container">
        <div className="profile-card">
            <div className="profile-header">
                <img className="profile-pic" src={userProfile} alt="no" />
                <h1 className="user-name">{userInfo.username}</h1>
            </div>
            <div className="user-info">
                <p><strong>User ID:</strong> {userInfo.userId}</p>
            </div>
            <div className="latest-posts">
                <h2>Pages</h2>
                {userPages.length === 0 ? (
                <p>No pages owned.</p> 
            ) : (
                <>
                    <select value={selectedPage} onChange={handleChange}>
                        <option value="">Select a page...</option>
                        {userPages.map(page => (
                            <option key={page.id} value={page.id}>
                                {page.name} - {page.category}
                            </option>
                        ))}
                    </select>
                </>
            )}  
            </div>
            <button onClick={logout} className="logout">Logout</button>
        </div>
    </div>
        </div>
    )
}