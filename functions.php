<?php 

add_action('wp_enqueue_scripts', function() {

    // Main stylesheet
    wp_enqueue_style(
        'mytheme-style',
        get_stylesheet_uri()
    );

    // Kanban stylesheet (assumes it's in the same directory as style.css)
    wp_enqueue_style(
        'kanban-style',
        get_template_directory_uri() . '/kanban.style.css',
        array('mytheme-style') // Optional: make it depend on the main style
    );

    if( is_page('kanban' ) ) {

        wp_enqueue_script(
        'kanban-class', // handle
        get_template_directory_uri() . '/kanban.class.js', // path
        array(), // dependencies, e.g., array('jquery') if needed
        null, // version (use null to skip, or a version string)
        true // in footer
    );

    wp_enqueue_script(
        'theme-main-script', // handle
        get_template_directory_uri() . '/main.js', // path
        array(), // dependencies, e.g., array('jquery') if needed
        null, // version (use null to skip, or a version string)
        true // in footer
    );

    }

    

});
