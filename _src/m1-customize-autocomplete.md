---
layout: m1-documentation
title: Autocomplete menu customization
permalink: /customize-autocomplete/
---

Customize your autocomplete drop-down menu which appears underneath search bar on your Magento site.

There are 3 folders involved in the drop-down menu customization:

1. `your-base-magento-folder/app/design/frontend/base/default/template/algoliasearch`
2. `your-base-magento-folder/js/algoliasearch`
3. `your-base-magento-folder/skin/frontend/base/default/algoliasearch`

In the first one you can find all the extension’s templates, in the second and third one you’ll find the extension’s JavaScripts and stylesheets.

## Search box template

To change the search bar appearance navigate to templates directory and locate the [autocomplete.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete.phtml) file. This file is the standard Magento’s template and is used only in case you are using the default (.algolia-search-input) search box selector.

## Drop-down templates

To edit all templates used in autocomplete menu navigate to the extension’s template folder and there to [autocomplete](https://github.com/algolia/algoliasearch-magento/tree/master/app/design/frontend/base/default/template/algoliasearch/autocomplete) folder. 

In there you will find the templates used to render the drop-down menu:

* [menu.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/menu.phtml) - contains the drop-down menu’s layout
* [product.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/product.phtml) - template of a single product
* [category.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/category.phtml) - template of a single category
* [page.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/page.phtml) - template of a single page 
* [suggestion.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/suggestion.phtml) - template of a single popular query
* [attribute.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/attribute.phtml) - template used for any extra content configured in administration area

## Customize the integration (JavaScript)

You can adjust all the logic of the autocomplete.js integration by editing the file of the same name located in the [JavaScript folder](https://github.com/algolia/algoliasearch-magento/blob/master/js/algoliasearch/autocomplete.js).

Feel free to:

* Add custom sources,
* Customize templates,
* Customize the behaviour.

## Look & feel

The extension provides default CSS rules which are located in [algoliasearch.css](https://github.com/algolia/algoliasearch-magento/blob/master/skin/frontend/base/default/algoliasearch/algoliasearch.css) file in the extension’s CSS folder.

You can very easily override existing rules or add your own in your custom CSS theme file.
