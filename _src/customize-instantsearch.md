---
layout: documentation
title: Instant search page customization
permalink: /customize-instantsearch/
---

All code for rendering instant search page can be found in [`instantsearch.phtml`](https://github.com/algolia/algoliasearch-magento/blob/master/design/frontend/template/instantsearch.phtml).
If you want to use a widget that is not exposed in the administration panel for a particular faceted attribute you can configure it using the `customAttributeFacet` variable of the `instantsearch.phtml` file. For example if you want to have a toggle widget for the `in_stock` attribute, your `customAttributeFacet` variable should look like:

{% highlight js %}
var customAttributeFacet = {
  in_stock: function (facet, templates) {
    instantsearch.widgets.toggle({
      container: facet.wrapper.appendChild(document.createElement('div')),
      attributeName: 'in_stock',
      label: 'In Stock',
      values: {
        on: 1,
        off: 0
      },
      templates: templates
    })
  },
  categories: function(facet, templates) {
    [...]
  }
};
{% endhighlight %}

More information about customizing widgets you can find in [instantsearch.js documentation](https://community.algolia.com/instantsearch.js/documentation/).