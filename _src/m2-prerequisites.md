---
layout: m2-documentation
title: Prerequisites
permalink: /doc/m2/prerequisites/
description: Technical troubleshooting - Prerequisites
---

One of the biggest goals of the extension is to handle **the indexing of your Magento data** to Algolia’s servers. As Magento is highly configurable, every website using it is unique and behaves differently.

We created the extension and tried to make it the most adaptable it can be to meet your needs regarding your Magento configuration. Unfortunately, some custom Magento (or server) configuration, using third-party code/extensions, or simply bad practices can lead to issues during the indexing process.

This tutorial aims to help you to figure out what the issue can be and to explain how you can fix it, step by step.

## Prerequisites ##

First of all, please make sure you already read our documentation related to Magento indexing and common troubleshooting.

- [Indexing](/magento/doc/m2/indexing/)
- [Indexing Queue / Cron](/magento/doc/m2/indexing-queue/)
- [SKU reindexing form](/magento/doc/m2/sku-reindexing-form/)
- [FAQ](/magento/faq/)
- [Troubleshooting data, index or queue issues](/magento/doc/faq-support-data/)

Note that the last link can be very useful to eliminate the most common issues that you can meet. 

So after reading those articles, you should be familiar with:

- Installing the Magento extension
- Setting your credentials 
- Configuring the product, categories, pages, suggestions data 
- Configuring the facets
- Understanding how the indexing works
- Configuring the indexing queue and the cron
- Understanding the benefits of using the indexing queue
- Being aware of the most common issues related to indexing

If any of those points remains blurry, we invite you to read the documentation again. If you don’t understand anything from previously mentioned documentation pages, please feel free to [let us know about it](https://github.com/algolia/magento/issues/new). We will improve the documentation.

## Remaining issues ##

Despite all that help, if you still have issues, it can be:

- Products that you can see on your back-office, but doesn’t show up on the frontend
- Prices, images or other attributes which don’t seem to be updated
- The reindexing queue remains full and doesn’t seem to be processed

Here are now some tips you can use to dig deeper in the indexing debugging. For some of them, it would of course require some technical knowledge but nothing is impossible if you’re not afraid to dive into the specifics of Magento.
