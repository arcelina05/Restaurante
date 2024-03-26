import { Navigate, useNavigate } from "react-router-dom";
import './styles/CocinaHome.css'
    

function CocinaHome() {
    if(user!=="cocina1" || !user){
        return <Navigate to="/"/>
    }
  return (
    <div>CocinaHome</div>
  )
}

export default CocinaHome