---
layout: m1-documentation
title: Upgrade to new version
permalink: /doc/m1/upgrade/
description: Learn how to upgrade the Algolia extension for Magento
---

It's strongly recommended to use [Modman](https://github.com/colinmollenhour/modman) to install the extension. Other installation methods are not supported.

For upgrade to new version, do the following steps:

1. If you have installed previous version of the extension, uninstall it by Modman command <code>$ modman remove algoliasearch-magento</code>
2. Install the new version of the extension by Modman command <code>$ modman clone https://github.com/algolia/algoliasearch-magento</code>
3. Go to the **System > Configuration > Catalog > Algolia Search** administration panel and save your configuration. **Even if you didn’t change anything.**
4. Force the re-indexing of all indexers
5. Follow any other guidelines specified in the [changelog](https://github.com/algolia/algoliasearch-magento/blob/master/CHANGELOG.md)
