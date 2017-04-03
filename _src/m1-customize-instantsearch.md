---
layout: m1-documentation
title: Instant search page customization
permalink: /doc/m1/customize-instantsearch/
---

All temlates for rendering instant search page are located in [`instantsearch`](https://github.com/algolia/algoliasearch-magento/tree/master/app/design/frontend/base/default/template/algoliasearch/instantsearch) folder and the JS code handling instant search page sits in [`instantsearch.js`](https://github.com/algolia/algoliasearch-magento/blob/master/js/algoliasearch/instantsearch.js) file.

If you want to use a widget that is not exposed in the administration panel for a particular faceted attribute you can configure it using the `customAttributeFacet` variable in the `instantsearch.js` file. For example if you want to have a toggle widget for the `in_stock` attribute, your `customAttributeFacet` variable should look like:

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

<div class="alert alert-warning">
    Make sure you aren't modifying but <strong>overriding</strong> these files. You can learn how to do that by reading <a href="{{ site.baseurl }}/doc/m1/customize-extension/">"How to customize the extension"</a> first.
</div>
