---
layout: m1-documentation
title: Prevent Backend Rendering
permalink: /doc/m1/prevent-backend-rendering/
description: Make your Magento store faster and more performant with Algolia by preventing category pages and search pages from backend rendering.
redirect_to: https://www.algolia.com/doc/integration/magento-1/how-it-works/prevent-back-end-rendering/
---

In order to save your server resources and make your store faster, you can prevent category and search result pages from backend rendering.

## General information and caveats

Those pages are powered by Algolia Instant Search feature and when those pages are returned to your user's browser, it's immediately re-rendered by JavaScript.

By preventing backend rendering those pages won't be generated on server, which means the server will be able to respond faster and your user won't have to wait long time to see your products.
At the same time your server will need much less resources to generate the page.

However this approach has some **caveats**.

Most of the website crawlers (including search crawlers like Google, Bing, ...) rely on the website code generated on server and cannot properly crawl a page which is generated by only JavaScript on frontend.

**This might lead to not-indexed pages and not following links which would be generated on the server-side.**

At the same time your server might generate a slightly different page than Algolia does. This page can have different links to a content which is not linked from anywhere else. Which might end up in crawler not being able to access and index those pages.

To bypass those issues, there is a possibility to stop backend rendering for your users but still keep it for crawlers.

Crawlers can be identified by server by sending it a special User-Agent identifier. In the extension's configuration you can specify list of User-Agents for which you want to keep the backend rendering on. The extension checks that User-Agent and if it matches one of the User-Agents in your list, the page will be rendered on the server as well.

[Here](http://www.useragentstring.com/pages/useragentstring.php?typ=Crawler){:target="_blank"} you can find list of all search crawlers. The extension by default keeps the backend rendering for "Googlebot" and "Bingbot".

The feature of preventing backend rendering is highly experimental and we are not able to guarantee it won't break accessibility of your website. Please be carefull before you enable it.

**If you decide to enable the feature, keep an eye on the number of your indexed pages by the tools provided by search engines like [Google Search Console](https://www.google.com/webmasters/tools/home?hl=en){:target="_blank"} or [Bing Webmaster Tools](https://www.bing.com/toolbox/webmaster){:target="_blank"}.**

## How to enable

To prevent your pages from backend rendering navigate to **System > Configuration > Algolia Search > Advanced tab**. There you can find a setting called **Prevent backend rendering?** and you can switch it to **Yes**.

When you switch the setting to **Yes**, you'll be able to specify a list of User-Agents for which you want to keep the backend rendering enabled. By default the list containts "Googlebot" and "Bingbot".

<figure>
    <img src="../../../img/prevent-backend-rendering.png" class="img-responsive" alt="Prevent backend rendering configuration">
    <figcaption>Prevent backend rendering configuration</figcaption>
</figure>

## How it works

When "Prevent backend rendering" is enabled, the extension removes template blocks from rendering by the [extension's layout XML file](https://github.com/algolia/algoliasearch-magento/blob/master/app/design/frontend/base/default/layout/algoliasearch.xml){:target="_blank"}.

Removed blocks:

- `catalog.leftnav`
- `catalogsearch.leftnav`
- `tags_popular`
- `category.products`
- `search.result`
- `right.reports.product.viewed`
- `left.reports.product.viewed`
- `right.poll`
