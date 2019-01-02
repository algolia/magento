---
layout: m2-documentation
title: Upgrade to new version
permalink: /doc/m2/upgrade/
description: Learn how to upgrade the Algolia extension for Magento 2
---

### Composer 
It's strongly recommended to use [Composer](https://getcomposer.org) to install the extension. Other installation methods are not supported.

For upgrade to new version, do the following steps:

1. Install the new version of the extension by Composer command <code>$ composer update algolia/algoliasearch-magento-2</code>
3. Go to the **Stores > Configuration > Algolia Search** administration panel and save your configuration. **Even if you didn’t change anything.**
4. Force the re-indexing of all indexers
5. Follow any other guidelines specified in the [changelog](https://github.com/algolia/algoliasearch-magento-2/blob/master/CHANGELOG.md)


### Extension Manager

Another option to upgrade your extension is through Magento's extension manager in your store's backoffice. You can find the manager by going to:  

**Stores > Tools > Web Setup Wizard > Extension Manager**

Please read this Magento [devdoc](https://devdocs.magento.com/guides/v2.3/comp-mgr/extens-man/extensman-update.html) for more information on how to update your extension. 
