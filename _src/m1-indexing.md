---
layout: m1-documentation
title: Indexing
permalink: /doc/m1/indexing/
description: Learn how the indexing works in Algolia extension for Magento
---

## Indexing in general

In order to provide fast and relevant search, Algolia restructures your data in a special way, via Indexing. The extension does this for you - it runs through all of your data - products, categories, and pages - and indexes your data. These indexes are then uploaded to the Algolia servers, either automatically via the extension's queue, or manually via the Magento console or the command line. Once pushed to the Algolia server, the indexes go through an indexing process that transforms them into searchable data.

For more information on the Indexing process, check out [Algolia's docs](http://www.algolia.com/doc/guides/indexing/indexing-overview/).

<div class="alert alert-warning">
If you are having any issues with your data, indexes, or queue, please check our <a href="/magento/doc/faq-support-data">troubleshooting guide</a>
</div>

The extension can keep your data (products, categories, pages, etc.) synchronized with Algolia in real time. This provides the best, most up-to-date search experience for your customers.

The extension provides two types of indexing mechanisms:

* **Section re-index**
An entire section of your catalog (products, categories, etc.) is pushed to Algolia and reindexed.

* **Single item re-index**
A single item is pushed to Algolia and reindexed whenever it changes (addition or deletion, update of products or categories, etc.).

By default, these operations run synchronously and the administrator has to wait for them to finish before continuing to work. This is not very convenient and can cause [unexpected issues](/magento/doc/faq-support-data#my-data-is-missing-or-it-is-not-up-to-date). The **indexing queue** is designed to alleviate these issues by performing indexing in the background. For more on this, read about the extension's [indexing queue](/magento/doc/m1/indexing-queue)

## Products indexing

Exact, up-to-date product data is essential to a successful ecommerce implementation. To accommodate many different product data scenarios, the extension provides a high degree of indexing and search configuration.

### Indexable products

Not all products from your Magento store are indexed in Algolia. The extension only indexes products that should appear in an autocomplete menu or instant search page. This ensures the wisest usage of your Algolia records and operations.

The extension indexes only products which are:

* Visible (catalog, search or both)
* Enabled
* Not deleted
* In-stock (if you only want to show "in-stock" products)

If you’re ever missing a product in your Algolia index, make sure to check that it meets this requirements for indexing.

Go here for more about [missing data](/magento/doc/faq-support-data/#my-data-is-missing-or-it-is-not-up-to-date).

### Searchable attributes

You can specify which attributes you want the search to look in. Navigate to **System > Configuration > Algolia Search > Products tab** to see the configuration.

Here you can find a table of the attributes that you want to send to Algolia. For each attribute you can specify if the attribute is Searchable, Retrievable or Ordered. By default all attributes are set to be searched as Unordered. In general this value is better for relevance and we don’t recommend changing it without a specific reason. Go here for information about [Searchable Attributes](https://www.algolia.com/doc/guides/ranking/searchable-attributes/?utm_medium=social-owned&utm_source=magento%20website&utm_campaign=docs).

For each attribute you can also specify if you want to index an empty value. Usually the right value is "No". This comes in handy for attributes to be used for faceting, because you can avoid having a useless value of “No” in the faceting list.

<figure>
    <img src="../../../img/attributes.png" class="img-responsive" alt="Attributes">
    <figcaption>Configuration of attributes to index</figcaption>
</figure>

There are 11 attributes that the extension indexes regardless of what is specified in the table above. These attributes are not "searchable", but can be used for filtering, sorting, customizing ranking, and building your instant search results. These attributes are:

<table class="table">
  <tr>
    <td>name</td>
    <td>Product’s name</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL address of product in store</td>
  </tr>
  <tr>
    <td>visibility_search</td>
    <td>If the product should be visible in search</td>
  </tr>
  <tr>
    <td>visibility_catalog</td>
    <td>If the product should be visible in catalog</td>
  </tr>
  <tr>
    <td>categories</td>
    <td>Tree of categories where the product belongs</td>
  </tr>
  <tr>
    <td>categories_without_path</td>
    <td>Categories where the product belongs without it’s tree path</td>
  </tr>
  <tr>
    <td>thumbnail_url</td>
    <td>URL of thumbnail image of the product</td>
  </tr>
  <tr>
    <td>image_url</td>
    <td>URL of image of the product</td>
  </tr>
  <tr>
    <td>in_stock</td>
    <td>If the product is on stock</td>
  </tr>
  <tr>
    <td>price</td>
    <td>Price of the product</td>
  </tr>
  <tr>
    <td>type_id</td>
    <td>Type of the product (simple, configurable, bundled, …)</td>
  </tr>
</table>

### Facets

Facets are the attributes you want to use as filters on an instant search results page. Common facets include price, colours, categories, and brands. What facets are right for you depends on the products you are selling and how your customers filter them.

For each facet you should specify the attribute, the label (what is displayed above the filter) and the type of the facet. Prices and numeric filters will be shown as a slider. Other filters will be shown as a list of checkboxes.

The attributes specified as facets are automatically indexed as retrievable but not searchable. There is no need to specify them in the searchable attributes table. They will automatically be configured in Algolia as attributes for faceting.

There are 3 facets by default - **price**, **categories** and **color**.

<figure>
    <img src="../../../img/facets.png" class="img-responsive" alt="Facets">
    <figcaption>Configuration of facets</figcaption>
</figure>

### Sorting strategies

When you enable the extension’s instant search result page, you may want to offer your users more ways to sort the results. This can be by relevance, popularity, price, age, etc.

Sorting by relevancy is always available and it is the default sort. The other sorting strategies you will specify in Sort Settings. For each strategy you should specify the attribute, sort order (ascending / descending) and the label to be displayed on the instant search page.

The attributes you specify for sorting are automatically indexed as retrievable but not searchable. There is no need to specify them in the searchable attributes table.

There are 3 sorting strategies by default, in addition to relevancy - from lowest price to highest, from highest price to lowest, and from newest to oldest.

<figure>
    <img src="../../../img/sorts.png" class="img-responsive" alt="Sorting strategies">
    <figcaption>Configuration of sorting strategies</figcaption>
</figure>

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    Each sorting strategy will multiply the number of records that will be indexed in Algolia. This will increase the usage against your Algolia plan. For more information see <a href="https://community.algolia.com/magento/faq/#how-many-records-does-the-magento-extension-create">this FAQ entry</a>.
</div>

### Index settings

The index settings for products managed by the extension are:

* searchableAttributes
* customRanking
* unretrievableAttributes
* attributesForFaceting
* maxValuesPerFacet
* removeWordsIfNoResults

Additional index settings can be managed in the Algolia dashboard or via the [extension’s custom events](/magento/doc/m1/backend/), using the `algolia_products_index_before_set_settings` custom event. You can hook into this event and modify the settings programmatically directly from Magento.

## Categories indexing

In order to reduce the number of Algolia operations and records, the extension indexes only active categories.

You can choose to index other categories if you’d like them to appear in search results.

<figure>
    <img src="../../../img/show_categories.png" class="img-responsive" alt="Show categories">
    <figcaption>Show categories that are not included in the navigation menu configuration</figcaption>
</figure>

Based on this setting, the extension will either index all categories or only the categories that are configured to be included in the navigation menu.

### Searchable attributes

You can specify which attributes you want to be searchable in your Algolia indices. To configure searchable attributes navigate to the **System > Configuration > Algolia Search > Categories** tab.

Here you can find a table of the attributes that you want to send to Algolia. For each attribute you can specify if the attribute is Searchable, Retrievable or Ordered. By default all attributes are set to be searched as Unordered. In general this value is better for relevance and we don’t recommend to change it without a specific reason.  Go here for information about [Searchable Attributes](https://www.algolia.com/doc/guides/ranking/searchable-attributes/?utm_medium=social-owned&utm_source=magento%20website&utm_campaign=docs).

<figure>
    <img src="../../../img/categories_attributes.png" class="img-responsive" alt="Categories attributes">
    <figcaption>Configuration of categories' searchable attributes</figcaption>
</figure>

There are 8 attributes that the extension indexes regardless of what is specified in the table above. These attributes are not "searchable", but can be used for filtering, sorting, customizing ranking, and building your instant search results. These attributes are:

<table>
  <tr>
    <td>name</td>
    <td>Category’s name</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL address of the category in store</td>
  </tr>
  <tr>
    <td>path</td>
    <td>Tree path to the category</td>
  </tr>
  <tr>
    <td>level</td>
    <td>Level of the category in category tree</td>
  </tr>
  <tr>
    <td>include_in_menu</td>
    <td>If the category should be included in navigation menu</td>
  </tr>
  <tr>
    <td>_tags</td>
    <td>[filled automatically by the extension]</td>
  </tr>
  <tr>
    <td>popularity</td>
    <td>Popularity of the category</td>
  </tr>
  <tr>
    <td>product_count</td>
    <td>Number of products in the category</td>
  </tr>
</table>

### Index settings

The index settings for categories managed by the extension are:

* searchableAttributes
* customRanking
* unretrievableAttributes

Additional index settings can be managed in the Algolia dashboard or via extension’s `algolia_categories_index_before_set_settings` custom event. You can hook into this event and modify the settings programmatically directly from Magento.

## Pages indexing

The extension supports indexing CMS pages, which will allow your customers to search for them in an autocomplete menu. By default all active pages are indexed, but you are able to exclude any that you don’t want to appear in search results (e.g. error pages).

<figure>
    <img src="../../../img/excluded_pages.png" class="img-responsive" alt="Excluded pages">
    <figcaption>Configuration of excluded pages</figcaption>
</figure>

If you want to disable the indexing of pages, you can remove them from the Additional Sections configuration:

<figure>
    <img src="../../../img/additional_sections.png" class="img-responsive" alt="Additional sections">
    <figcaption>Configuration of additional sections</figcaption>
</figure>

### Indexed attributes

The admin configuration does not support modifying indexable page attributes, but they can be changed programmatically by hooking into the `algolia_after_create_page_object` event. See [events](/magento/doc/m1/backend).

**Default indexed attributes:**

<table>
  <tr>
    <td>name</td>
    <td>Name of the page</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL address of the page</td>
  </tr>
  <tr>
    <td>slug</td>
    <td>Slug of the page</td>
  </tr>
  <tr>
    <td>content</td>
    <td>Textual content of the page</td>
  </tr>
</table>

Records in Algolia must be smaller than 10 kilobytes. Therefore, if the content of the page is longer than 10,000 characters the content will not be indexed. In this case, the search will be performed only in the page’s name which could have an impact on relevance.

To learn more about record size limits please see the official [Algolia documentation](https://www.algolia.com/doc/guides/indexing/structuring-your-data/#size-limit).

### Index settings

The extension always sends the same settings to Algolia for the pages index:

* searchableAttributes
    * unordered(slug)
    * unordered(name)
    * unordered(content)

* attributesToSnippet
    * content:7

Additional index settings can be managed in the Algolia dashboard or via extension’s `algolia_pages_index_before_set_settings` custom event. See [events](/magento/doc/m1/backend). You can hook into this event and modify the settings programmatically directly from Magento.

## Suggestions indexing

Each query processed by the Magento backend is stored in the Magento database. The query, number of results, and number of searches of that query are all recorded automatically in the `catalogsearch_query` by Magento without any involvement from the extension.

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    Only backend searches are stored in the Magento database. Front-end autocomplete and instant search queries are not stored.
</div>

When you enable the indexing of suggestions, the extension fetches queries from `catalogsearch_query`, filters the results according your settings (minimal number of results, minimal popularity, etc.) and pushes filtered queries into your Algolia suggestions index.

<figure>
    <img src="../../../img/suggestion_configuration.png" class="img-responsive" alt="Suggestions configuration">
    <figcaption>Configuration of suggestions</figcaption>
</figure>

To ensure good data in your Algolia suggestion index, you must have correct data in your `catalogsearch_query` table. To do that, you must enable backend search with Algolia. **Enable Search** and **Make SEO request** in the Algolia extension configuration in the Magento administration.

When this option is enabled, each backend search will be processed by Algolia and the data in `catalogsearch_query` will be increased over time.

Suggestions are not indexed automatically by the extension. You will need to trigger a reindex manually or add an entry to a cron table for automatic processing. Here’s an example that would run every hour:

```sh
1 * * * * php -f /absolute/path/to/magento/shell/indexer.php -- -reindex search_indexer_suggest
```

### Indexed attributes

The extension does not let you modify indexable attributes via the admin configuration, but they can be changed by hooking your method into to `algolia_after_create_suggestion_object` event. See [events](/magento/doc/m1/backend).

**Default indexed attributes:**

<table>
  <tr>
    <td>query</td>
    <td>Suggested search query</td>
  </tr>
  <tr>
    <td>number_of_results</td>
    <td>Number of returned results when backend search was performed</td>
  </tr>
  <tr>
    <td>popularity</td>
    <td>Number of searches with the search query</td>
  </tr>
  <tr>
    <td>updated_at</td>
    <td>Date of the last update</td>
  </tr>
</table>

### Index settings

The extension always sends the same settings to Algolia for the suggestions index:

* searchableAttributes
    * unordered(query)
* customRanking
    * desc(popularity)
    * desc(number_of_results)
* typoTolerance
    * false
* attributesToRetrieve
    * query
* removeWordsIfNoResults
    * lastWords

Additional index settings can be managed in the Algolia dashboard or via the extension’s `algolia_suggestions_index_before_set_settings` custom event. See [events](/magento/doc/m1/backend). You can hook into this event and modify the settings programmatically directly from Magento.

## Additional sections indexing

In the autocomplete menu you can display other sections like color and brands. This feature requires the instant search page to be enabled. The *Additional Sections* area requires this to work properly.

To be able to choose an attribute in the Additional Section area, you will need to set it as an attribute for faceting in Algolia.

<figure>
    <img src="../../../img/additional_sections_2.png" class="img-responsive" alt="Configuration of additional sections">
    <figcaption>Configuration of additional sections</figcaption>
</figure>

### Indexed attributes

The extension does not let you modify indexable attributes via the admin configuration, but they can be changed by hooking your method into the `algolia_additional_section_items_before_index` event.

**Default indexed attributes:**

<table>
  <tr>
    <td>value</td>
    <td>Value of the attribute (eg. Red, Adidas, XL, …)</td>
  </tr>
</table>

### Index settings

The extension always sends the same settings to Algolia for the additional sections index:

* searchableAttributes
    * unordered(value)

The extension does not let you modify indexable attributes via the admin configuration, but they can be changed by hooking your method into the `algolia_additional_sections_index_before_set_settings` event. See [events](/magento/doc/m1/backend).
