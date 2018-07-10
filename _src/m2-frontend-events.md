---
layout: m2-documentation
title: Front-end custom events
permalink: /doc/m2/frontend-events/
description: Learn how use frontend custom events to be able to modify autocomplete menu and instant search results page in Algolia extension for Magento 2
---

## Autocomplete menu events

You can adjust all the logic of the [autocomplete.js](https://github.com/algolia/autocomplete.js) integration by registering a custom methods in your JS file.
Registering of a hooks can be done by using `algolia` JS object.

<div class="alert alert-info">
    You can learn how to add a custom JS file in a
    <a href="{{ site.baseurl }}/doc/m2/customize-extension/#adding-a-new-javascript-file">Create a custom extension tutorial</a>.
</div>

Possible hooks:

- `beforeAutocompleteSources(sources, algoliaClient)`
    - can by used to modify default [datasources](https://github.com/algolia/autocomplete.js#datasets)
    - the hook must return `sources` variable
- `beforeAutocompleteOptions(options)`
    - can by used to modify default [options](https://github.com/algolia/autocomplete.js#options) of autocomplete menu
    - the hook must return `options` variable

Those hooks will be triggered right before it initializes the autocomplete feature.

Example of the hooks:

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

## Instant search page events

You can adjust all the logic of the InstantSearch.js integration by registering a couple of custom hooks:

- `beforeInstantsearchInit(instantsearchOptions)`
	- can be used to modify default [instant search options](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#description)
- `beforeWidgetInitialization(allWidgetConfiguration)`
    - can be used to add / remove / modify any [widget(s)](https://community.algolia.com/instantsearch.js/v2/widgets.html)
- `beforeInstantsearchStart(search)`
    - can be used to modify the [instantsearch instance](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#description) before call of [`start()`](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#struct-start) method
- `afterInstantsearchStart(search)`
    - can be used to modify the [instantsearch instance](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#description) after call of [`start()`](https://community.algolia.com/instantsearch.js/v2/instantsearch.html#struct-start) method

By registering this hook(s) in your JS file, you can directly modify it's parameter which must be returned back from the method.

Example of `beforeInstantsearchInit(instantsearchOptions)` hook:

```js
algolia.registerHook('beforeInstantsearchInit', function(instantsearchOptions) {
	// modify default instantsearchOptions

	return instantsearchOptions;
});
```

Example on how to add a new `toggle` widget to instant search page:

```js
algolia.registerHook('beforeWidgetInitialization', function(allWidgetConfiguration) {
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
});
```

All default widgets can be found in `allWidgetConfiguration` object and can be removed or modified in this method.
