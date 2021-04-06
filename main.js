let toggleNavStatus=true;
let toggleNav=function(){
	let getSidebar=document.querySelector(".nav-sidebar");
	let getSidebarUl=document.querySelector(".nav-sidebar ul");
	let getSidebarLinks=document.querySelectorAll(".nav-sidebar a");
	let getMainContent=document.querySelector(".main-content");
	let getNavIcons=document.querySelector(".nav-sidebar ul li a .fa");

	if (toggleNavStatus===false) {
		getSidebarUl.style.visibility="visible";
		getSidebar.style.width="272px";
		getMainContent.style.marginLeft="275px";
		toggleNavStatus = true;
	}

	else if (toggleNavStatus===true) {
		
		getSidebar.style.width="50px";
		getMainContent.style.marginLeft="55px";
		getNavIcons.style.visible="visible";

		
		toggleNavStatus = false;
		getSidebarUl.style.visibility="hidden";
		
	}
}

let model=document.getElementById('add-model'),
	openModel=document.getElementById('add'),
	closeModel=document.querySelector('.close-model');

	openModel.addEventListener('click',function(){
		model.style.display="block";
	})

	closeModel.addEventListener('click',function(){
		model.style.display="none";
	})
