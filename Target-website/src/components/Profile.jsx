import { useSelector } from 'react-redux';


const Profile = () => {

    const userInfo = useSelector((state) => state.user.userInfo);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-4 my-3">
                    <div className="card">
                        <img src={userInfo.picture} className="card-img-top" alt={userInfo.picture} />
                        <div className="card-body">
                            <h5 className="card-title">{userInfo.name}</h5>
                            {userInfo.groups  && <p className="card-text">Role: {userInfo.groups}</p>}
                            <p className="card-text">Email: {userInfo.email}</p>
                            <p className="card-text">Profile: <a href={userInfo.profile} target="_blank" rel="noopener noreferrer">{userInfo.profile}</a></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 my-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Personal Information</h5>
                            <p className="card-text">Locale: {userInfo.locale}</p>
                            <p className="card-text">Website: <a href={userInfo.website} target="_blank" rel="noopener noreferrer">{userInfo.website}</a></p>
                            <p className="card-text">Gender: {userInfo.gender}</p>
                            <p className="card-text">Birthdate: {userInfo.birthdate}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 my-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Login Information</h5>
                            <p className="card-text">Nickname: {userInfo.nickname}</p>
                            <p className="card-text">Preferred Username: {userInfo.preferred_username}</p>
                            <p className="card-text">Given Name: {userInfo.given_name}</p>
                            <p className="card-text">Middle Name: {userInfo.middle_name}</p>
                            <p className="card-text">Family Name: {userInfo.family_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;