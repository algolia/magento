---
layout: m2-documentation
title: Step by step guide
permalink: /doc/m2/technical-troubleshooting/
description: Technical troubleshooting - Step by step guide
redirect_to: https://www.algolia.com/doc/integration/magento-2/troubleshooting/technical-troubleshooting/
---

One of the biggest goals of the extension is to handle **the indexing of your Magento data** to Algolia’s servers. As Magento is highly configurable, every website using it is unique and behaves differently.

We created the extension in the most adaptable way, so it can meet your needs regarding your Magento configuration. Unfortunately, some custom Magento (or server) configurations, using third-party code/extensions, or simply bad practices can lead to issues during the indexing process.

<div class="alert alert-info">
    <i class="fa fa-info-circle"></i>
    This tutorial aims to help you to figure out what the issue can be and to explain how you can fix it, step by step.
</div>


## Prerequisites ##

First of all, please make sure you already read our documentation related to Magento indexing and common troubleshooting.

- [Indexing](/magento/doc/m2/indexing/)
- [Indexing Queue / Cron](/magento/doc/m2/indexing-queue/)
- [SKU reindexing form](/magento/doc/m2/sku-reindexing-form/)
- [FAQ](/magento/faq/)
- [Troubleshooting data, index or queue issues](/magento/doc/faq-support-data/)

<div class="alert alert-info">
    <i class="fa fa-info-circle"></i>
    Note that the last link can be very useful to eliminate the most common issues that you can meet.
</div>
 
After reading those articles, you will be familiar with:

- Installing the Magento extension
- Setting your credentials 
- Configuring the product, categories, pages, suggestions data 
- Configuring the facets
- Understanding how the indexing works
- Configuring the indexing queue and the cron
- Understanding the benefits of using the indexing queue
- Being aware of the most common issues related to indexing

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    If any of those points remains blurry, we invite you to read the documentation again. If there is still anything not clear for you, please feel free to <a target="_blank" href="https://github.com/algolia/magento/issues/new">let us know about it</a>. We will be happy to improve the documentation.
</div>

## Remaining issues ##

If you still experience issues, it can be:

- Products that you can see on your back-office, but doesn’t show up on the frontend
- Prices, images or other attributes which don’t seem to be updated
- The reindexing queue remains full and doesn’t seem to be processed

## Guide ##

Here are now some tips you can use to dig deeper in the indexing debugging. For some of them, it would require some technical knowledge, but nothing is impossible if you’re not afraid to dive into the specifics of Magento.

- [Backend issues](/magento/doc/m2/backend-issues/)
- [Frontend issues](/magento/doc/m2/frontend-issues/)