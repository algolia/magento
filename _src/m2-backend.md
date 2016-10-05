---
layout: m2-documentation
title: Back-end
permalink: /doc/m2/backend/
---

## Custom events

For developers the extension provides custom events to hook custom code on top of Algolia Search extension.

`algolia_index_settings_prepare`
Dispatches before pushing index settings to Algolia.


`algolia_rebuild_store_product_index_collection_load_before`
Dispatches after products collection creation.


`algolia_product_index_before`
Dispatches before fetching product's attributes for indexing.


`algolia_subproducts_index`
Dispatches after sub products are taken into account when fetching product's data for indexing.


`algolia_category_index_before`
Dispatches before fetching category's attributes for indexing.


`algolia_additional_section_item_index_before`
Dispatches after fetching [additional_section]'s attributes for indexing.

## Logging & Debugging

Sometimes may happen that not everything run smoothly. In may be caused by millions of reasons. That is why we impletemented logging into Algolia's Magento extension.
Logging can be enabled in **Stores > Configuration > Algolia Search > Credentials & Setup** tab. When you enable togging, internal informations form the extension will be logged into Algolia log file. The file is located in Magento's log directory. By default it is `var/log` directory.

Logging can produce large amount of data. So it shuld be enabled only while debugging and investigating issues. **It should definitely not be enabled in production!**

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

## Contributing

See the project and readme on [GitHub](https://github.com/algolia/algoliasearch-magento-2).

## Caveats

###  Magento hooks

The extension is using the default hooks of Magento, if you are doing insertion or deletion of products outside of the Magento code/interface the extension won't see it and your Algolia index will be out of sync. The best way to avoid that is to use Magento's methods. If this is not possible you still have the possibility to call the extension indexing methods manually as soon you as do the update.
