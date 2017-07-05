---
layout: m1-documentation
title: Front-end custom events
permalink: /doc/m1/frontend-events/
---

## Autocomplete menu events

You can adjust all the logic of the [autocomplete.js](https://github.com/algolia/autocomplete.js) integration by writing a custom method `algoliaHookBeforeAutocompleteStart(sources, options, algoliaClient)` in your JS file.

<div class="alert alert-info">
    You can learn how to add a custom JS file in a
    <a href="{{ site.baseurl }}/doc/m1/customize-extension/#adding-a-new-javascript-file">Create a custom extension tutorial</a>.
</div>

If this method is defined in your code, it will be called by the extension right before it initializes the autocomplete feature.

In this method you can modify the [datasources](https://github.com/algolia/autocomplete.js#datasets) and [options](https://github.com/algolia/autocomplete.js#options) variable which are then used by autocomplete menu.

Example of the method:

```js
function algoliaHookBeforeAutocompleteStart(sources, options, algoliaClient) {

	// modify default sources and options as you want

	return [sources, options];
}
```

## Instant search page events

You can adjust all the logic of the InstantSearch.js integration by couple of custom JavaScript methods:

- `algoliaHookBeforeInstantsearchInit(instantsearchOptions)`
	- can be used to modify default [instant search options](https://community.algolia.com/instantsearch.js/documentation/#initialization)
- `algoliaHookBeforeWidgetInitialization(allWidgetConfiguration)`
    - can be used to add / remove / modify any [widget(s)](https://community.algolia.com/instantsearch.js/documentation/#widgets)
- `algoliaHookBeforeInstantsearchStart(search)`
    - can be used to modify the [instantsearch instance](https://community.algolia.com/instantsearch.js/documentation/#initialization) before call of [`start()`](https://community.algolia.com/instantsearch.js/documentation/#start) method
- `algoliaHookAfterInstantsearchStart(search)`
    - can be used to modify the [instantsearch instance](https://community.algolia.com/instantsearch.js/documentation/#initialization) after call of [`start()`](https://community.algolia.com/instantsearch.js/documentation/#start) method

By defining this method(s) in your JS file, you can directly modify it's parameter which must be returned back from the method.

<div class="alert alert-info">
    You can learn how to add a custom JS file in a
    <a href="{{ site.baseurl }}/doc/m1/customize-extension/#adding-a-new-javascript-file">Create a custom extension tutorial</a>.
</div>

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
