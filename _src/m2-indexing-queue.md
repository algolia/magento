---
layout: m2-documentation
title: Index Queue
permalink: /doc/m2/indexing-queue/
description: Learn how the index queue works in Algolia extension for Magento 2
---

<div class="alert alert-warning">
Before continuing with this page, let's see where you are. You've <a href="/magento/doc/m2/getting-started">installed your extension</a> and configured your data, chose your settings, and added a search bar to your site. But you search and nothing appears, or your data is not up to date ... Quick question - Did you <i>upload your data</i>, or <i>reindex</i>, or enable the <i>queue</i>? If not, check out our <a href="/magento/doc/m2/faq-support-data">troubleshooting guide</a>.
</div>

**Indexing:** Before your data can be searched, it must be uploaded to Algolia. This process is called indexing, which the extension does automatically.

On this page you will find information about the default indexing process and how it works for different types of data.
<!-- If you need to modify the default behavior, you can to do it programmatically by using the extension’s events. To learn more, see this guide: [Using extension’s events](https://community.algolia.com/magento/doc/m1/customize-backend/). -->

## Indexing in general

The extension tries to keep your data (products, categories, pages, etc.) synchronized with Algolia in real time. This provides the best, most up-to-date search experience for your customers.

The extension provides two types of indexing mechanisms:

* **Section re-index**
An entire section of your catalog (products, categories, etc.) is pushed to Algolia and reindexed.

* **Single item re-index**
A single item is pushed to Algolia and reindexed whenever it changes (addition or deletion, update of products or categories, etc.).

By default, these operations run synchronously and the administrator has to wait for them to finish before continuing to work. This is not very convenient and can cause [unexpected issues](/magento/doc/m2/faq-support-data#my-data-is-missing-or-it-is-not-up-to-date). The indexing queue is designed to alleviate these issues by performing indexing in the background.

## The Index Queue

To enable the indexing queue, navigate to **Stores > Configuration > Algolia Search > Indexing Queue / Cron** in your Magento administration. Once you have enabled the queue, all queued operations will appear in a database table called `algoliasearch_queue`.

Once the indexing queue is enabled, you can set how many jobs will be processed at a time. The default number of jobs is 10. You can adjust this number to fit your catalog and the server your Magento store runs on.

Once the queue is enabled, you need to set up the process that will run it. There are several ways to do this.

#### With cron

To process queued jobs at a regular time interval, configure the following crontab entry:

```sh
*/5 * * * * php absolute/path/to/magento/bin/magento indexer:reindex algolia_queue_runner
```

This will run N jobs every 5 minutes depending on your queue configuration.

#### Without cron

You can also process the queue manually from the command line:

```sh
php path/to/magento/bin/magento indexer:reindex algolia_queue_runner
```

If you want to process the entire queue in one pass you can run:

```sh
EMPTY_QUEUE=1 php path/to/magento/bin/magento indexer:reindex algolia_queue_runner
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

#### Via command line

You can run the full reindex also from command line anduse the command for example in a cron job.

Command for the complete product reindex:

```sh
$ php path/to/magento/bin/magento indexer:reindex algolia_products
```

You can use more than one indexer name in the command.

Names of other Algolia indexers:

- `algolia_products` - reindexes all products
- `algolia_categories` - reindex all categories
- `algolia_pages` - reindexes all CMS pages
- `algolia_suggestions` - reindexes all search query suggestions
- `algolia_additional_sections` - reindexes all data from additional sections
- `algolia_queue_runner` - process jobs in indexing queue
