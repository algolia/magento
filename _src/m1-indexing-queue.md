---
layout: m1-documentation
title: Indexing Queue
permalink: /doc/m1/indexing-queue/
description: Learn how the indexing queue works in Algolia extension for Magento
---

<div class="alert alert-warning">
If you are having any issues with your data, indexes, or queue, please check our <a href="/magento/doc/m1/faq-support-data">troubleshooting guide</a>;
</div>

The **index queue** manages all uploads to Algolia. Before your data can be searched, it must be uploaded to Algolia. This process is called indexing, which the extension does automatically - via the queue.

<div class="alert alert-warning">
Also, if you want to know more about indexing in general, please check out our <a href="/magento/doc/m1/indexing">Indexing overview</a>;
</div>

The extension uses the **queue** to keep your data (products, categories, pages, etc.) synchronized with Algolia in real time. Note that by real-time, we are referring to the mechanism by which every update to your Magento data will trigger an event in the extension which will in turn initiate a reindex. This provides the best, most up-to-date search experience for your customers.

Queue operations run asynchronously, allowing the administrator to continue working while the queue refreshes Algolia in the background.

### Indexing queue

To enable the indexing queue navigate to **System > Configuration > Algolia Search > Indexing Queue / Cron tab** in your Magento administration. Once you have enabled the queue, all queued operations will appear in a database table called `algoliasearch_queue`.

Once the indexing queue is enabled, you can set how many jobs will be processed at a time. The default number of jobs is 10. You can adjust this number to fit your catalog and the server your Magento store runs on.

Once the queue is enabled, you need to set up the process that will run it. There are several ways to do this.

#### With cron

To process queued jobs at a regular time interval, configure the following crontab entry:

```sh
*/5 * * * * php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_queue_runner
```

This will run N jobs every 5 minutes depending on your queue configuration.

#### Without cron

You can also process the queue manually from the command line:

```sh
php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_queue_runner
```

If you want to process the entire queue in one pass you can run:

```sh
EMPTY_QUEUE=1 php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_queue_runner
```

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    Enabling the indexing queue is recommended for production environments.
</div>

<div class="alert alert-danger">
	<i class="fa fa-exclamation-triangle"></i>
	When the indexing queue is not enabled every indexing job <i>(complete re-indexing, update/deletion/update of products or categories, etc.)</i> will occur synchronously. Trying to synchronously index too many objects at a time may trigger PHP timeouts.
</div>

### Automatic indexing

By default, the extension indexes each change or deletion of product or category and this change is propagated to Algolia immediately. It's usefull as it keeps the data in Algolia in sync with what is in your Magento. But if you want to prevent this behaviour, you can do it by changing the indexer's mode to "Manual Update".
This change will prevent the indexer to index every single change of a product or a category immediately.

When you switch the mode to "Manual Indexing", you'll need to run full product and category reindex on a regular basis, for example every night, to keep your data synchronized with Algolia.

### Manual reindexing

If you want to completely reindex your catalog, you can do it in two ways:

#### Via administration interface

In your Magento administration navigate to **System > Index Management** and there hit **Reindex** button right next to the indexers you want to reindex:

<figure>
    <img src="../../../img/indexers.png" class="img-responsive" alt="Indexers">
    <figcaption>Algolia indexers</figcaption>
</figure>

#### Via command line

You can run the full reindex also from command line anduse the command for example in a cron job.

Command for the complete product reindex:

```sh
php -f /absolute/path/to/magento/shell/indexer.php -- -reindex algolia_search_indexer
```

You can use more than one indexer name in the command.

Names of other Algolia indexers:

- `algolia_search_indexer` - reindexes all products
- `algolia_search_indexer_cat` - reindex all categories
- `algolia_search_indexer_pages` - reindexes all CMS pages
- `search_indexer_suggest` - reindexes all search query suggestions
- `search_indexer_addsections` - reindexes all data from additional sections
- `algolia_queue_runner` - process jobs in indexing queue
