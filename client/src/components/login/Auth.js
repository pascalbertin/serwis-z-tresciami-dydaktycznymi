// import {useLocation, Navigate, Outlet} from "react";
// import useAuth from '../../hooks/useAuth'

// const Auth = ({allowedRoles}) => {
//     const {auth} = useAuth();
//     const location = useLocation();

//     return (
//         auth?.roles?.find(role => allowedRoles?.includes(role))
//             ?   <Outlet />
//             :   auth?.user
//                 ?  <Navigate to="/register" state={{from: location}} replace />
//                 :  <Navigate to="/login" state={{from: location}} replace />
//     )
// }