---
layout: m2-documentation
title: Visual Category Merchandising
permalink: /doc/m2/visual-category-merchandising/
description: Learn how to merchandise products on Algolia powered category pages in Algolia extension for Magento
redirect_to: https://www.algolia.com/doc/integration/magento-2/merchandising/category-merchandising/
---

<div class="center">
	<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qzaLrHz67U4?start=141" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
<br>

Visual Category Merchandiser allows you to display products on Algolia powered category pages in precise order to boost your conversions.

## Merchandising

The visual merchandiser is placed in a detail of each category in Algolia Merchansing tab:

<figure>
    <img src="../../../img/category-merchandising.png" class="img-responsive" alt="Visual category mechandising tool">
    <figcaption>Visual Category Mechandising tool</figcaption>
</figure>

In the table you can see the exact products in the very same order as they are displayed on the store's category page.

You can move products up and down by either using arrow buttons or drag & drop feature. When you move a product to a desired position, it'll be pinned to the position.

Pinning a product to a position means that the product will always appear on this specific position. You can unpin a product from any position by clicking "Un-pin" button.

The table shows only the first page of products. If you want to add a different product to the first page, you can do it with autocomplete menu:

<figure>
    <img src="../../../img/category-merchandising-autocomplete.png" class="img-responsive" alt="Merchandising autocomplete menu">
    <figcaption>Merchandising autocomplete menu</figcaption>
</figure>

Autocomplete menu offers only products from selected category.
When you select a product from autocomplete menu it'll be automatically pinned to the first position. You can then move it around to any position you want to.

Pinned positions will be saved once you save the category. 

## Query rules

Visual Merchandising uses [query rules](https://www.algolia.com/doc/guides/query-rules/query-rules-overview/) to merchandise products
To preserve positions of pinned products the extension needs to create [a query rule](https://www.algolia.com/doc/guides/query-rules/query-rules-overview/#hit-promotion) for each category with at least one pinned product.

Algolia has a query rules quota for each plan. Please refer to your [Algolia account](https://www.algolia.com/dashboard) or [pricing page](https://www.algolia.com/pricing) to see what is your query rules quota and how many query rules can be created in your plan.
