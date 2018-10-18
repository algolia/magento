---
layout: m2-documentation
title: SKU reindexing form
permalink: /doc/m2/sku-reindexing-form/
description: Learn about SKU reindexing form in the Algolia extension for Magento 2
---

<div class="center">
	<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/qzaLrHz67U4?start=298" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

## Access

This feature can be accessed directly from the Magento2 back-office main menu:
**Stores > Algolia Search > Reindex SKU(s)**

## Purpose

It might happen that for some reason, you may need to index one or many products to Algolia immediately, without waiting for the [the indexing queue](/magento/doc/m2/indexing-queue/).
This tool is also useful to check if your products meet all the requirements to be indexed in the Algolia's indices. And if not, the tool will tell you immediately the reason why the products are not indexed.

Keep in mind that if a product can't be reindexed with this tool, it won't be reindexed throught the standard reindexing scripts either.
  
## How to use it

The form only requires the unique Magento's identifier for all products: the **SKU**.

<img src="../../../img/sku-form.png" class="img-responsive" alt="SKU reindexing form">

To reindex products, you have to copy/paste their SKUs separated by commas or carriage returns and click **Reindex SKU(s)** on top-right corner of the page.

**Note**: You can reindex up to 10 products at once.

## Understand the results

After submitting the form, you'll get the results. If everything went fine, you'll be notified that the products have been reindexed in all the indices related to the stores of your Magento website.
**Note** : If the products are not related to some of the stores, they won't be reindexed on those particular indices and you will be notified. 

There are many reasons why a product can't be reindexed:

- Product is disabled.
- Product is deleted.
- Product is out of stock.
- Product is not visible.

If a product doesn't meet all of these requirements, you'll get a message explaining why it wasn't reindexed. 

**Note about product visibility**: If you enter the SKU of a child product (from a configurable, grouped or bundled product) which is not visible individually, the parent product will automatically be fetched and reindexed if possible.