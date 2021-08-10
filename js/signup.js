function error_message(id,message){
    document.getElementById(id).innerText = message;
}
const registerForm = document.getElementById('signup-form');
const errorsDiv = document.getElementById('signup-error-div');
registerForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    errorsDiv.innerHTML = "<img src = './img/loader.gif'>";
    errors.style.marginLeft= "150px";
    var usernameField = document.getElementById("un-field");
    var emailField = document.getElementById("email-field");
    var passwordField = document.getElementById("pw-field");
    //get values
    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
  
    if (username.length < 4) {
        errorsDiv.innerHTML = ""
       usernameField.style.border="1px solid #ff8471";
       return error_message("username_err","username should be atleast 4 characters");
    }
    else if (password.length < 6) {
        errorsDiv.innerHTML = ""
        passwordField.style.border="1px solid #ff8471";
       return error_message("password_err","password should be atleast 6 characters");
    }
    else{
        try{
            passwordField.style.border="1px solid #3498db";
            error_message("password_err","");
            emailField.style.border = "1px solid #3498db";
            error_message("email_err","");
            usernameField.style.border="1px solid #3498db";
            error_message("username_err","");
            //fetch api
            const res = await fetch('https://elisa-food-api.herokuapp.com/auth/signup',{
                method:'POST',
                body:JSON.stringify({username,email,password}),
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const data = await res.json();
            console.log(data);
            const token =data.token
            if(res.status ==201){
                localStorage.setItem("token",token);
                window.location = "./menu.html";
            } 
            else if(data.error){
                errorsDiv.textContent = data.error
                errorsDiv.style.color = "red";
            } 
        }
        catch(err){
            console.log(err)
        } 
    }   
})