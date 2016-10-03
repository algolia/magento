---
layout: m2-documentation
title: Upgrade to new version
permalink: /m2/upgrade/
---

It's strongly recommended to use [Composer](https://getcomposer.org) or [Magento Marketplace](https://www.magentocommerce.com/magento-connect/search-algolia-search.html) to install the extension. Other installation methods are not supported.

For upgrade to new version, do the following steps:

1. Install the new version of the extension
	- via Magento Connect
	- or by Composer command <code>$ composer update algolia/algoliasearch-magento-2</code>
3. Go to the **Stores > Configuration > Algolia Search** administration panel and save your configuration. **Even if you didn’t change anything.**
4. Force the re-indexing of all indexers
5. Follow any other guidelines specified in the [changelog](https://github.com/algolia/algoliasearch-magento-2/blob/master/CHANGELOG.md)
