import BrowseMaintenancePlans from './BrowseOrder';
import EditLoginInfo from './EditLoginInfo';
import Maintenance from './Maintenance';

export const serviceMetadata = [
    {
        name: "Browse Maintenance Plans",
        route: "/browse-maintenance-plans",
        component: BrowseMaintenancePlans,
        roles: ["Admin", "user"],
    },
    {
        name: "Edit Login Info",
        route: "/edit-login-info",
        component: EditLoginInfo,    
        roles: ["Admin" ],
    },  
    {
        name: "Maintenance",
        route: "/maintenance",
        component: Maintenance,
        roles: ["Admin", "user"],
    },
]