---
layout: m1-documentation
title: Caveats
permalink: /doc/m1/caveats/
---

##  Magento hooks

The extension is using the default hooks of Magento, if you are doing insertion or deletion of products outside of the Magento code/interface the extension won't see it and your Algolia index will be out of sync. The best way to avoid that is to use Magento's methods. If this is not possible you still have the possibility to call the extension indexing methods manually as soon you as do the update.

## Number of Algolia records

[How many records does the Magento extension create?](/magento/faq/#how-many-records-does-the-magento-extension-create)
