---
layout: m1-documentation
title: How to add external autocomplete source
permalink: /doc/m1/external-autocomplete-source/
redirect_from:
  - /external-autocomplete-source/
  - /doc/external-autocomplete-source/
---

There are situations when you want to add external data source to your drop-down menu. You may want to integrate WordPress posts into your Magento site’s autocomplete, for example. In order to do that, you just need to follow a few steps:

## Create a new index

You will need to create a new Algolia index with data you want to display in autocomplete menu. The index can be created via [Algolia’s PHP API client](https://github.com/algolia/algoliasearch-client-php), uploaded as a JSON file via [Algolia’s index explorer](https://www.algolia.com/explorer), or created by third party applications (like [WordPress](https://community.algolia.com/wordpress/), [ZenDesk](https://community.algolia.com/zendesk/), ...). You can find more information about index creation in [this guide](https://www.algolia.com/doc/guides/getting-started/quick-start#creating-your-first-index).

## Create autocomplete template

In order to display records from your new index you’ll need to create a template for a single record. Let’s assume that each of your records in the new index has two attributes: `value` and `url`. In that case you can use the [attribute.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/attribute.phtml) template.

If you have more attributes that you want to display or you want to have completely a different template, you can copy the attribute.phtml template, name it as you want and edit as needed. Be sure to change the value of `id` attribute in the `<script>` tag when creating a new template.

Once you’ve created your custom template, you need to add it to [algoliasearch.xml layout file](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/layout/algoliasearch.xml) to tell Magento to include this template in the website. You can locate

```xml
<!-- INSERT YOUR CUSTOM TEMPLATES HERE -->
```

lines and add a new line (see example):

```xml
<!-- 
Example: 
<block type="core/template" template="algoliasearch/[autocomplete_or_instantsearch]/your_custom_template_name.phtml" name="algolia-your-custom-template-name"/> 
-->
```

## Create new data data source

To create a new data source you need to edit [autocomplete.js](https://github.com/algolia/algoliasearch-magento/blob/master/js/algoliasearch/autocomplete.js) file in the extension’s JavaScript folder. There you are able to create a custom data source, append it to `sources` variable and pass it to `autocomplete(...)` call.

To do so, you need to locate 

```javascript
/**
 * ADD YOUR CUSTOM DATA SOURCE HERE
 **/
```

lines. You can put your new data source below those lines:

```javascript
/**
 * ADD YOUR CUSTOM DATA SOURCE HERE
 **/

var customIndex = algolia_client.initIndex("your_index_name");
var customIndexOptions = {
  hitsPerPage: 4
};

// id_of_your_template should be value of ID attribute
// in <script> tag of your template
var customTemplate = template = $('#id_of_your_template').html();

// new source appended to the `sources` array
sources.push({
  source: $.fn.autocomplete.sources.hits(customIndex, custom_index_options),
  templates: {
    suggestion: function (hit) {
      return algoliaBundle.Hogan.compile(customTemplate).render(hit);
    }
  }
});
```

That’s it. Now you are able to search for your external data.

More information about autocomplete data sources and other autocomplete.js features you can read in [this tutorial](https://www.algolia.com/doc/guides/search/auto-complete#ui).
