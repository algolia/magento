---
layout: m1-documentation
title: Indexing
permalink: /doc/m1/indexing/
---

In extension we try to keep your Magento store and Algolia indices synchronized. We have two types of indexing mechanism:

- **Section re-index**
This re-indexes whole part of your catalog _(Products, Categories etc...)_
- **Single item re-index**
Each time your catalog changes _(e.g. addition / deletion / update of products / categories etc...)_, we push the change into Algolia indices

By default all this operations happen synchronously and administrator has to wait before continue his/her work. As it is not very convenient we came up with **Indexing queue**.

## Indexing Queue
To enable indexing queue navigate to **System > Configuration > Algolia Search > Indexing Queue / Cron tab** in your Magento administration.
Once you have enabled queue, all operations mentioned above will be queued in database table called `algoliasearch_queue`.

By enabling Indexing queue you can set how many jobs will be processed each time the queue is processed. By default the number is 10. But you can adjust it to fit to your catalog and server your Magento store runs on.

Now you need to setup running the queue. There are to options how to do that:

### With cron

To asynchronously process queued jobs, you can configure the following cron:

```sh
*/5 * * * * php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_queue_runner
```

This will run `N` jobs every 5 minutes depending of your queue configuration.


### Without cron

If you want to process the queue manually using the command line you can run:

```sh
php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_queue_runner
```

If you want to process the queue entirely in one time you can run:

```sh
EMPTY_QUEUE=1 php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_queue_runner
```

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    Enabling the indexing queue is recommended for production environments.
</div>

<div class="alert alert-danger">
  <i class="fa fa-exclamation-triangle"></i>
  As mentioned before, when indexing queue is disabled every indexing job _(whole re-indexing, update/deletion/update of products or categories, etc...)_ will happen synchronously.
  Trying to synchronously index too many objects might trigger PHP timeouts.
</div>

## Full products' reindex

### With enabled indexing queue

With enabled indexing queue products are reindexed with usage of temporary indices. That means that all products are pushed into temporary Algolia indices. When all products are pushed, the production indices are replaced by temporary ones. This approach has these advantages:

1. Higher re-indexing speed when only indexable products are processed and pushed to Algolia
2. Higher reliability regarding removing deleted products
3. Lower number of operations needed for full re-index

All changes done by re-indexing will be visible in search results when the whole process of re-indexing is done and production indices are replaced by temporary ones.

### With disabled indexing queue

When the indexing queue is disabled, full product re-index has to process whole catalog. It has to push updates to Algolia as well as remove inactive products from there.
That being said it takes more time and resources. It is also a little bit less reliable as some deleted products may not be processed and removed from Algolia's indices.

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    Doing full reindex on large catalog is strongly recommended with <strong>indexing queue enabled</strong>.
</div>

## Indexable products

Not all products from you Magento are indexed in Algolia. We try to keep your number of records as low as possible and that is why the extension indexes only products which are supposed to come up in autocomplete menu or instant search page.
Because of that the extension indexes only products which are:

- Visible (catalog, search or both)
- Enabled
- Not deleted
- On stock (in case you have set you want to index only "on-stock" products)

In case you are missing some products in Algolia indices, make sure those products meet these indexing requirements.

## Indexable attributes

You can specify which attributes you want to index in your Algolia indices. This option is available only for Products and Categories. For indexable attributes configuration navigate to **System > Configuration > Algolia Search > Products / Categories** tab.
There you can find table where you can set the attributes you want to send to Algolia. On each attribute you are able to specify if the attribute is Searchable, Retrievable and Order setting of the attribute. For more information about these settings please read [the official Algolia documentation](https://www.algolia.com/doc/?utm_medium=social-owned&amp;utm_source=magento%20website&amp;utm_campaign=docs).

<figure>
    <img src="../../../img/attributes.png" class="img-responsive">
    <figcaption>Configuration of attributes to index</figcaption>
</figure>

## Suggestions

Each time the search is processed in backend of Magento, the query, number of results, number of searches of the query are stored/updated in Magento database. Exactly in <code>catalogsearch_query</code>. This is done automaticly by Magento itself and out extension has nothing to do with it.
Be careful - only backend searches are stored in database. Autocomplete or instant search queries are not inserted into the database.

When you enable the indexing of suggestions, the extension fetches queries from that table, filter the results according your settings (minimal nuber of results, minimal popularity, ...) and filtered queries pushes into Algolia suggestion index.

To have correct data in your Algolia suggestion index, you need to have correct data in your <code>catalogsearch_query</code> table. To achieve that you need to have enabled backend search by Algolia. That you can have done by enabling <code>Search</code> and <code>Make SEO request</code> in configuration of Algolia extension in Magento administration.
When you have this options enabled, backend search will be processed by Algolia and data in <code>catalogsearch_query</code> will be updated over time.

Suggestions are not indexed automatically by the extension. You need to trigger reindex manually or you can put it into a cron tab to be processed automatically. For example every hour:

```sh
1 * * * * php -f /absolute/path/to/magento/shell/indexer.php -- -reindex search_indexer_suggest
```