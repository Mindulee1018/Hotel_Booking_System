import { useAuthContext } from '../../useAuthContext'
import { useNavigate } from "react-router-dom";
export const useLogout=()=>{
    const { dispatch } = useAuthContext()
    const navigation = useNavigate();
    const logout=()=>{
        //reove user from local storage
        localStorage.removeItem('user')
        localStorage.removeItem('email')

        // dispatch logout
        dispatch({type:'LOGOUT'})
        navigation('/Login')
    }

    return {logout}
}