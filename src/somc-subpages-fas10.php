<?php
/*
Plugin Name: somc-subpages-fas10
Plugin URI: 
Descriptin: Displays all subpages of the page it is placed on.
Version 1.0
Author: Martin Fast
*/

class SomcSubpages{

	public function __construct()
	{

		$this->pluginPath = dirname(__FILE__);	
		$this->pluginUrl = WP_PLUGIN_URL . '/somc-subpages-fas10';
		
		add_action( 'wp_enqueue_scripts', array($this, 'add_script'));
		add_shortcode('somc-subpages-fas10', array($this, 'shortcode'));		
		add_filter('widget_text', 'do_shortcode');		
	}

	//Adding script and css to the plugin.
	function add_script() 
	{
		wp_register_script('subpages_script', plugins_url('/subpages-fas10.js', __FILE__));
		wp_enqueue_script('subpages_script'); 
		wp_register_style('subpages_style', plugins_url('/subpages-fas10.css', __FILE__));
		wp_enqueue_style('subpages_style'); 
	}	

	//The code that will fire when the shortcode "[somc-subpages-fas10]" is used.
	function shortcode()  
    {  
    	Include 'subTree-fas10.php';
    	$subTree = new SubTree;

    	global $post;
		//Create an array of the current page's children.
		$subPageTree = $subTree->buildPageTree($post);

?>
		<div id="<?php echo $post->ID; ?>"></div>
		<script type="text/javascript">
			currentPageId = <?php echo $post->ID; ?>;
			//Creates a JSON object to hold the subpage tree for easy access in the javascript. 
			subPages = <?php echo json_encode($subPageTree); ?>;	
			//Calls the javascript function that builds the subpage tree in HTML.
			populateSubPageDiv(<?php echo $post->ID; ?>, subPages);		
		</script>
<?php

	} 
}

$somcSubpages = new SomcSubpages;

?>