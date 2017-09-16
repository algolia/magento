---
layout: m2-documentation
title: Having troubles with your data, indexes, or queue ?
permalink: /doc/m2/faq-support-data/
description: FAQ on errors linked to data, indexing, and queueing
---

You're getting an error with your data or search results. It may be an error that other Magento/Algolia users experience. We've put together here a page of solutions and background understanding to the most common problems users have.

The types of errors vary, affecting both new and long-time users. And while many problems can be serious, they often require only a few simple steps to resolve.

<div class="alert alert-info" style="white-space: pre-wrap">If you haven't yet installed the extension, or followed the steps in <a href="https://community.algolia.com/magento/doc/m2/getting-started/">getting started</a>, please do so before continuing.

Also, if you are still having troubles after having gone through this page, please check out our <img style="display:inline-block;width:25px;" src="../../../img/algolia-logo-new.svg" class="img-responsive" alt="">search bar above to find more answers. You can also browse our sidebar, or check out our <a href="https://community.algolia.com/magento/faq/">Magento FAQ</a>, or the <a href="https://www.algolia.com/doc/">Algolia docs</a>.
</div>

---

## My data is missing or it is not up to date

> *I've done everything - installed the extension, configured my data and settings, and added a search bar to my site. But nothing happens. I search and I get no results. Or only some of my data appears, but the rest is missing. Or there are no facets...*

> *This is most likely an **indexing** and/or **queueing** problem.*

> * *Did you **upload your data?***
> * ***Reindex?***
> * ***Enable queueing?***
> * ***Start Cron***

Normally, once the **extension** is installed, it fetches your Magento product data, processes it (transforming it to JSON), and then sends the data (JSON) to Algolia. If this is done correctly, there should be no problem.

Let's look at this process in more detail.

## Uploading your data

> *Do you have empty indexes? Did you just install the extension?*

Algolia indices are created immediately when you save an Algolia configuration in Magento. The moment you set up your **Algolia credentials** in Algolia, the indices should have been created. And as soon as you change a setting, or add/remove/modify your data, a new index is ready to go to Algolia. If it doesn't get to Algolia (via a reindex), the change will not show up in your search results.

> *So you might want to check your credentials. Are your **APP ID** and **API Key** correct?*

If your credential are fine, can you check to see if you've set up automatic indexing (i.e. enabled the queue)? Without the queue, your changes will not take effect unless you reindex manually, which we don't normally suggest. It's always better to have a queue.

However, if the indexing *did* occur, and you still have data problems - check to see if the reindexing failed. You'll need to check for errors.

But first, let's make sure the queue was properly enabled.

## Enabling the queue and starting cron

The way the queue works is that:

- In order to reindex, you need to set up a **cron** job which will run every few minutes (let's say 5).
- When you reindex your products, it actually doesn't send the products to Algolia immediately; instead, it creates a bunch of reindexing records/jobs in the algoliasearch_queue table in your Magento database.
- Every time the cron runs, it processes only a small portion of the records/jobs. Five minutes later, it picks up where it left off, eventually clearing out the queue. Once all the jobs are processed, your data should be fully reindexed.

<div class="alert alert-info">
Note that enabling the queue doesn’t mean that you have set up the cron job. You also need to start CRON. So, if you  need your data to be sent immediately to Algolia, you will need to *first* disable the queue and then manually run the indexing process. Don't forget to re-enable the queue once that is done.!
</div>

> Why do we suggest using a queue?

Because ...

<div class="alert alert-info">
One thing to keep in mind is that with queueing, all indexing is <b>asynchronous</b> - meaning that every time you need to reindex, you will need to wait for the cron job to run. This means that even if you <i>manually</i> reindex, your request will nonetheless be placed on the queue and wait for the next job to run.
</div>

## My data is too large


### Data needs to be broken up into 10K chunks
Explain


## Common errors

> *Ok, you've done everything correct - set up your data, enabled the queue, and started the cron job - but your data is still not there!! Hang on, maybe there was an error?*

First off, please confirm that you have indeed enabled indexing and your cron job is running. Not doing this correctly is the most common cause of error.

<div class="alert alert-info">
And don't forget: Even if your indexing fails, the next time the cron job runs, the process will start where it had left off - and this time, there might not be any error. So, one solution to an error is to have queueing enabled, because it is self-correcting.
</div>

Let's look at some possible errors.

### Network errors
Timeouts, outages. Usually, these are the kinds of errors automatically fixed thanks to the queueing process. So the next run may not have the same problem. However, if this error persists, please see if there is not some kind of lmarger issue affecting your infrastructure.

### Too many products
Many times a reindex stops because you have too many products. The result is that your data will not be complete - some data will be missing, or not updated, or not all of your facets will be present. The indexing process has to finish before your data will be complete.

How do you know if the indexing process has failed?

1. You can see it from the front end - the data is not correct.
2. or it you can check the algoliasearch_queue table and see if there are unfinished jobs.

Whenever reindexing fails, it will need to be restarted - but the good news is that all "restarts" continue where it had left off. You have 2 ways to restart an index:

1. Enable the queue. This will then reindex automatically every 5 minutes (or whatever you have set it to).
2. Manually, in the Magento dashboard - Click on the index and press restart.

Again, enabling the Queue is the preferred solution.

### Missing facets

> It is searching categories but not products - partial indexing - can be solved by checking for errors or setting up your queue

When you add a new attribute to your facets, you need to reindex your products so that the new attribute is included in your Algolia data and therefore present as a facet in your search results.

### Some products are invisible (not showing up)

> Some products are filtered out of your indexes - Check the products attributes ...

The extension comes with a product-level filter that removes all out of stock or disabled products from your search results.  So no invisible products will be indexed. Can you please make sure that all of your products are enabled, visible, and in stock?

If they are still not showing up, take a look at the logic below. This is what we use to filter out products. Maybe your products will be filtered?

```PHP
// Remove product from index if: deleted, disabled, out of stock, not visible
if (  $product->isDeleted() === true
  ||  $product->getStatus() == Status::STATUS_DISABLED
  || ($product->isInStock() == false && !$this->configHelper->getShowOutOfStock($storeId))
  ||  !in_array((int) $product->getVisibility(),
          [Product\Visibility::VISIBILITY_BOTH,
          Product\Visibility::VISIBILITY_IN_SEARCH,
          Product\Visibility::VISIBILITY_IN_CATALOG], true)
  ) {
      $productsToRemove[$productId] = $productId;
      continue;
  }
```
---

### Still getting errors?!

<div class="alert alert-info">
As a final test: please check to see if there are any more errors, or whether some indexes are still in the queue. Once you have determined there are no correctable errors, and no queued jobs, recheck your settings, and then reindex again <i>with queue enabled</i>, and finally, when the queue is empty, verify whether any products are still missing. If yes, contact support. This might be something specific to your account, infrastructure, or extension configuration.
</div>
