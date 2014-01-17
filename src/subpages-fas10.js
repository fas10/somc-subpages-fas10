//Number of characters before truncate.
var TITLE_MAX = 20;
//The object that will hold the page tree.
var subPages;
//The page that fired the shortcode/plugin function.
var currentPageId;


//Recursive function that builds the HTML for the page tree.
function populateSubPageDiv(parentId, children)
{
	//First a list element.
	var subPagesList = document.createElement('ul');
	subPagesList.className = "subPagesList"; 
	document.getElementById(parentId).appendChild(subPagesList);
	//We don't want the tree to be unfolded unless it's of the first generation.
	if(parentId !== currentPageId){
		subPagesList.style.display = 'none';
	}

	children.forEach(function(page) 
	{
		//Every subpage is represented by a listobject. 
		var subPage = document.createElement('li');
		subPage.id = page.pageId;
		subPage.className = "subpage";		
		subPagesList.appendChild(subPage);

		var title =  document.createElement('p');
		title.className = "subPageTitle";
		var titleString = page.pageTitle;
		//If the page is of the first generation the title text is set to be larger.
		if(parentId === currentPageId){
			title.className += " firstGenerationSubPage";
		}
		//Truncate the title.
		if(titleString.length > TITLE_MAX){
			titleString = titleString.substring(0, TITLE_MAX) + "...";
		}
		title.innerHTML = titleString;
	
		//A link element makes the title clickable.
		var subLink = document.createElement('a');
		subLink.href = page.pageLink; 
		subLink.appendChild(title);
		subPage.appendChild(subLink);

		//If there is a featured image add this to the layout.
		if(page.pageThumb != "")
		{
			title.className += " hasSubPages";

			var thumb = document.createElement('img');
			thumb.className = "subpageImg";
			thumb.src = page.pageThumb;		
			subPage.appendChild(thumb);
			subPage.style.minHeight = "60px";
		}

		//If the page has children of its own. Adds a link to show the children and a link to order them. 
		//And finally the "populateSubPageDiv" function is called to build the subpage tree.
		if(page.children != "")
		{
			title.className += " hasSubPages"; 
			
			var toggleShowSubPagesButton = document.createElement('a');
			toggleShowSubPagesButton.innerHTML = "Subpages";
			toggleShowSubPagesButton.className = "subPageButton";
 			toggleShowSubPagesButton.onclick = toggleShowSubPages;
			subPage.appendChild(toggleShowSubPagesButton);

			var reverseSubPagesButton = document.createElement('a');
			reverseSubPagesButton.innerHTML = "Order";
			reverseSubPagesButton.className = "subPageButton orderButton";
			reverseSubPagesButton.style.display = 'none';
 			reverseSubPagesButton.onclick = reverseSubPages;
			subPage.appendChild(reverseSubPagesButton);

			populateSubPageDiv(page.pageId, page.children);
		}
	});	
}

//Called at click of the "Subpages" link.
function toggleShowSubPages(){

	var listElement = this.parentNode.getElementsByTagName('ul')[0];

	if (listElement.style.display !== 'none')
	{ 
		//Hides the list of subpages.
		listElement.style.display = 'none';
		//Hides the "Order" link (no need for this when the subpages is not shown).
		this.parentNode.getElementsByClassName('orderButton')[0].style.display = 'none';
	}
	else 
	{
		//If the list of subpages is hidden it will be shown.
        listElement.style.display = 'block';
		this.parentNode.getElementsByClassName('orderButton')[0].style.display = 'inline';
    }
}

//Called at click of the "Order" link.
function reverseSubPages(){

	var parent = this.parentNode;
	var listElement = parent.getElementsByTagName('ul')[0];
    var subPageListItems = listElement.childNodes;

    //Turns the list elements around.
	for(var i = subPageListItems.length >>> 0; i--;)
	{
		listElement.appendChild(subPageListItems[i]);
	}
}