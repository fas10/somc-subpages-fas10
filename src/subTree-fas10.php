<?php

class SubTree {

	//
	public function buildPageTree($topPage)
	{						
		//Gets all children of the page implementing the shortcode.
		$childPages = get_pages(array('parent' => $topPage->ID, 'sort_column' => 'post_title'));
		//An array that will hold the "SubPage" objects.		
		$subPages = array();
		
		//Creates a SubPage object for every child.
		foreach ($childPages as $page) 
		{
			$subPage = new SubPage;
			$subPage->pageId = $page->ID;
			$subPage->pageTitle = $page->post_title;
			$subPage->pageLink = get_page_link( $page->ID );
			$subPage->pageThumb = wp_get_attachment_url( get_post_thumbnail_id($page->ID) );
			$subPage->children = $this->buildPageTree($page);

			$subPages[] = $subPage;
		}		
		return $subPages;
	}
}

//The object representing a subpage.
class SubPage{

	public $pageId;
	public $pageTitle;
	public $pageLink;
	public $pageThumb;
	public $children;
}