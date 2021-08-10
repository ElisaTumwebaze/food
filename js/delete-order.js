
const closeWarning = document.getElementById('close-warning-icon');
const deleteWarningModal = document.getElementById('delete-order-warning');
const cancelBtn = document.getElementById('cancel-delete-btn')
//delete order function
async function deleteOrder(orderId){
    deleteWarningModal.style.display = "block";
    const deleteOrderBtn = document.getElementById('delete-order-btn');
    //triggerring click event function
    deleteOrderBtn.addEventListener('click',async function(){
        try{
            const res_delete = await fetch('https://elisa-food-api.herokuapp.com/orders/'+orderId,{
                method:'DELETE',
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + token
                }
            })
            const data = await res_delete.json()
            if(res_delete.status == 200){
                window.location = "editstatus.html";
                console.log(data);
            }

        }catch(err){
            alert('server error could not delete order');
            console.log(err);
        }
    })
}
//clossing the warning modal
closeWarning.addEventListener('click',function(){
    deleteWarningModal.style.display = "none";
})
// clossing the warning delete warning modal when no button is clicked
cancelBtn.addEventListener('click',function(){
    deleteWarningModal.style.display = "none";
})