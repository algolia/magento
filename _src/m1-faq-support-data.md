---
layout: m1-documentation
title: Troubleshooting data, index, or queue issues
permalink: /doc/faq-support-data/
description: FAQ on errors linked to data, indexing, and queueing
redirect_to: https://www.algolia.com/doc/integration/magento-1/troubleshooting/data-indexes-queues/
---

Let's say you're getting an error with your data or search results. It may be an error that other Magento/Algolia users experience. We've put together here a page of solutions and background understanding to the most common problems users have.

The types of errors vary, affecting both new and long-time users. And while many problems can be serious, they often require only a few simple steps to resolve.

<div class="alert alert-info" style="white-space: pre-wrap">If you haven't yet installed the extension, or followed the steps in <a href="/magento/doc/m1/getting-started">getting started</a>, please do so before continuing.

Also, if you are still having troubles after having gone through this page, please check out our search bar above to find more answers. You can also browse our sidebar, or check out our <a href="/magento/faq">Magento FAQ</a>, or the <a href="https://www.algolia.com/doc">Algolia docs</a>.
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

Go here to see [how to set up credentials](/magento/doc/m1/getting-started/#install-the-extension).

If your credential are fine, can you check to see if you've set up automatic indexing (i.e. enabled the queue)? Without the queue, your changes will not take effect unless you reindex manually, which we don't normally suggest. It's always better to have a queue.

Go here to see [how to set up the queue](/magento/doc/m1/indexing-queue/#the-indexing-queue).

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

Go here to see [how to start cron](/magento/doc/m1/indexing-queue/#with-cron).

> Why do we suggest using a queue?

- The queue is **asynchronous**. This means that it is non-blocking. Whether you are reindexing via code or the console, you will be able to do move around on the console, or your code can do other things, while the queue is reindexing in the background.
- The queue is more **reliable**. For 2 reasons. (1) Because if the job fails, the next run of the queue will automatically retry. (2) Because of how the the queue breaks up your index - see [below](/magento/doc/faq-support-data/#my-data-is-too-large).
- **No downtime**: The queue uses an advanced technique to ensure that indexing does not cause any downtime on your site. This is achieved by the queue's use of temporary indexes.

<div class="alert alert-info">
One thing to keep in mind is that with queueing, all indexing is <b>asynchronous</b> - meaning every time you need to reindex, you will need to wait for the cron job to run. So even if you reindex via the command line, or programmatically, or via the console - in all situations, you will need to wait for the cron job to run the process. This is not a serious problem because the cron job runs every 5 minutes.
</div>

## My data is too large

### Data needs to be broken up into smaller chunks
This is also discussed below related to timeouts and memory limits: Large indexes *will* cause problems if queueing is not enabled because of the way it breaks up your Magento data.

Behind the scenes, it might be interesting for you to know that **Algolia has a 10K size limit to all uploads**.

The extension hides this from you. So whether you use the queue or not, every time you reindex, behind the scenes, the extension breaks up your data to ensure that it complies with Algolia's size limit.

So the extension does the following: for every reindex, the extension pushes only 1000 products at a time. Therefore, if you have 5,000 records, the extension will break up your index into 5 smaller index chunks.

Now without the queue, the PHP code will attempt to push your 5 smaller chunks one after the other, which will take a long time and can possibly result in a timeout or an out of memory error.

So the queue resolves this by breaking up your indexes in 5 *jobs*, where each job contains 1000 records. This way, the queue will send each job, one at a time. With this approach, there is little chance of running out of memory or timing out. And even if there is an error, the next time the cron runs, it will retry the job that failed.

But it is important to note that, while queueing will solve the problem of large indexes, it will inevitably slow down the indexing. This is only natural. If you have 10K product index, this means that 10 trips will be needed before your products are fully updated. If the cron job runs every 5 minutes, that means the 5 trips will take 5 minutes*10 jobs = 50 minutes.

To learn more about record size limits please see the official [Algolia documentation](https://www.algolia.com/doc/guides/indexing/structuring-your-data/#size-limit).

## Common errors

> *Ok, you've done everything correct - set up your data, enabled the queue, and started the cron job - but your data is still not there!! Hang on, maybe there was an error?*

First off, please confirm that you have indeed enabled indexing and your cron job is running. Not doing this correctly is the most common cause of error.

<div class="alert alert-info">
And don't forget: Even if your indexing fails, the next time the cron job runs, the process will start where it had left off - and this time it might not fail. So, the best solution to an error is to have queueing enabled, because it is self-correcting.
</div>

Let's look at some possible errors.

### Network errors
Timeouts, outages. Usually, these are the kinds of errors automatically fixed thanks to the queueing process. So the next run may not have the same problem. However, if this error persists, please see if there is not some kind of lmarger issue affecting your infrastructure.

### Running out of memory
Large indexes, as discussed immediately below, will commonly cause memory problems. For one, Magento has some problems with memory leaks which cause errors when memory usage increases. Secondly, with Algolia, memory usage increases when you send Algolia an index that exceeds 10K. We not only suggest, but in fact we require that all indexes be no greater than 10K. Queueing resolves this problem, because the cron job will break up large indexes into 10K chunks, ensuring success. Without the cron job, and with [EMPTY_QUEUE=1](/magento/doc/m1/indexing-queue/#emptying-the-queue), there is no check on the index size.

### Too many products
As already stated, [Algolia only accepts 10K index sizes](/magento/doc/faq-support-data/#my-data-is-too-large). If you are not using the queue, there is no check on this, and so if the size of your products index exceeds 10K, the indexing will fail. With queue enabled, the cron job will break down the index into 10K chunks, thereby ensuring success.

To learn more about record size limits please see the official [Algolia documentation](https://www.algolia.com/doc/guides/indexing/structuring-your-data/#size-limit).

So, knowing this - that a reindex will stop because you have too many products - the result is that your data will not be complete until the whole index is uploaded to Algolia - and this might take some time. In the meantime, some data will be missing, or not updated, or not all of your facets will be present. The indexing process has to finish before your data will be complete.

How do you know if the indexing process has failed?

1. You can see it from the front end - the data is not correct.
2. or it you can check the [algoliasearch_queue table](/magento/doc/m1/indexing-queue/) and see if there are unfinished jobs.

Whenever reindexing fails, it will need to be restarted - but the good news is that all "restarts" continue where it had left off. You have 2 ways to restart an index:

1. Enable the queue. This will then reindex automatically every 5 minutes (or whatever you have set it to).
2. Manually, in the Magento dashboard - Click on the index and press restart.

Again, enabling the Queue is the preferred solution.

### Missing facets

> It is searching categories but not products - partial indexing - can be solved by checking for errors or setting up your queue

When you [add a new attribute to your facets](/magento/doc/m1/indexing/#additional-sections-indexing), you need to reindex your products so that the new attribute is included in your Algolia data and therefore present as a facet in your search results.

### Some products are invisible (not showing up)

> Some products are filtered out of your indexes - Check the products attributes ...

The extension comes with a product-level filter that removes all out-of-stock and disabled products from your search results.  No invisible products will be indexed either. For more information, see our discussion about [Product Indexing](/magento/doc/m1/indexing/#products-indexing).

Can you therefore please make sure that all of your products are enabled, visible, and in stock?

If they are still not showing up, take a look at the logic below. This is what we use to filter-out products. Maybe your products will be filtered?

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
