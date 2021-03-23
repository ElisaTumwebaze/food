let toggleNavStatus=false;
let toggleNav=function(){
	let getSidebar=document.querySelector(".nav-sidebar");
	let getSidebarUl=document.querySelector(".nav-sidebar ul");
	let getSidebarTitle=document.querySelector(".nav-sidebar span");
	let getSidebarLinks=document.querySelectorAll(".nav-sidebar a");
	let getMainContent=document.querySelector(".main-content");

	if (toggleNavStatus===false) {
		getSidebarUl.style.visibility="visible";
		getSidebar.style.width="272px";
		getMainContent.style.marginLeft="275px";
		getSidebarTitle.style.opacity="0.5";

		let arrayLength=getSidebarLinks.length;
		for (let i = 0; i < arrayLength; i++) {
			getSidebarLinks[i].style.opacity = "1";
		}
		toggleNavStatus = true;
	}

	else if (toggleNavStatus===true) {
		
		getSidebar.style.width="50px";
		getMainContent.style.marginLeft="55px";
		getSidebarTitle.style.opacity="0";
		

		let arrayLength=getSidebarLinks.length;
		for (let i = 0; i < arrayLength; i++) {
			getSidebarLinks[i].style.opacity = "0";
		}
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
