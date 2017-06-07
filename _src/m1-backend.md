---
layout: m1-documentation
title: Back-end
permalink: /doc/m1/backend/
---

## Custom events

For developers the extension provides custom events to hook custom code on top of Algolia Search extension.

You can learn how to use events in [Using extension's events tutorial](/magento/doc/m1/customize-backend/).

### Products

#### `algolia_products_index_before_set_settings`
_Dispatches before pushing products' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Varien_Object` object

Modifiable parameters:

- `$indexSettings` as data in `Varien_Object` object

***

#### `algolia_after_products_collection_build`
_Dispatches after products collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Mage_Catalog_Model_Resource_Eav_Mysql4_Product_Collection`

Modifiable parameters:

- `$collection` as `Mage_Catalog_Model_Resource_Eav_Mysql4_Product_Collection`

***

#### `algolia_before_products_collection_load`
_Dispatches before final products collection load._

Passed parameters:

- `$collection` as `Mage_Catalog_Model_Resource_Eav_Mysql4_Product_Collection`
- `$storeId`

Modifiable parameters:

- `$collection`

***

#### `algolia_product_index_before`
_Dispatches before fetching product's attributes for indexing._

Passed parameters:

- `$product` as `Mage_Catalog_Model_Product`
- `$indexedData` as data in `Varien_Object` object

Modifiable parameters:

- `$indexedData` as data in `Varien_Object` object

***

#### `algolia_after_create_product_object`
_Dispatches after fetching product's attributes for indexing._

Passed parameters:

- `$indexedData` as data in `Varien_Object` object
- `$subProducts` as array of sub products
- `$product` as `Mage_Catalog_Model_Product`

Modifiable parameters:

- `$indexedData` as data in `Varien_Object` object

### Categories

#### `algolia_categories_index_before_set_settings`
_Dispatches before pushing categories' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Varien_Object` object

Modifiable parameters:

- `$indexSettings` as data in `Varien_Object` object

***

#### `algolia_after_categories_collection_build`
_Dispatches after categories collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Mage_Catalog_Model_Resource_Eav_Mysql4_Category_Collection`

Modifiable parameters:

- `$collection`

***

#### `algolia_category_index_before`
_Dispatches before fetching category's attributes for indexing._

Passed parameters:

- `$category` as `Mage_Catalog_Model_Category`
- `$indexedData` as data in `Varien_Object` object

Modifiable parameters:

- `$indexedData` as data in `Varien_Object` object

***

#### `algolia_after_create_category_object`
_Dispatches after fetching category's attributes for indexing._

Passed parameters:

- `$indexedData` as data in `Varien_Object` object
- `$category` as `Mage_Catalog_Model_Category`

Modifiable parameters:

- `$indexedData` as data in `Varien_Object` object

### Pages

#### `algolia_pages_index_before_set_settings`
_Dispatches before pushing pages' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Varien_Object` object

Modifiable parameters:

- `$indexSettings` as data in `Varien_Object` object

***

#### `algolia_after_pages_collection_build`
_Dispatches after pages collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Mage_Cms_Model_Resource_Page_Collection`

Modifiable parameters:

- `$collection`

***

#### `algolia_after_create_page_object`
_Dispatches after fetching page's attributes for indexing._

Passed parameters:

- `$indexedData` as data in `Varien_Object` object
- `$page` as `Mage_Cms_Helper_Page`

Modifiable parameters:

- `$indexedData` as data in `Varien_Object` object

### Suggestions

#### `algolia_suggestions_index_before_set_settings`
_Dispatches before pushing suggestions' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Varien_Object` object

Modifiable parameters:

- `$indexSettings` as data in `Varien_Object` object

***

#### `algolia_after_suggestions_collection_build`
_Dispatches after suggestions collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Mage_CatalogSearch_Model_Resource_Query_Collection`

Modifiable parameters:

- `$collection`

***

#### `algolia_after_create_suggestion_object`
_Dispatches after fetching suggestion's attributes for indexing._

Passed parameters:

- `$indexedData` as data in `Varien_Object` object
- `$suggestion` as `Mage_CatalogSearch_Model_Query`

Modifiable parameters:

- `$indexedData` as data in `Varien_Object` object

### Additional sections

#### `algolia_additional_sections_index_before_set_settings`
_Dispatches before pushing additional sections' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Varien_Object` object

Modifiable parameters:

- `$indexSettings` as data in `Varien_Object` object

***

#### `algolia_additional_section_items_before_index`
_Dispatches after fetching additional_section's attributes for indexing._

Passed parameters:

- `$section`
- `$record` as data in `Varien_Object` object
- `$storeId`

Modifiable parameters:

- `$record` as data in `Varien_Object` object

### Front-end configuration

#### `algolia_after_create_configuration`
_Dispatches after front-end configuration creation._

Passed parameters:

- `$configuration` as data in `Varien_Object` object

Modifiable parameters:

- `$configuration` as data in `Varien_Object` object

## Logging & Debugging

Sometimes may happen that not everything run smoothly. In may be caused by millions of reasons. That is why we impletemented logging into Algolia's Magento extension.
Logging can be enabled in **System > Configuration > Algolia Search > Credentials & Setup** tab. When you enable togging, internal informations form the extension will be logged into Algolia log file. The file is located in Magento's log directory. By default it is `var/log` directory.

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
