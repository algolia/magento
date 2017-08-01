---
layout: m2-documentation
title: Caveats
permalink: /doc/m2/caveats/
description: What the extension for Magento 2 relies on
---

###  Magento hooks

The extension is using the default hooks of Magento, if you are doing insertion or deletion of products outside of the Magento code/interface the extension won't see it and your Algolia index will be out of sync. The best way to avoid that is to use Magento's methods. If this is not possible you still have the possibility to call the extension indexing methods manually as soon you as do the update.
