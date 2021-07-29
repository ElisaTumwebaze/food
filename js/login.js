function error_message(id,message){
    document.getElementById(id).innerText = message;
}
// login logic
const signinForm=document.getElementById('login-form');
signinForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    var usernameField = document.getElementById("uname");
    var passwordField = document.getElementById("password");
    //get values
    const username = signinForm.username.value;
    const password = signinForm.password.value;
    if (username == "") {
        usernameField.style.border="1px solid #ff8471";
        return error_message("un_err_msg","username field canot be empty!");
    }
    else if (username.length < 4) {
        usernameField.style.border="1px solid #ff8471";
       return error_message("un_err_msg","please enter a valid username");

    }
    else if (password == "") {
        passwordField.style.border="1px solid #ff8471";
        return error_message("pw_err_msg","password field canot be empty!");
    }
    else if (password.length < 6) {
        passwordField.style.border="1px solid #ff8471";
       return error_message("pw_err_msg","please enter a valid password");

    }
    else{
        passwordField.style.border="1px solid #3498db";
        error_message("pw_err_msg","");
        usernameField.style.border="1px solid #3498db";
        error_message("un_err_msg","");
        try{
            const res = await fetch('https://elisa-food-api.herokuapp.com/auth/login',{
                method:'POST',
                body:JSON.stringify({username,password}),
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const data = await res.json();
            console.log(data);
            const token =data.token
            if(res.status ==200){
                localStorage.setItem("token",token);
                if(data.userRole === 'Admin'){
                    window.location = "./adminorder.html";
                }
                else{
                    window.location = "./menu.html";
                }
            } 
            else if(data.error){
                const errors = document.getElementById('err_div');
                errors.textContent = data.error
                errors.style.color = "red";
            }
        }
        catch(err){
            console.log(err);
        } 
    }    
})