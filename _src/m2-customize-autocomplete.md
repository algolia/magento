---
layout: m2-documentation
title: Autocomplete menu
permalink: /doc/m2/customize-autocomplete/
description: Learn how to customize the features and design of autocomplete menu in Algolia extension for Magento 2
---

<div class="center">
	<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/S6yuPl-bsFQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

## Customization

Customize the autocomplete drop-down menu which appears underneath the search bar on your Magento site.

There is one essential folder involved in the drop-down menu customization:

`your-base-magento-folder/vendor/algolia/algoliasearch-magento-2/view/frontend`

In this folder you can find all the extension’s templates, JavaScripts and stylesheets.

<!-- <div class="alert alert-warning">
    Make sure you aren't modifying but <strong>overriding</strong> these files. You can learn how to do that by reading <a href="/magento/doc/m1/customize-extension/">"How to customize the extension"</a> first.
</div> -->

## Search box template

To change the search bar appearance, navigate to the templates directory and locate the [autocomplete.phtml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/autocomplete.phtml) file.
This file is the standard Magento template and is used only when you use the default (`.algolia-search-input`) search box selector.

## Drop-down templates

To edit all templates used in autocomplete menu navigate to the extension’s template folder and there to [autocomplete](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete) folder.

In there you will find the templates used to render the drop-down menu:

* [menu.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/menu.phtml) - contains the drop-down menu’s layout
* [product.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/product.phtml) - template of a single product
* [category.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/category.phtml) - template of a single category
* [page.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/page.phtml) - template of a single page
* [suggestion.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/suggestion.phtml) - template of a single popular query
* [attribute.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/attribute.phtml) - template used for any extra content configured in administration area

## Customize the integration (JavaScript)

You can adjust all the logic of the [autocomplete.js](https://github.com/algolia/autocomplete.js) integration by leveraging [a custom events](/doc/m2/frontend-events/) in your JS file.
If this events are defined in your code, it will be called by the extension right before it initializes the autocomplete feature.

With these events you can modify the [datasources](https://github.com/algolia/autocomplete.js#datasets) and [options](https://github.com/algolia/autocomplete.js#options) variable which are then used by autocomplete menu.

Examples of events:

```js
algolia.registerHook('beforeAutocompleteSources', function(sources, algoliaClient) {
	// modify default sources

	return sources;
});

algolia.registerHook('beforeAutocompleteOptions', function(options) {
	// modify default options

	return options;
});
```

## Look & feel

The extension provides default CSS rules which are located in [algoliasearch.css](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/web/internals/algoliasearch.css) file in the extension’s [web/internals](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/web/internals) folder.

You can very easily override existing rules or add your own in your custom CSS theme file.
