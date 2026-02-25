import { clearToken } from '@/Cookies/auth.actions';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Bounce, toast } from 'react-toastify';
import { setAuthInfo } from '../strore/auth.slice';

export default function useLogout() {
    const router = useRouter();
    const dispatch = useDispatch();

    const logout = () => {
    clearToken();
    
    dispatch(setAuthInfo({
        isAuthenticated : false,
        userInfo : null
    }));
    
    toast.success('Account logged out successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }); 
    
setTimeout(() => {
        router.push('/login');
    router.refresh();
}, 1000);
    }

    return{
        logout
    }
}
