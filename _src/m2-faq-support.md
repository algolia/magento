---
layout: m2-documentation
title: Having Troubles?
permalink: /doc/m2/faq-support/
description: Having troubles? FAQ starts here
---

Let's say you're getting an error with your data or search results. It may be an error that other Magento/Algolia users experience. On this page, we've put together the solutions and background understanding of the most common problems users have.

> If you haven't yet installed the extension, or followed the steps in <a href="https://community.algolia.com/magento/doc/m2/getting-started/">getting started</a>, please do so before continuing.

The types of errors are varied, affecting both new and long-time users. Many of the problems are serious but actually require only a few simple steps to resolve.

If you have more precise questions, check out our <img style="display:inline-block;width:25px;" src="../../../img/algolia-logo-new.svg" class="img-responsive" alt="">search bar above. You can also browse our docs ([Magento docs](https://community.algolia.com/magento/doc/m2/getting-started/), [Algolia docs](https://www.algolia.com/doc/)) or our [FAQ](https://community.algolia.com/magento/faq/).

## My data is missing or it is not up to date

> *I've done everything - installed the extension, configured my data and settings, and added a search bar to my site. But nothing happens. I search and I get no results. Or only some of my data appears, but the rest is missing, or there are no facets...*

Most likely, this is related to **indexing** and/or **queueing**.

* Did you **upload your data?**
* **Reindex?**
* **Enable queueing?**
* **Start Cron**

#### Uploading Data

The extension fetches your Magento product data and processes it, transforming it to JSON. It then sends the JSON to Algolia. If this is done correctly, there should be no problem.

> Do you have empty indexes? Did you just install the extension?

Algolia indices are created immediately when you save an Algolia configuration in Magento. The moment you set up your Algolia credentials in Algolia, the indices should have been created. And as soon as you change a setting or add/remove/modify your data, a new index is ready to go to Algolia. If it does't, the change will not show up.

So you might want to check your credentials - your API and APP ID. Are these correct?

If your credential are fine, can you check to see if you've set up automatic indexing (i.e. enabled the queue)? Without the queue, your changes will not take effect unless you reindex manually, which we don't normally suggest. It's always better to have a queue.

But even so, if the indexing did occur, maybe it failed - you'll need to check for errors.

But first, the queue.

#### Enable queue / cron

In order to process those jobs, you need to set up a cron job which will run every few minutes (let's say 5) and each time it runs it processes a small portion of those created jobs. Once all the jobs are processed, your data will be reindexed.

While enabling the queue is strongly recommended, one thing to keep in mind is that all indexing is now asynchronous - meaning that every time you need to reindex, you will need to wait for the cron job to run. This even means that if you *manually* reindex, your index request will nonetheless be placed on the queue and wait for the next job to run.

To be more clear, the way the queue works is that:
- when you reindex your products, it actually doesn't send the products to Algolia immediately; instead, it creates a bunch of reindexing records/jobs in the algoliasearch_queue table in your Magento database.
- In order to process those records/jobs, you need to set up a cron job which will run every few minutes (let's say 5) and each time it runs it processes a small portion of those created jobs. Once all the jobs are processed, your data will be reindexed.

<div class="alert alert-warning">
Note that enabling YES to queueing doesn’t mean that you have set up the cron job. You also need to start CRON. So, if you need your data to be sent immediately to Algolia, you will need to *first* disable the queue and then manually run the indexing process. Don't forget to re-enable the queue once that is done.!
</div>




#### Errors

<div class="alert alert-info">
Ok, you've done everything correct - set up your data, enabled the queue, and started the cron job - but your data is *still* not there!! Hang on, there's more ...
</div>

First off, please confirm that indeed you have indexing enabled and your cron job is running.
One thing we can assure you of - If indeed the indexing is in error, the next time the job runs, the indexing process will start here it had left off.

But let's look at some of the possible errors.

Possible errors: network - timeouts, outages

Many times a reindex stops because you have too many products. The result that the data will not be complete - some data will be missing, or not updated, or facets might not be present. The indexing process has to finish completely before your data will be as you expect.

How do you know if the indexing process has failed?
1. You can see it from the front end - the data is not correct.
2. or it you can check the algoliasearch_queue table and see if there are any rows

Whenever reindexing fails, it will need to be restarted - but the good news is that all "restarts" continue where it had left off. You have 2 ways to restart an index:
1. Enable the queue. This will then reindex automatically every 5 minutes (or whatever you have set it to).
2. Manually in the Magento dashboard - Click on the index and press restart.

Enabling the Queue is the preferred solution.

It is searching categories but not products - partial indexing - solved by error checking and queueing


Failed to index? - best to rerun the product  / all indexes manually. After that, it is best to enable the queue

#### Facets missing?

When you add a new attribute to facets you need to reindex your products in order the attribute is indexed and therefore offered as facet on instantsearch page.

### Some products are invisible (not showing up)

Can you please make sure that all of your products are enabled, visible, and on stock?
The extension indexes only those products which should be found in search.
So no invisible products will be indexed.

If they are still not showing up, take a look at the logic we use to filter out products. Maybe your products will be filtered?

```php
if ($product->isDeleted() === true
      || $product->getStatus() == Status::STATUS_DISABLED
      || !in_array((int) $product->getVisibility(), [Product\Visibility::VISIBILITY_BOTH, Product\Visibility::VISIBILITY_IN_SEARCH, Product\Visibility::VISIBILITY_IN_CATALOG], true)
      || ($product->isInStock() == false && !$this->configHelper->getShowOutOfStock($storeId))
  ) {
      $productsToRemove[$productId] = $productId;
      continue;
  }
```

Finally, please check to see if there are any errors or any indexes still in the queue. Once there are no errors and no queued jobs, reindex once again, and finally, when that is done, verify any of your products are still missing.

#### Development

f you are not live, you can use the production index in development.
If you are live and can't afford a testing index, I fear there is a problem with the business case.
Anyway, adding an attribute to the index shouldn't affect other index users.


## My data is too large



#### Data needs to be broken up into 10K chunks
Explain

#### Queueing does that for you automatically
Explain
