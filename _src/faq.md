---
layout: faq
title: FAQ
permalink: /faq/
---

## How many records does the Magento extension create?

The Magento extensions creates several indices.

To be able to have very fast results Algolia precomputes part of the order of the results at indexing time. This means that you cannot have multiple sorts for a single index. To handle multiple sorts, we need to create 1 Algolia index for each sort.

In Magento, this results in creating by default:

- 1 index per store
- 1 index per store per additional sort order (by price, by date, ...)

Which means that for a Magento instance with:

- 2 stores (2 languages for example)
- 100 products
- 2 sorts on "price" (asc, desc)
- 2 sorts on "date" (asc, desc)

You'll have 100 * 2 + 100 * 4 * 2 = 1000 Algolia records.

If you enable the customer group feature it creates:

- 1 index per store
- 1 index per price sort per group per store => This is to be able to have the correct sort on price no matter what the user group
- 1 index per non-price sort per store

Which means that for a Magento instance with:

- 2 stores (2 languages for example)
- 100 products
- 5 customer groups
- 2 sorts on "price" (asc, desc)
- 2 sorts on "date" (asc, desc)

You'll have 100 * 2 + 100 * 2 * 5 * 2 + 100 * 2 * 2 = 2600 Algolia records.

You can reduce the number of records by removing some sorts. This can be configured in the extension administration panel. See the screenshot below:

<figure>
    <img src="../img/sorts.png" class="img-responsive">
    <figcaption>Sorting configuration</figcaption>
</figure>

## Why Magento shows "404 error page not found." in configuration?

Logout and login from your Magento administration panel should fix the issue.

If it doesn't work you can follow this procedure [http://fanplayr.com/resources/magento-404-error-page-not-found-in-configuration/](http://fanplayr.com/resources/magento-404-error-page-not-found-in-configuration/).

## Can I disable Algolia on some store?

Yes you just need to disable indexing for the store where you do not need Algolia. Navigate to **System > Configuration > Algolia Search**, in upper left corner switch to store you want to disable from indexing. Then you can just disable indexing in the configuration. See the screenshot:

<figure>
    <img src="../img/disable-indexing.png" class="img-responsive">
    <figcaption>Enable indexing setting</figcaption>
</figure>

## I hit "Reindex" button, but there are still no products in Algolia indices

In case you have indexing queue enabled, the reindex button will "only" insert indexing jobs to queue database table and not really send them to Algolia. Please make sure you have set queue proccessing correctly and you have set reasonable number of products to be processed in one job. If you set the number od processed products too high the processing script may run out of memory and no products will be indexed.
More information about indexing queue can be found in [documentation](/magento/documentation/#indexing-queue).

## Some of my products do not come up during searching

At first please check if those products are indexed correctly in Algolia. You can go to your [Algolia explorer](https://www.algolia.com/explorer) select your default products index and search for products which are missing on your website.
If you can find the missing products in Algolia, check if the products have set correct visibility. If products should be visible only in "Catalog", they will not come up when searching, but only on instant search page in category.

If you cannot find the products in Algolia indices, the products are not indexed in Algolia. The extension indexes only visible, enabled and "on-stock" products (only in case you have set you want to index only "on-stock" products). More information about indexing you can find in [documentation](/magento/documentation/#indexing).
So please check if the products meet all the requirements for indexing. If they do you should hit "Reindex" button again and check again the Algolia index.

If the issues persist you can go Algolia configuration in Magento, turn on logging and investigate log files. There you should be able to find more information about what is going on while re-indexing. More information about troubleshooting and debugging you can find in [documentation](/magento/documentation/#logging--debugging).

## I cannot find my products by SKU

Please, make sure you are using the newest version of the extension. And make sure you set SKU as searchable attribute to index in Algolia's extension configuration in Magento backend.

## I have deleted some products, why are they still appearing in Algolia indices even after full reindex?

Please, make sure you are using the latest version of the extension. It happens when you update / delete your products directly in database and do not trigger standart Magento hooks. The full reindex then had problem with recognizing deleted products and removing them from Algolia.
This issue was resolved in version 1.6.0. Instruction how to upgrade can be found in [documentation](/magento/documentation/#upgrade).

## Why are images not showing up?

Since Algolia is displaying results without going through the backend of magento, at indexing time we need to generate a link for the url. What magento give you when you are asking for this url is the url of the cached and resized image that you need to display.

On some occasions, users of our extension have encountered an issue where the cache for the images would not get automatically generated.

First thing you need to check is that you have a recent enough version of the extension. If you are using a version lower than 1.5.x, the first thing you need to do is update to the latest version.

There is two main issues that you can have with images are the following:

**If images are there and then go away:**

- **Why:**
It usually means that the image cache has been dropped, this usually something triggered manually in System > Cache management or via cli. Clearing the image cache will cause indexed link to be invalid because it doesn't exist anymore. When triggering a full reindex the image cache will be created again.

- **How to fix it:**
Avoid clearing the image cache, and in case you do, launch a full reindex just after.

**If images are not generating from the beginning:**

- **Why:**
In almost all cases it's due to memory issue or directory permissions.

- **How to fix it:**
Enable logging in System > Configuration > Algolia Search > Credentials and setup. After enabling the option, the extension will generate an algolia.log file in the /path/to/magento/var/log/ folder. After a full reindexing if you have some thumbnails issue you should see the issue/error in this file.

<figure>
    <img src="../img/logging.png" class="img-responsive">
    <figcaption>Logging configuration</figcaption>
</figure>

If that still doesn't work, you can also try:

- Checking permissions of the `/media` directory (it should be equal to `770 / 660`)
- Checking magento and apache/nginx logs, to check if there is an error message

## Can I integrate Algolia to my search page template?

The realtime search experience implemented by the extension is done using JavaScript in your end-users browsers and therefore cannot have access to the templates of your original theme (which is rendered with PHP from your backend). Instead, it creates a search page with a default theme that you may need to adapt to fit your UI needs.

But you can still customize the design of the instant search results page & the auto-complete menu. See [Customization section](/magento/documentation/#customization) in documentation.

## How instant search page works?

Instant search page is powered by JavaScript library [instantsearch.js](https://community.algolia.com/instantsearch.js/). This means that all the search is handled in your customer's web browser and nothing is going through Magento itself. The instant search fetches results directly from Algolia's API and renders them into the page. That said, instant search do not fetch the results from Magento engine and nothing is proccessed on your Magento server. This is one of the reasons why the searching in your catalog can be that fast and convenient.

But on the other hand it brings two inconveniences:

- **Templates:**
When the whole page is rendered in your client's web browser it cannot respect your Magento store's custom templates. Templates for instant search page must be customized in the extension's template file. For more information about customizing see [Customization section](/magento/documentation/#customization) in the documentation.
- **SEO:**
The extenstion supports only backend search for regular search page and these results can be indexed by search engines like Google, Bing, etc... But because of the frontend implementantion instant search page results on category page cannot be indexed. But there is a workaround. Search parameters of the instant search page are pushed into page's URL. So it is possible to implement backend search base on the URL parameters so the instant search pages can be indexed. But the extension inself do not support this feature out of the box for now.

## Can I have different ordering of products on category pages with instant search? (e.g. with Visual Merchandiser)

Yes, this is definitelly doable, but you have to be aware that you'll need to create more records in Algolia indices.
Algolia is designed for searching and for providing the best relevancy on search queries. With this being said there are some limitations regarding sorting the results according specific attributes. 

First, you need to create a custom attribute with Virtual Merchandiser position which reflects the product's ranking with it's category. And push it to Algolia within products' records.
In case you have each product in only one category you can push to Algolia this attribute and then you can just set this attribute as the very first attribute for custom ranking and you are done.

If you have product in multiple categories and within each category it has a different ranking it becomes a bit tricky. 
This use-case can be handled only by slave indices when you have one index per category and in each of these indices you have a different ranking strategy. 
To achieve that you need to create a custom attribute with Virtual Merchandiser position for each category. Then you should create as many sort / slave indices as many VM custom attributes you have.
Next you will have to update your JavaScript code to target the correct index for each browsed category. 

It’s definitelly not optimal solution as you would have huge amount of records in Algolia and as well it’s not good for Algolia’s performance. But this is the only way how to achieve that.

But you can always limit a scope of Visual Merchandiser usage and use it only for your main categories or use the same sorting strategy across all your categories.
