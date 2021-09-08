let token = localStorage.getItem("token");
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

function displayMenuItem(menuItem){
 const menuTable =   document.getElementById('menu-table')
 menuItem.forEach(item =>{
    var row = `
    <tr>
        <td>${item.food_id}</td>
        <td><img src="${item.photo}" width="50" height="50"></td>
        <td>${item.food_name}</td>
        <td>${item.price}</td>
        <td>
        <input type="submit" id="btn-order" value="Order" class="btn-success" onclick="viewItem(${item.food_id});">
        </td>
    </tr>
 `
 menuTable.innerHTML += row;  
 }); 
}

 async function viewItem(foodId){
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
            const menuTable = document.getElementById('menu-table');
            menuTable.style.opacity =0.2;
            const orderModal = document.getElementById('order-modal');
            const foodName = document.getElementById('item-name');
            const foodPrice = document.getElementById('item-price');
            const closeModalIcon =document.getElementById('close-icon');
            const orderForm = document.getElementById('order-form');
           
            // displaying item info on the form
            const foodId = data.message.food_id;
            foodName.innerHTML = data.message.food_name;
            foodPrice.innerHTML = "Price" + ":"+ data.message.price + "UGX"; 
            orderModal.style.display = "block";
            //closing the viewitem modal
            closeModalIcon.addEventListener('click',function(){
                orderModal.style.display = "none";
                window.location = "adminorder.html";
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
                orderBtn.style.display ="none";
                resMessage.innerHTML = "<img src = './img/formloader.gif'>";
                //get the values
                const quantityField = orderForm.quantity;
                const locationField = orderForm.location;
                const quantity =  orderForm.quantity.value;
                const location = orderForm.location.value ;
                //client side validation
                let validLocation = /^[A-Za-z\s]{4,12}/.test(location);
                if(quantity == ""){
                    orderBtn.style.display = "block";
                    resMessage.innerText ="";
                    quantityField.style.border = "1px solid #ff8471"
                    return error_message("qty-err","quantity Required");
                }
                else if(location == ""){
                    orderBtn.style.display = "block";
                    resMessage.innerText ="";
                    locationField.style.border = "1px solid #ff8471"
                    return error_message("location-err","Location Required");
                }
                else if(!validLocation){
                    orderBtn.style.display = "block";
                    resMessage.innerText ="";
                    locationField.style.border = "1px solid #ff8471"
                    return error_message("location-err","Only letter and white spaces are allowed");
                }
                else{
                    try{
                        resMessage.innerHTML = "<img src = './img/formloader.gif'>";
                        quantityField.style.border = "2px solid #00aced";
                        error_message("qty-err","");
                        locationField.style.border = "2px solid #00aced";
                        error_message("location-err","");
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
                        if(response.status ==201){
                            console.log(data);
                            quantityField.value = "";
                            locationField.value = "";
                            error_message("res-msg","Thanks Order Sent!");   
                        } 
                        else if(data.error){} 
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
    
    
