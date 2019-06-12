---
layout: m2-documentation
title: Instant search page
permalink: /doc/m2/customize-instantsearch/
description: Learn how to customize the features and design of instant search results page in Algolia extension for Magento 2
redirect_to: https://www.algolia.com/doc/integration/magento-2/customize/instant-search-page/
---

<div class="center">
	<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/-gy92Pbwb64" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

## Customization

Customize the instant search results page.

There is 1 folder involved in the instant search page customization:

`your-base-magento-folder/vendor/algolia/algoliasearch-magento-2/view/frontend`

In this folder you can find all the extension’s templates, JavaScripts and stylesheets.

<!-- <div class="alert alert-warning">
    Make sure you aren't modifying but <strong>overriding</strong> these files. You can learn how to do that by reading <a href="/magento/doc/m1/customize-extension/">"How to customize the extension"</a> first.
</div> -->

## Instant search page wrapper template

The wrapper template contains the layout of instant seach results page and all other templates are rendered into the wrapper.
To change the layout of the page, navigate to the templates directory and locate the [wrapper.phtml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/instant/wrapper.phtml) file. This file is the standard Magento template.

## Instant search result page templates

To edit all templates used on instant search result page navigate to the extension's template folder and there to [instant](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/instant/) folder.

In there you will find the templates used to render the instant search page:

* [hit.phtml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/instant/hit.phtml) - template of a single product
* [facet.phtml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/instant/facet.phtml) - template of a filter
* [refinements.phtml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/instant/refinements.phtml) - template of current refinements
* [stats.phtml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/templates/instant/stats.phtml) - template of search statistics

## Customize the integration (JavaScript)

You can adjust all the logic of the InstantSearch.js integration by couple of custom JS methods:

- `algoliaHookBeforeInstantsearchInit(instantsearchOptions)`
	- can be used to modify default [instant search options](https://community.algolia.com/instantsearch.js/documentation/#initialization)
- `algoliaHookBeforeWidgetInitialization(allWidgetConfiguration)`
    - can be used to add / remove / modify any [widget(s)](https://community.algolia.com/instantsearch.js/documentation/#widgets)
- `algoliaHookBeforeInstantsearchStart(search)`
    - can be used to modify the [instantsearch instance](https://community.algolia.com/instantsearch.js/documentation/#initialization) before call of [`start()`](https://community.algolia.com/instantsearch.js/documentation/#start) method
- `algoliaHookAfterInstantsearchStart(search)`
    - can be used to modify the [instantsearch instance](https://community.algolia.com/instantsearch.js/documentation/#initialization) after call of [`start()`](https://community.algolia.com/instantsearch.js/documentation/#start) method

By defining this method(s) in your JS file, you can directly modify it's parameter which must be returned back from the method.

Example of `algoliaHookBeforeInstantsearchInit(instantsearchOptions)` method:

```js
function algoliaHookBeforeInstantsearchInit(instantsearchOptions) {
    // modify default instantsearchOptions as you want

    return instantsearchOptions;
}
```

Example on how to add a new `toggle` widget to instant search page:

```js
function algoliaHookBeforeWidgetInitialization(allWidgetConfiguration) {
    var wrapper = document.getElementById('instant-search-facets-container');

    var widget = {
        container: wrapper.appendChild(createISWidgetContainer(ratingAttr)),
        attributeName: 'in_stock',
        label: 'In Stock',
        values: {
            on: 1
        },
        templates: {
            header: '<div class="name">Is on stock</div>'
        }
    };

    if (typeof allWidgetConfiguration['toggle'] === 'undefined') {
        allWidgetConfiguration['toggle'] = [widgetConfig];
    } else {
        allWidgetConfiguration['toggle'].push(widgetConfig);
    }

    return allWidgetConfiguration;
}
```

All default widgets can be found in `allWidgetConfiguration` object and can be removed or modified in this method.
