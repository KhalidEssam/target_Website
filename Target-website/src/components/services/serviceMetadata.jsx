import BrowseOrder from './BrowseOrder';
import Maintenance from './Maintenance';
import ProfileForm from './EditProfileInfo';
import AdminCustomization from './AdminCustomization';
import AddOrg from './AddOrg';
import OrderDetail from './OrderDetails';

export const serviceMetadata = [
    {
        name: "Browse Maintenance Plans",
        route: "/orders",
        component: BrowseOrder,
        roles: ["Admin"],
        available: true,
    }, 
    {
        name: "Order Details",
        route: "/orders/:id",
        component: OrderDetail,
        roles: ["Admin"],
        available: true,
    },
    {
        name: "Add Maintenance order",
        route: "/maintenance",
        component: Maintenance,
        roles: ["Admin", "user"],
        available: true,
    },
    {
        name: "Edit Profile Info",
        route: "/edit-profile-info",
        component: ProfileForm,
        roles: ["Everyone"],
        available: false,
    },
    {
        name: "Admin Customization",
        route: "/admin-customization",
        component: AdminCustomization,
        roles: ["Admin"],
        available: true,
    },
    {
        name: "Add Organization",
        route: "/add-Org",
        component: AddOrg,
        roles: ["Admin"],
        available: true,
    },
]