
const registerForm = document.getElementById('signup-form');
registerForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    //get values
    const username = registerForm.username.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    try{
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
    }
    catch(err){
        console.log(err)
    } 
})