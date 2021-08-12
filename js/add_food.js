let token = localStorage.getItem("token");
//getting the food items  from the API
async function getMenuAdmin(){
    try{
        const res = await fetch('https://elisa-food-api.herokuapp.com/menu',{
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + token
             }
        })
        const data = await res.json();
        console.log(data);
        if(res.status === 200){
            const menuArray = data.message
            displayMenuItem(menuArray);
        }
        else if(data.error){
            alert(data.error + ' Please login Again');
            window.location = "index.html";
        }   
    }
    catch(err){
        console.log(err);
    } 
}
getMenuAdmin();
//Displaying food items table
function displayMenuItem(menuItem){
 const tableBody =   document.getElementById('tbody')
 menuItem.forEach(item =>{
    var row = `
    <tr>
    <td>${item.food_id}</td>
    <td><img src="https://elisa-food-api.herokuapp.com/${item.photo}" width="50" height="50"></td>
    <td>${item.food_name}</td>
    <td>${item.price}</td>
    <td align="center">
        <input class="btn-success" type="submit" id ="edt-btn" onclick = "editFood(${item.food_id});" value="Edit item">
    </td>
    <td align="center">
        <input class="btn-danger" type="submit" id = "delBtn" onclick = "deleteFood(${item.food_id});"  value="Delete">
    </td>
    </tr>
 `
 tableBody.innerHTML += row;  
 }); 
}
//displaying add fooditem form
let model=document.getElementById('add-model'),
    openModel = document.getElementById('add'),
    closeModel = document.querySelector('.close-model');
const itemsTable = document.getElementById('items-table');
 	
openModel.addEventListener('click',function(){
    model.style.display="block";
    itemsTable.style.opacity = 0.1;
    itemsTable.disabled = true;
})
closeModel.addEventListener('click',function(){
    model.style.display="none";
    window.location = "editmenu.html";
    itemsTable.style.opacity = 1;   
});

//validation function
function error_message(id,message){
    document.getElementById(id).innerText = message;
}
//submit order form
const addBtn = document.getElementById('btn-add');
const resMessage = document.getElementById('res-div');
//adding the food item
const addFoodForm = document.getElementById('add-food-form');
addFoodForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    //get the values
    const foodnameField = addFoodForm.foodname;
    const priceField = addFoodForm.price;
    const imageField = document.getElementById('image');
    addBtn.style.display ="none";
    resMessage.innerHTML = "<img src = './img/formloader.gif'>";
    //client side validation
    let foodNameValidation= /^[a-zA-Z\s]+$/.test(foodnameField.value);
    if(foodnameField.value == ""){
        foodnameField.style.border = "2px solid #ff8471"
        addBtn.style.display = "block";
        resMessage.innerText ="";
        return error_message("fname-err","Food Name Required");

    }
    else if(priceField.value == ""){
        priceField.style.border = "2px solid #ff8471"
        addBtn.style.display = "block";
        resMessage.innerText =""
        return error_message("price-err","Price Required");
    }
    else if(!foodNameValidation){
        foodnameField.style.border = "12px solid #ff8471"
        addBtn.style.display = "block";
        resMessage.innerText =""
        return error_message("fname-err","Only letter and white spaces are allowed");
    }
    else if(imageField.files[0] == undefined){
        addBtn.style.display = "block";
        resMessage.style.color = "red";
        resMessage.innerText = "no file selected"
     }
     else{
        try{
            resMessage.innerHTML = "<img src = './img/formloader.gif'>";
            const formData = new FormData();
            formData.append('foodname',foodnameField.value)
            formData.append('price',priceField.value)
            formData.append('image',imageField.files[0])
            //fetch API
            const response = await fetch('https://elisa-food-api.herokuapp.com/menu',{
                method:'POST',
                body:formData,
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Authorization': 'Bearer ' + token
                }
            })
            const data = await response.json();
            if(response.status ==201){
                console.log(data);
                addBtn.style.display = "block";
                resMessage.innerText = "Thanks food added";    
            } 
            else if(data.error){
                addBtn.style.display = "block";
                resMessage.innerText =data.error;
            } 
        }
        catch(err){
            console.log(err)
        }
     }

})