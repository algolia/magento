---
layout: m1-documentation
title: Logging and debugging
permalink: /doc/m1/logging-and-debugging/
description: Learn how to debug issues with Algolia extension for Magento
redirect_to: https://www.algolia.com/doc/integration/magento-1/customize/logging-and-debugging/
---

Sometimes may happen that not everything run smoothly. In may be caused by millions of reasons. That is why we impletemented logging into Algolia's Magento extension.

Logging can be enabled in **System > Configuration > Algolia Search > Credentials & Setup** tab. When you enable togging, internal informations form the extension will be logged into Algolia log file. The file is located in Magento's log directory. By default it is `var/log` directory.

As logging can produce large amount of data  it should be enabled only while debugging and investigating issues. **It should definitely not be enabled in production!**

List of logged events:

- Full product reindex
- Rebuilding one page of products
- Loading products' collection
- Creating of products' records
- Creating of single product's record
- Start and stop of sending products to Algolia
- Start and stop of removing products from Algolia
- Start and stop of emulation
- Exceptions from images' loading
- Miscellaneous errors and exceptions
