---
layout: m1-documentation
title: Instant search page customization
permalink: /doc/m1/customize-instantsearch/
---

Customize the instant search results page.

There are 3 folders involved in the instant search page customization:

1. `your-base-magento-folder/app/design/frontend/base/default/template/algoliasearch`
2. `your-base-magento-folder/js/algoliasearch`
3. `your-base-magento-folder/skin/frontend/base/default/algoliasearch`

In the first one you can find all the extension templates. In the others you’ll find the extension’s JavaScript and stylesheets.

<div class="alert alert-warning">
    Make sure you aren't modifying but <strong>overriding</strong> these files. You can learn how to do that by reading <a href="/magento/doc/m1/customize-extension/">"How to customize the extension"</a> first.
</div>

## Instant search page wrapper template

The wrapper template contains the layout of instant seach results page and all other templates are rendered into the wrapper.
To change the layout of the page, navigate to the templates directory and locate the [wrapper.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/instantsearch/wrapper.phtml) file. This file is the standard Magento template.

## Instant search result page templates

To edit all templates used on instant search result page navigate to the extension’s template folder and there to [instantsearch](https://github.com/algolia/algoliasearch-magento/tree/master/app/design/frontend/base/default/template/algoliasearch/instantsearch) folder.

In there you will find the templates used to render the drop-down menu:

* [hit.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/instantsearch/hit.phtml) - template of a single product
* [refinementsItem.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/instantsearch/refinementsItem.phtml) - template of a filter
* [currentRefinements.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/instantsearch/currentRefinements.phtml) - template of current refinements
* [stats.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/instantsearch/stats.phtml) - template of search statistics

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
        container: wrapper.appendChild(createISWidgetContainer('in_stock')),
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
