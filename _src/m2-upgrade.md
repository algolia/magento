---
layout: m2-documentation
title: Upgrade to new version
permalink: /doc/m2/upgrade/
description: Learn how to upgrade the Algolia extension for Magento 2
redirect_to: https://www.algolia.com/doc/integration/magento-2/getting-started/upgrading/
---

It's strongly recommended to use [Composer](https://getcomposer.org) to install the extension. Other installation methods are not supported.

For upgrade to new version, do the following steps:

1. Install the new version of the extension by Composer command <code>$ composer update algolia/algoliasearch-magento-2</code>
3. Go to the **Stores > Configuration > Algolia Search** administration panel and save your configuration. **Even if you didn’t change anything.**
4. Force the re-indexing of all indexers
5. Follow any other guidelines specified in the [changelog](https://github.com/algolia/algoliasearch-magento-2/blob/master/CHANGELOG.md)
