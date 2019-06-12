---
layout: m1-documentation
title: Autocomplete menu customization
permalink: /doc/m1/customize-autocomplete/
description: Learn how to customize the features and design of autocomplete menu in Algolia extension for Magento
redirect_to: https://www.algolia.com/doc/integration/magento-1/customize/autocomplete-menu/
---

Customize the autocomplete drop-down menu which appears underneath the search bar on your Magento site.

There are 3 folders involved in the drop-down menu customization:

1. `your-base-magento-folder/app/design/frontend/base/default/template/algoliasearch`
2. `your-base-magento-folder/js/algoliasearch`
3. `your-base-magento-folder/skin/frontend/base/default/algoliasearch`

In the first one you can find all the extension templates. In the others you’ll find the extension’s JavaScript and stylesheets.

<div class="alert alert-warning">
    Make sure you aren't modifying but <strong>overriding</strong> these files. You can learn how to do that by reading <a href="/magento/doc/m1/customize-extension/">"How to customize the extension"</a> first.
</div>

## Search box template

To change the search bar appearance, navigate to the templates directory and locate the [autocomplete.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete.phtml) file. This file is the standard Magento template and is used only when you use the default (.algolia-search-input) search box selector.

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

You can adjust all the logic of the [autocomplete.js](https://github.com/algolia/autocomplete.js) integration by writing a custom method `algoliaHookBeforeAutocompleteStart(sources, options, algoliaClient)` in your JS file.
If this method is defined in your code, it will be called by the extension right before it initializes the autocomplete feature.

In this method you can modify the [datasources](https://github.com/algolia/autocomplete.js#datasets) and [options](https://github.com/algolia/autocomplete.js#options) variable which are then used by autocomplete menu.

Example of the method:

```js
function algoliaHookBeforeAutocompleteStart(sources, options, algoliaClient) {

	// modify default sources and options as you want

	return [sources, options];
}
```

## Look & feel

The extension provides default CSS rules which are located in [algoliasearch.css](https://github.com/algolia/algoliasearch-magento/blob/master/skin/frontend/base/default/algoliasearch/algoliasearch.css) file in the extension’s CSS folder.

You can very easily override existing rules or add your own in your custom CSS theme file.
