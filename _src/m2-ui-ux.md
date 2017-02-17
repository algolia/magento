---
layout: m2-documentation
title: Front-end (UI / UX)
permalink: /doc/m2/ui-ux/
---

## Custom theme

By default the extension tries to override <code>topSearch</code> block of the theme template. In case your custom theme doesn't contain <code>topSearch</code> block, you need to navigate to **Stores > Configuration > Algolia Search > Advanced** and change DOM selector of your search input.
When you do that, the extension won't try to override <code>topSearch</code> block and will only include it's scripts. In this case you will have to update your styles and put your desired look and feel to your auto-completion menu.

## Auto-completion menu

The extension uses [autocomplete.js](https://github.com/algolia/autocomplete.js) library to display the as-you-type auto-completion menu. By default the menu suggests:

- products
- categories
- pages

You can configure displayed data in administration section **Stores > Configuration > Algolia Search > Autocomplete**.
There you can configure which sections and how many items should be displayed in auto-complete menu.

If you need to do more customization, perhaps for auto-complete layout, you will need to update the underlying template. For more information please navigate to [Customization](/magento/doc/m2/customize-autocomplete/) section.

<figure>
    <img src="../../../img/m2-autocomplete-admin.png" class="img-responsive" alt="Autocomplete configuration">
    <figcaption>Extension's autocomplete feature configuration</figcaption>
</figure>

## Instant search results page

The extension uses [instantsearch.js](https://github.com/algolia/instantsearch.js) library to display the as-you-type search results page. By default following widgets are displayed:

- **hits** - displays products matching to customer query and filters
- **pagination** - navigation between products' pages
- **sorting** - switch between different products' sortings
- **price range slider** - used to refine range of prices
- **hierarchial menu** - allows to refine results by categories

You can configure displayed data and set another refinements. Just navigate to **Stores > Configuration > Algolia Search > Instant Search Results Page**. You can configure which attributes you want to use as facets. Facets are used for filtering products. For more information about faceting please read [the official Algolia documentation](https://www.algolia.com/doc/?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs).

In the same way you can configure attributes for sorting your products. Be careful because each sorting creates Algolia index. For more information read [the official Algolia documentation](https://www.algolia.com/doc/?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs).

If you need to add another widgets or update the existing ones you will need to update the underlying template. For more information please navigate to [Customization](/magento/doc/m2/customize-instantsearch/) section.

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    By default instant search page is disabled, because it can break your existing layout. You can enable it in <b>Stores > Configuration > Algolia Search > Credentials & Setup</b>.
</div>

<figure>
    <img src="../../../img/m2-instantsearch-admin.png" class="img-responsive" alt="Instant search configuration">
    <figcaption>Extension's instant search feature configuration</figcaption>
</figure>
