let token = localStorage.getItem("token");
//fetching the menu items
async function getMenu(){
    try{
        const res = await fetch('https://elisa-food-api.herokuapp.com/orders',{
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
 const tableBody=   document.getElementById('tbody')
 menuItem.forEach(item => {
    var row = `
    <tr>
            <td>${item.order_id}</td>
            <td>${item.food_name}</td>
            <td>${item.price}</td>
            <td align="center">${item.quantity}</td>
            <td>${item.location}</td>
            <td>${item.order_status}</td>
            <td align ="center">
                <i class="fa fa-edit" id="edit-icon" onclick="displayStatusForm(${item.order_id});"></i>
            </td>
            <td  align ="center">
                <i class="fa fa-trash-o" id="delete-icon" onclick="deleteOrder(${item.order_id});"></i>
            </td>
    </tr>
 `
 tableBody.innerHTML += row;
 });    
}
//displaying edit status modal form with order id
async function displayStatusForm(orderId){
    try{
        const res_object = await fetch('https://elisa-food-api.herokuapp.com/orders/'+orderId,{
            method:'GET',
            headers:{
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await res_object.json();
        if(res_object.status === 200){
            order = data.message;
            console.log(data);
            const statusTable = document.getElementById('edit-status-table');
            const editModal= document.getElementById('edit-modal');
            const closeIcon = document.getElementById('close-icon');
            const editForm = document.getElementById('edit-status-form');
            const id =document.getElementById('oder-id');
            const messageDiv = document.getElementById('msg');
            const editBtn = document.getElementById('editBtn');

            editModal.style.display = "block";
            id.innerText ="OrderID: "+order.order_id;
            statusTable.style.opacity = 0.3; 
            closeIcon.addEventListener('click',function(){
                editModal.style.display = "none";
                window.location = "editstatus.html";
                statusTable.style.opacity = 1;
            });
            //submitting the status
            editForm.addEventListener("submit",async(e)=>{
                e.preventDefault();
                editBtn.style.display = "none";
                messageDiv.innerHTML = "<img src = './img/loader.gif'>";
                    try{
                        const status = document.getElementById('status').value;
                        const response = await fetch('https://elisa-food-api.herokuapp.com/orders/'+orderId,{
                            method:'PUT',
                            body:JSON.stringify({status:status}),
                            headers:{
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type':'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'authorization': 'Bearer ' + token
                            }
                        })
                        const data = await response.json();
                        console.log(data);
                        if(response.status ==200){
                            document.getElementById('status').style.border = "2px solid #6c5ce7";
                            editBtn.style.display = "block"
                            document.getElementById('status').value = "";
                            messageDiv.style.color = "green";
                            messageDiv.innerText = "Thanks status Updated";    
                        } 
                        else if(data.error){
                            editBtn.style.display = "block";
                            messageDiv.style.color = "red";
                            messageDiv.innerText =data.error;
                        } 
                    }
                    catch(err){
                        console.log(err)
                    }  
            })
        }
        else if(data.error){
            alert(data.error);
        }     
    }
    catch(err){
   
    }           
}