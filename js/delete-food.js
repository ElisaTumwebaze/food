const warningModal = document.getElementById('warning-modal');
const warningIcon = document.getElementById('close-delete-warning');
const foodTable = document.getElementById('items-table');
const CacelActionBtn = document.getElementById('btn-cancel');

async function deleteFood(id){
    foodTable.style.opacity = 0.2;
    warningModal.style.display = "block";
    const deleteFoodBtn = document.getElementById('btn-delete-food');
    deleteFoodBtn.addEventListener('click',async function(){
        try{
            const res = await fetch('https://elisa-food-api.herokuapp.com/menu/'+id,{
                method:'DELETE',
                headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + token
                }    
            })
            const data= await res.json()
            if(res.status == 200){
                console.log(data);
                alert('food item delete');
                window.location = "editmenu.html";
            }
            else if(data.error){
                alert(data.error)
                window.location = "editmenu.html";
            }
        }
        catch(err){
            console.log(err);
        }
    })  
}
//closing the warning modal by clicking close icon
warningIcon.addEventListener('click',function(){
    warningModal.style.display = "none";
    foodTable.style.opacity = 1;
    window.location = "editmenu.html";
})
//closing the warning modal by clicking the no button
CacelActionBtn.addEventListener('click',function(){
    warningModal.style.display = "none";
    foodTable.style.opacity = 1;
    window.location = "editmenu.html";
})


