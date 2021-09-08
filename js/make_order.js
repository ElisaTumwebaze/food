let token = localStorage.getItem("token");
//fetching the menu items
async function getMenu(){
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
            createMenuItem(menuArray);
        }
        else if(data.error){
            console.log(data.error);
            window.location = "index.html";
        }     
    }
    catch(err){
        console.log(err);
    } 
}
getMenu();
//creating the memu table
function createMenuItem(menuItem){
 const table=   document.getElementById('item-table')
 menuItem.forEach(item => {
    var row = `
    <tr>
        <td>${item.food_id}</td>
        <td><img src="${item.photo}" width="50" height="50"></td>
        <td>${item.food_name}</td>
        <td>${item.price}</td>
        <td>
         <input type="submit" value="Order" id ="order-btn" class="btn-success" onclick ="viewFood(${item.food_id});">
        </td>
    </tr>
 `
 table.innerHTML += row;

 });    
}
//fetching specific food with a given id
async function viewFood(foodId){
    try{
        const res_item = await fetch('https://elisa-food-api.herokuapp.com/menu/'+foodId,{
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + token
             }
        })
        const data = await res_item.json();
        if(res_item.status === 200){
            console.log(data); 
            const menuTable = document.getElementById('item-table');
            menuTable.style.opacity =0.2;
            const orderModal = document.getElementById('order-modal');
            const foodName = document.getElementById('item-name');
            const foodPrice = document.getElementById('item-price');
            const closeModalIcon =document.getElementById('close-icon');
            const orderForm = document.getElementById('order-form');
           
            // looping through food  array
            const foodId = data.message.food_id;
            foodName.innerHTML = data.message.food_name;
            foodPrice.innerHTML = "Price" + ":"+ data.message.price + "UGX"; 
            orderModal.style.display = "block";
                
            //closing the viewitem modal
            closeModalIcon.addEventListener('click',function(){
                orderModal.style.display = "none";
                window.location = "menu.html";
                menuTable.style.opacity = 1;
            });
            //validation function
            function error_message(id,message){
                document.getElementById(id).innerText = message;
             }
                //submit order form
            const orderBtn = document.getElementById('make-order-btn');
            const resMessage = document.getElementById('res-msg');
            orderForm.addEventListener('submit',async(e)=>{
                e.preventDefault();
                //get the values
                orderBtn.style.display ="none";
                resMessage.innerHTML = "<img src = './img/formloader.gif'>";
                const quantityField = orderForm.quantity;
                const locationField = orderForm.location;
                const quantity =  orderForm.quantity.value;
                const location = orderForm.location.value ;
                //client side validation
                let validLocation= /^[a-zA-Z\s]+$/.test(location);
                if(quantity == ""){
                    quantityField.style.border = "1px solid #ff8471"
                    orderBtn.style.display = "block";
                    resMessage.innerText ="";
                    return error_message("qty-err","quantity Required");
                }
                else if(location == ""){
                    quantityField.style.border = "1px solid #ff8471"
                    orderBtn.style.display = "block";
                    resMessage.innerText =""
                    return error_message("location-err","Location Required");
                }
                else if(!validLocation){
                    quantityField.style.border = "1px solid #ff8471"
                    orderBtn.style.display = "block";
                    resMessage.innerText =""
                    locationField.style.border = "1px solid #ff8471"
                    return error_message("location-err","Only letter and white spaces are allowed");
                }
                else{
                    try{
                        quantityField.style.border = "2px solid #00aced";
                        error_message("qty-err","");
                        locationField.style.border = "2px solid #00aced";
                        error_message("location-err","");
                        resMessage.innerHTML = "<img src = './img/formloader.gif'>";
                        //fetch API
                        const response = await fetch('https://elisa-food-api.herokuapp.com/users/orders',{
                            method:'POST',
                            body:JSON.stringify({foodId,quantity,location}),
                                headers:{
                                    'Accept': 'application/json, text/plain, */*',
                                    'Content-Type':'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                    'Authorization': 'Bearer ' + token
                                }
                        })
                        const data = await response.json();
                        console.log(data);
                        if(response.status ==201){
                            quantityField.value = "";
                            locationField.value = "";
                            orderBtn.style.display = "block";
                            resMessage.innerText = "Thanks order Sent";    
                        } 
                        else if(data.error){
                            resMessage.innerText =data.error;
                        } 
                        }
                        catch(err){
                            console.log(err)
                        }
                    }
                        
                })   
        }
        else if(data.error){
            alert(data.error);
        }
 }
 catch(err){
     console.log(err);
 }
}    