---
layout: m2-documentation
title: Custom events
permalink: /doc/m2/backend/
description: The Algolia extension for Magento 2 provides custom events to modify the extension's behaviour
redirect_to: https://www.algolia.com/doc/integration/magento-2/customize/custom-back-end-events/
---

For developers the extension provides custom events to hook custom code on top of Algolia Search extension.

<div class="alert alert-info">
    You can learn how to create a custom extension with listener methods in
    <a href="{{ site.baseurl }}/doc/m2/customize-extension/">Create a custom extension tutorial</a>.
</div>

### Products

#### `algolia_products_index_before_set_settings`
_Dispatches before pushing products' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$indexSettings` as data in `Magento\Framework\DataObject` object

***

#### `algolia_after_products_collection_build`
_Dispatches after products collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Magento\Catalog\Model\ResourceModel\Product\Collection`

Modifiable parameters:

- `$collection` as `Magento\Catalog\Model\ResourceModel\Product\Collection`

***

#### `algolia_before_products_collection_load`
_Dispatches before final products collection load._

Passed parameters:

- `$collection` as `Magento\Catalog\Model\ResourceModel\Product\Collection`
- `$storeId`

Modifiable parameters:

- `$collection`

***

#### `algolia_product_index_before`
_Dispatches before fetching product's attributes for indexing._

Passed parameters:

- `$product` as `Magento\Catalog\Model\Product`
- `$indexedData` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object

***

#### `algolia_after_create_product_object`
_Dispatches after fetching product's attributes for indexing._

Passed parameters:

- `$custom_data` as data in `Magento\Framework\DataObject` object
- `$subProducts` as array of sub products
- `$product` as `Magento\Catalog\Model\Product`

Modifiable parameters:

- `$custom_data` as data in `Magento\Framework\DataObject` object

### Categories

#### `algolia_categories_index_before_set_settings`
_Dispatches before pushing categories' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$indexSettings` as data in `Magento\Framework\DataObject` object

***

#### `algolia_after_categories_collection_build`
_Dispatches after categories collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Magento\Catalog\Model\ResourceModel\Category\Collection`

Modifiable parameters:

- `$collection`

***

#### `algolia_category_index_before`
_Dispatches before fetching category's attributes for indexing._

Passed parameters:

- `$category` as `Magento\Catalog\Model\Category`
- `$indexedData` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object

***

#### `algolia_after_create_category_object`
_Dispatches after fetching category's attributes for indexing._

Passed parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object
- `$category` as `Magento\Catalog\Model\Category`

Modifiable parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object

### Pages

#### `algolia_pages_index_before_set_settings`
_Dispatches before pushing pages' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$indexSettings` as data in `Magento\Framework\DataObject` object

***

#### `algolia_after_pages_collection_build`
_Dispatches after pages collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Magento\Cms\Model\ResourceModel\Page\Collection`

Modifiable parameters:

- `$collection`

***

#### `algolia_after_create_page_object`
_Dispatches after fetching page's attributes for indexing._

Passed parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object
- `$page` as `Magento\Cms\Model\Page`

Modifiable parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object

### Suggestions

#### `algolia_suggestions_index_before_set_settings`
_Dispatches before pushing suggestions' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$indexSettings` as data in `Magento\Framework\DataObject` object

***

#### `algolia_after_suggestions_collection_build`
_Dispatches after suggestions collection creation._

Passed parameters:

- `$storeId`
- `$collection` as `Magento\Search\Model\ResourceModel\Query\Collection`

Modifiable parameters:

- `$collection`

***

#### `algolia_after_create_suggestion_object`
_Dispatches after fetching suggestion's attributes for indexing._

Passed parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object
- `$suggestion` as `Magento\Search\Model\Query`

Modifiable parameters:

- `$indexedData` as data in `Magento\Framework\DataObject` object

### Additional sections

#### `algolia_additional_sections_index_before_set_settings`
_Dispatches before pushing additional sections' index settings to Algolia._

Passed parameters:

- `$storeId`
- `$indexSettings` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$indexSettings` as data in `Magento\Framework\DataObject` object

***

#### `algolia_additional_section_items_before_index`
_Dispatches after fetching additional_section's attributes for indexing._

Passed parameters:

- `$section`
- `$record` as data in `Magento\Framework\DataObject` object
- `$storeId`

Modifiable parameters:

- `$record` as data in `Magento\Framework\DataObject` object

### Front-end configuration

#### `algolia_after_create_configuration`
_Dispatches after front-end configuration creation._

Passed parameters:

- `$configuration` as data in `Magento\Framework\DataObject` object

Modifiable parameters:

- `$configuration` as data in `Magento\Framework\DataObject` object

