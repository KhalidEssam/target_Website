import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';


const Profile = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            setUserInfo(null);
        } else {
            oktaAuth.getUser().then(info => {
                setUserInfo(info);
            });
        }
    }, [authState, oktaAuth]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Hello Mr. {userInfo.name}, how are you feeling today?</h1>
            <p>Email: {userInfo.email}</p>
        </div>
    );
};

export default Profile;