---
layout: m2-documentation
title: Frontend issues
permalink: /doc/m2/frontend-issues/
description: Technical troubleshooting - Frontend issues
---

Now that we covered all the different types of backend issues related to the indexing, let’s have a look at the most common issues experienced on the **frontend**.

## You are seeing unexpected results ##
It is possible to  see unexpected results while you’re fetching your products. The best way to understand where it’s coming from is to compare them to the results you get with the same search in your Algolia dashboard:go to [Indices](https://www.algolia.com/explorer/indices) then search for your default product index (by default : magento_default_products).

<figure>
    <img src="../../../img/troubleshooting/17-search-frontend.png" class="img-responsive" alt="Search frontend">
    <figcaption>Search on the frontend</figcaption>
</figure>

<figure>
    <img src="../../../img/troubleshooting/18-search-dashboard.png" class="img-responsive" alt="Search dashboard">
    <figcaption>Search on the dashboard</figcaption>
</figure>

If you see the same behaviour on the dashboard and on the frontend, and it looks unexpected to you, this probably means that there’s an issue on how you configured your index. You can have a look at the [online documentation](https://community.algolia.com/magento/doc/m2/indexing/) about this topic.

If you see differences between your frontend and your dashboard, you should:
Check the attributes “**visibility_search**” and “**visibility_catalog**” of the records. If they are set to 0, they won’t appear in related pages on the frontend. 

<figure>
    <img src="../../../img/troubleshooting/19-visibility-attributes.png" class="img-responsive" alt="Visibility attributes">
    <figcaption>Visibility attributes</figcaption>
</figure>

Have a look at the “Query Rules” tab of the index. The results might be affected by [facet query rules](https://community.algolia.com/magento/doc/m2/indexing/#facets) or by [category merchandising](https://community.algolia.com/magento/doc/m2/visual-category-merchandising/).

## There are no images in your results ##
It can happen that the product images don’t exist anymore. The Algolia extension is relying on Magento’s cache to use the resized images, as they only exist in the **pub/media/catalog/product/cache** directory. 
This directory is emptied each time you clean the image cache of Magento. It means that if you do so, the indexed images won’t exist anymore and you have to reindex your product to update the Algolia records with the new urls. If all your images suddenly disappear on your frontend, that’s probably what happened.

<figure>
    <img src="../../../img/troubleshooting/20-broken-images.png" class="img-responsive" alt="Broken images">
    <figcaption>Broken images</figcaption>
</figure>

## Use your favorite browser to help you ##
Some of the web browsers like [Mozilla Firefox](https://www.mozilla.org/) or [Google Chrome](https://www.google.com/chrome/) have very useful tools to help you investigate the issues on the frontend. As the extension loads files and templates that are the same in every Magento 2 website, first thing you can do is to check is everything is fine in the code source of your web pages.

### Checking the code source ###

To display the code source, press **Ctrl + U** (or **Cmd + U** on MacOS) .

You can:

- If you didn't turn on the JavaScript merging in the Magento configuration, you can check if the 3 JavaScript embedded by the extension are loaded in the <head> div (**common.js, instantsearch.js and autocomplete.js**). These 3 files are mandatory for the search to work.
- Search if the variable **window.algoliaConfig** is defined just below. This variable fetches all the configuration related to Algolia coming from the Magento back-office.
- Check if the native search input on the header has been replaced by the Algolia search input. For example, search for **name=”q”** in the code source, the input should have now **algolia-search-input** in its class attribute. 
- In the products listing pages powered by [InstantSearch.js](https://community.algolia.com/instantsearch.js/), search for the **DOM selector** defined in the back-office in Stores > Algolia Search > Instant Search Results Page > DOM selector (by default, it’s **.columns**). This selector has to be on the page for the results to be injected in the page.

<figure>
    <img src="../../../img/troubleshooting/21-dom-selector.png" class="img-responsive" alt="DOM selector">
</figure>

Keep in mind that all these files injections and template modifications use the standard [Magento layout system](https://devdocs.magento.com/guides/v2.2/frontend-dev-guide/layouts/layout-overview.html). 

You can have a look at the [view/frontend/layout/algolia_search_handle.xml](https://github.com/algolia/algoliasearch-magento-2/blob/master/view/frontend/layout/algolia_search_handle.xml) file to see how it works.

Note that this layout update has been developed to work with the native **Magento Luma Theme**, so it’s possible that if you made some customization on your frontend, you may have to override the Magento layout update as well.  

Your browser offers other useful tools situated in the developer tools. To open it, press **F12** (or **fn + F12** on MacOS).

### Using the console ###
In the **console tab**, you can type “**algoliaConfig**” then press Enter, you will see all the configuration contained in the object (coming from your Magento configuration). It is useful to check if your frontend is up-to-date with the latest modifications you made in the back-office and perhaps remind you to clear the cache.

<figure>
    <img src="../../../img/troubleshooting/22-console-tab.png" class="img-responsive" alt="Console tab">
    <figcaption>Console tab</figcaption>
</figure>

### Checking the calls made ###
In the **network tab**, you can filter the results with the “**XHR**” subtab. Then you can monitor each call to Algolia’s servers when you type your search. By clicking on a call, you will get all the information relative to the request and the response, which can be very useful to verify if the search is working as it should.

<figure>
    <img src="../../../img/troubleshooting/23-network-tab.png" class="img-responsive" alt="Network tab">
    <figcaption>Network tab</figcaption>
</figure>

### Investigating the autocomplete HTML code ###
If you want to investigate the HTML code of the autocomplete menu with the developer tools, you can activate the debug mode in **Stores > Algolia Search > Autocomplete Menu > Enable autocomplete** menu’s debug mode. 
If you do so, the dropdown won’t disappear anymore when you click outside the menu, which is very useful to have a closer look at the HTML generated by the extension.

<figure>
    <img src="../../../img/troubleshooting/24-autocomplete-debug.png" class="img-responsive" alt="Autocomplete debug">
</figure>
