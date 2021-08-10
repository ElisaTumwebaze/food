//displaying edit fooditem form
const closeForm = document.getElementById('close-form');
let editFoodModal = document.getElementById('edit-menu-modal');
const foodContainer = document.getElementById('items-table');
 
async function editFood(id){
    foodContainer.style.opacity =0.2;
    try{
        const res_object = await fetch('https://elisa-food-api.herokuapp.com/menu/'+id,{
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + token
             }
        })
        const data = await res_object.json();
        if(res_object.status == 200){
            console.log(data);
            document.getElementById('fname').value = data.message.food_name;
            document.getElementById('fprice').value = data.message.price;
            editFoodModal.style.display = "block";
            // get error function
            function error_message(id,message){
                document.getElementById(id).innerText = message;
            }
            const editFoodForm = document.getElementById('edit-food-form');
            const updateBtn = document.getElementById('edit-food-btn');
            const responseDiv = document.getElementById('response');
            editFoodForm.addEventListener('submit',async(e)=>{
                e.preventDefault();
                const nField = editFoodForm.fname;
                const pField = editFoodForm.fprice;
                const photoField = document.getElementById('photo');
                updateBtn.style.display = "none";
                responseDiv.innerHTML = "<img src = './img/loader.gif'>";
                responseDiv.style.marginLeft = "85px";

                let fnValidation= /^[a-zA-Z\s]+$/.test(nField.value);
                if(nField.value == ""){
                    nField.style.border = "2px solid #ff8471"
                    updateBtn.style.display = "block";
                    responseDiv.innerText ="";
                    return error_message("fn-err","Food Name Required");

                }
                else if(pField.value == ""){
                    pField.style.border = "2px solid #ff8471"
                    updateBtn.style.display = "block";
                    responseDiv.innerText =""
                    return error_message("fp-err","Price Required");
                }
                else if(!fnValidation){
                    nField.style.border = "12px solid #ff8471"
                    updateBtn.style.display = "block";
                    responseDiv.innerText =""
                    return error_message("fn-err","Only letter and white spaces are allowed");
                }
                else if(photoField.files[0] == undefined){
                    updateBtn.style.display = "block";
                    responseDiv.style.color ="red";
                    responseDiv.innerText = "no file Selected"
                }
                else{
                    try{
                        responseDiv.innerHTML = "<img src = './img/formloader.gif'>";
                        const fd = new FormData();
                        fd.append('foodname',nField.value)
                        fd.append('price',pField.value)
                        fd.append('image',photoField.files[0])
                        //fetch API
                        const response = await fetch('https://elisa-food-api.herokuapp.com/menu/'+id,{
                            method:'PUT',
                            body:fd,
                            headers:{
                                'Accept': 'application/json, text/plain, */*',
                                'Authorization': 'Bearer ' + token
                            }
                            })
                        const data = await response.json();
                        console.log(data);
                        if(response.status ==200){
                            updateBtn.style.display = "block";
                            responseDiv.style.color = "#f98f39";
                            responseDiv.innerText = "Thanks food update";    
                        } 
                        else if(data.error){
                            updateBtn.style.display = "block";
                            responseDiv.style.color ="red";
                            responseDiv.innerText =data.error;
                        } 
                    }
                    catch(err){
                        console.log(err)
                    }
                }       
            })
        }
    }
    catch(err){
        console.log(err);
    }   
}
//close the form	
closeForm.addEventListener('click',function(){
     editFoodModal.style.display = "none";
     foodContainer.style.opacity =1;
     window.location ="editmenu.html";
 })
