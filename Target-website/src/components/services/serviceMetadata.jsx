import BrowseMaintenancePlans from './BrowseOrder';
import Maintenance from './Maintenance';
import ProfileForm from './EditProfileInfo';
import AdminCustomization from './AdminCustomization';
import AddOrg from './AddOrg';
import OrderDetail from './OrderDetails';

export const serviceMetadata = [
    {
        name: "Browse Maintenance Plans",
        route: "/orders",
        component: BrowseMaintenancePlans,
        roles: ["Admin", "user"],
    }, 
    {
        name: "Order Details",
        route: "/orders/:id",
        component: OrderDetail,
        roles: ["Admin", "user"],

    },

    {
        name: "Add Maintenance order",
        route: "/maintenance",
        component: Maintenance,
        roles: ["Admin", "user"],
    },
    {
        name: "Edit Profile Info",
        route: "/edit-profile-info",
        component: ProfileForm,
        roles: ["Everyone"],
    },
    {
        name: "Admin Customization",
        route: "/admin-customization",
        component: AdminCustomization,
        roles: ["Admin"],
    },
    {
        name: "Add Organization",
        route: "/add-PartyOrg",
        component: AddOrg,
        roles: ["Admin"],
    },
]