import { Navigate, useNavigate } from "react-router-dom";
import './styles/CocinaHome.css'
    

function CocinaHome() {
    if(user!=="cocina" || !user){
        return <Navigate to="/"/>
    }
  return (
    <div>CocinaHome</div>
  )
}

export default CocinaHome