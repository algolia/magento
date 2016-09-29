---
layout: m1-documentation
title: How to index data from outside of Magento
permalink: /external-data/
---

There are situations when you want to add external data source to your drop-down menu. For example integrate WordPress posts to you Magento’s autocomplete. In order to do that, you just need to follow a few steps:

## Create a new index

You will need to create a new Algolia index with data you want to display in autocomplete menu. The index can be created via [Algolia’s PHP API client](https://github.com/algolia/algoliasearch-client-php), uploaded as a JSON file via [Algolia’s index explorer](https://www.algolia.com/explorer) or created by third party applications (like [WordPress](https://community.algolia.com/wordpress/), [ZenDesk](https://community.algolia.com/zendesk/), ...). You can find more information about index creation in [this guide](https://www.algolia.com/doc/guides/getting-started/quick-start#creating-your-first-index).

## Create autocomplete template

In order to display records from your new index you’ll need to create a template for single record. Let’s assume that each of your records in the new index has two attributes: value and url. In that case you can use [attribute.phtml](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/template/algoliasearch/autocomplete/attribute.phtml) template.

If you have more attributes you want to display or you want to have completely different template, you can copy attribute.phtml template, name it as you want and edit as much as needed. Be sure you change value of id attribute in the <script> tag when creating a new template.

When you have your custom template created, you need to add it to [algoliasearch.xml layout file](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/layout/algoliasearch.xml) to tell Magento to render this template to the website. You can locate

```xml
<!-- INSERT YOUR CUSTOM TEMPLATES HERE -->
```

lines and add a new line according example:

```xml
<!-- 
Example: 
<block type="core/template" template="algoliasearch/[autocomplete_or_instantsearch]/your_custom_template_name.phtml" name="algolia-your-custom-template-name"/> 
-->
```

## Create new data data source

To create a new data source you need to edit [autocomplete.js](https://github.com/algolia/algoliasearch-magento/blob/master/js/algoliasearch/autocomplete.js) file in the extension’s JavaScript folder. There you are able to create a custom data source, append it to sources variable and pass it to autocomplete(...) call.

To do so, you need to locate 

```javascript
/**
 * ADD YOUR CUSTOM DATA SOURCE HERE
 **/
```

lines. You can put your new data source bellow those lines:

```javascript
/**
 * ADD YOUR CUSTOM DATA SOURCE HERE
 **/

// new source appended to the `sources` array

var yourIndex = algolia_client.initIndex("your_index_name");

var customIndexOptions = {
  hitsPerPage: 4
};

sources.push({
  source: $.fn.autocomplete.sources.hits(yourIndex, customIndexOptions),
  templates: {
    suggestion: function (hit) {
	  // id_of_your_template should be value of ID attribute 
	  // in <script> tag of your template
	  var template = $('#id_of_your_template').html();
	  
	  return algoliaBundle.Hogan.compile(template).render(hit);
    }
  }
});
```

That’s it. Now you are able to search for your external data.

More information about autocomplete data sources and other autocomplete.js features you can read in [this tutorial](https://www.algolia.com/doc/guides/search/auto-complete#ui).