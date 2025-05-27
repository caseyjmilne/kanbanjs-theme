<?php 

add_action('wp_enqueue_scripts', function() {

    // Main stylesheet
    wp_enqueue_style(
        'test1-style',
        get_stylesheet_uri()
    );

    // Kanban Assets

    if( is_page('kanban' ) ) {

        wp_enqueue_style(
            'kanban-style',
            get_template_directory_uri() . '/components/kanban/kanban.style.css',
            array()
        );

        wp_enqueue_script(
            'kanban-class',
            get_template_directory_uri() . '/components/kanban/kanban.class.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'theme-main-script',
            get_template_directory_uri() . '/main.js', 
            array(),
            null,
            true
        );

    }

    if( is_page('editor' ) ) {

        wp_enqueue_script(
            'editor-component',
            get_template_directory_uri() . '/components/editor/Component.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-component-scheduler',
            get_template_directory_uri() . '/components/editor/ComponentScheduler.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-reactive-value',
            get_template_directory_uri() . '/components/editor/ReactiveValue.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-toolbox',
            get_template_directory_uri() . '/components/editor/Toolbox.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-text-block',
            get_template_directory_uri() . '/components/editor/blocks/TextBlock.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-image-block',
            get_template_directory_uri() . '/components/editor/blocks/ImageBlock.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-canvas',
            get_template_directory_uri() . '/components/editor/Canvas.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-settings',
            get_template_directory_uri() . '/components/editor/Settings.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-debug',
            get_template_directory_uri() . '/components/editor/Debug.js',
            array(),
            null,
            true
        );

        wp_enqueue_script(
            'editor-main',
            get_template_directory_uri() . '/components/editor/Editor.js',
            array(),
            null,
            true
        );

    } 

});
