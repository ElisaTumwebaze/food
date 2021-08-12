let token = localStorage.getItem("token");
async function getOrders(){
    try{
        const res = await fetch('https://elisa-food-api.herokuapp.com/users/orders',{
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + token
             }
        })
        const data = await res.json();
        console.log(data);
        if(res.status === 200){
            const ordersArray =await data.message
            const statusArray=ordersArray.order_status;
            displayOrders(ordersArray);
        }
        else if(data.error){
            alert(data.error);
        }   
    }
    catch(err){
        console.log(err);
    } 
}
getOrders();

async function displayOrders(menuItems){
    const tableBody =document.getElementById('table-body');
    if(menuItems.length>0){
      await menuItems.forEach(item => {
                row = `<tr>
                            <td>${item.food_id}</td>
                            <td>${item.food_name}</td>
                            <td>${item.price}</td>
                            <td>${item.quantity}</td>
                            <td>${item.price*item.quantity}</td>
                            <td>${item.order_status}</td>          
                        </tr>
                        `
                        tableBody.innerHTML+= row ;                           
        });    
    }   
}



