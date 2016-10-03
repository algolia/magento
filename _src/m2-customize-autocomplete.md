---
layout: m2-documentation
title: Autocomplete menu customization
permalink: /m2/customize-autocomplete/
---

Customize your autocomplete drop-down menu which appears underneath search bar on your Magento site.

There is one essential foldes involved in the drop-down menu customization:

`your-base-magento-folder/vendor/algolia/algoliasearch-magento-2/view/frontend`

In this folder you can find all the extension’s templates, JavaScripts and stylesheets.

## Search box template

To change the search bar appearance navigate to templates directory and locate the [templates/autocomplete.phtml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/autocomplete.phtml) file. This file is the standard Magento’s template and is used only in case you are using the default (.algolia-search-input) search box selector.

## Drop-down templates

To edit all templates used in autocomplete menu navigate to the extension’s `templates` folder and there to [autocomplete](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete) folder. 

In there you will find the templates used to render the drop-down menu:

* [menu.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/menu.phtml) - contains the drop-down menu’s layout
* [product.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/product.phtml) - template of a single product
* [category.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/category.phtml) - template of a single category
* [page.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/page.phtml) - template of a single page 
* [suggestion.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/suggestion.phtml) - template of a single popular query
* [attribute.phtml](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/templates/autocomplete/attribute.phtml) - template used for any extra content configured in administration area

## Customize the integration (JavaScript)

You can adjust all the logic of the [autocomplete.js](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/web/autocomplete.js) integration by editing the file of the same name located in the [web folder](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/web).

Feel free to:

* Add custom sources,
* Customize templates,
* Customize the behaviour.

## Look & feel

The extension provides default CSS rules which are located in [algoliasearch.css](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/web/internals/algoliasearch.css) file in the extension’s [web/internals](https://github.com/algolia/algoliasearch-magento-2/tree/master/view/frontend/web/internals) folder.

You can very easily override existing rules or add your own in your custom CSS theme file.
