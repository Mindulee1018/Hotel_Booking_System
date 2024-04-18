import { useState } from "react"
import { useSignup } from "../../../hooks/Client/userLogin/useSignup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [name, setName] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password,repassword,name)
  }


  const handleTogglePwd=()=>{
    setShowPassword(!showPassword);
  }

  const handleToggleRePwd=()=>{
    setShowRePassword(!showRePassword);
  }
        
        function myfunction()
        {   
            var emailInput=document.getElementById("Email1").value
            var mailformat = (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
            var submitButton = document.getElementById("submit");
           
            if(emailInput.match(mailformat))
            {
              document.getElementById("emailError").innerHTML = "";
              submitButton.disabled = false;
             
            }
            else
            {
              if(emailInput===''){
                document.getElementById("emailError").innerHTML = "Can't be empty";
                submitButton.disabled = true;
              }
              else{
                document.getElementById("emailError").innerHTML = "Invalid Email";
                // alert("invalid Email")
                submitButton.disabled = true;
              }
               
                
            }
        
        }

        function pwdcheck(){
          var pwd = document.getElementById("Password1").value;
          var repwd = document.getElementById("Password2").value;
          var submitButton = document.getElementById("submit");
        
          if(pwd.length>=8 && pwd===repwd){
            document.getElementById("pwdError").innerHTML = "";
            submitButton.disabled = false;
            return true;
          }
          else{
            submitButton.disabled = true;
            if(pwd.length<8){
              document.getElementById("pwdError").innerHTML = "Password must be at least 8 characters";
              submitButton.disabled = true;
            }
            else{
              document.getElementById("pwdError").innerHTML = "Passwords do not match";
              submitButton.disabled = true;
            }
            
           
            return false;
          }
        } 
        

        
        
        return(
          <div className="container-fluid d-flex align-items-center justify-content-center vh-100" style={{backgroundImage: 'url("Wave.svg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            
            <img src="Sunset Araliya horizontal.png" style={{width: "200px", position:"absolute", top:"2vh"}}></img>
            <div className="container bg-body-tertiary w-50 pt-4 rounded d-flex justify-content-center align-items-center mt-5">
                <form action ="" method="post" style={{width:"25vw"}} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="Email1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="Email1" name="email" required onChange={(e)=>{setEmail(e.target.value);}}></input>
                  <span id="emailError" style={{color: "red"}}></span>
        
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label for="Password1" className="form-label">Password</label>
                  <div className="row" style={{width: "32vw"}}>
                    <div className="col-10">
                    <input  type={showPassword ? 'text' : 'password'} className="form-control" id="Password1"  name="pwd"  required onClick={myfunction} onChange={(e)=>{setPassword(e.target.value);} }></input>
                    <div className="form-text">(Minumum-8 characters)</div>
                    </div>
                    <div className="col mt-1">
                    <button
                         type="button"
                         onClick={handleTogglePwd}>
                         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                    </div>
                  </div>
                </div>

        
                <div className="mb-4">
                  <label for="Password2" className="form-label">Repeat Password</label>
                  <div className="row"  style={{width:"32vw"}}>
                    <div className="col-10">
                    <input type={showRePassword ? 'text' : 'password'} className="form-control" id="Password2" name="repwd" required  onChange={(e)=>{setRepassword(e.target.value);}}></input>
                    <span id="pwdError" style={{color: "red"}}></span>
                    </div>
                    <div className="col mt-1">
                    <button
                         type="button"
                         onClick={handleToggleRePwd}>
                         <FontAwesomeIcon icon={showRePassword ? faEyeSlash : faEye} />
                    </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <label className="form-check-label" for="name">Name</label>
                  <input type="nickname" className="form-control mb-4 mt-2" id="name1" name="name" required  onClick={() => { myfunction(); pwdcheck(); }} onChange={(e)=>{setName(e.target.value);}}></input>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-3">
                <button type="submit" className="btn btn-primary " id="submit" disabled={isLoading} >Signup</button>
                </div>
                {error && <div className="error bg-danger mb-2" style={{color:"white"}}>{error}</div>}
                <div className="new d-flex justify-content-center">
                 <p>Already have an account?</p>
                 <a href="/Login" className="ms-2 text-decoration-none">Login</a>
                </div>
              </form>
              <div>

    </div>
 
            </div>
 
        </div>
        
        
            )
        }
        
export default Signup;