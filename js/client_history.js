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
            const ordersArray = data.message
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

function displayOrders(menuItems){
 menuItems.forEach(item => {
    const ordersTable=   document.getElementById('orders-table');
    var row = `
    <tr>
        <td>${item.order_id}</td>
        <td>${item.food_name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.price*item.quantity}</td>
        <td>${item.order_status}</td>    
    </tr>
 `
 ordersTable.innerHTML += row;   
 });   
}

