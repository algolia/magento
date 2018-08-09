---
layout: m2-documentation
title: Indexing Queue
permalink: /doc/m2/indexing-queue/
description: Learn how the indexing queue works in Algolia extension for Magento
---

<div class="alert alert-warning">
If you are having any issues with your data, indexes, or queue, please check our <a href="/magento/doc/faq-support-data">troubleshooting guide</a>;
</div>

The **index queue** manages all uploads to Algolia. Before your data can be searched, it must be uploaded to Algolia. This process is called indexing, which the extension does automatically - via the queue.

<div class="alert alert-warning">
Also, if you want to know more about indexing in general, please check out our <a href="/magento/doc/m2/indexing">Indexing overview</a>;
</div>

The extension uses the **queue** to keep your data (products, categories, pages, etc.) synchronized with Algolia in real time. Note that by real-time, we are referring to the mechanism by which every update to your Magento data will trigger an event in the extension which will in turn initiate a reindex. This provides the best, most up-to-date search experience for your customers.

Queue operations run asynchronously, allowing the administrator to continue working while the queue refreshes Algolia in the background.

## The Indexing Queue

To enable the indexing queue, navigate to **System > Configuration > Algolia Search > Indexing Queue / Cron** in your Magento administration.

All queued operations will appear in a database table called `algoliasearch_queue`. You can see your indexes here:  **System > Index Management**

Additionally, you can also set how many jobs will be processed at a time. The default number of jobs is 10. You can adjust this number to fit your catalog and the server your Magento store runs on.

<div class="alert alert-warning">
    <i class="fa fa-exclamation-triangle"></i>
    Enabling the indexing queue is recommended for production environments.
</div>

Once the queue is enabled, you need to set up the process that will run it. There are several ways to do this.

## Processing the queue

### With cron

The standard set up is to process queued jobs at a regular time interval. To do this, configure the following crontab entry:

```sh
*/5 * * * * php absolute/path/to/magento/bin/magento indexer:reindex algolia_queue_runner
```

This will run N jobs every 5 minutes depending on your queue configuration.

### Without cron

You can also process the queue manually from the command line:

```sh
php path/to/magento/bin/magento indexer:reindex algolia_queue_runner
```

This will execute a single instance of a cron job. Note that this will not always empty the queue, as there might be more jobs than one instance can handle.

## Emptying the queue

If you want to clear the queue in one instance, you will need to bypass the cron and process the entire queue in one pass. You do this with by setting the variable PROCESS_FULL_QUEUE=1:

```sh
PROCESS_FULL_QUEUE=1 php path/to/magento/bin/magento indexer:reindex algolia_queue_runner
```

Running this will attempt to empty the queue. However, it might not always be successful. Errors can occur - network timeouts, or more often, your data is too large for one job. In that case, the job will fail, the queue will not be empty, and therefore some of your data will not have been sent to Algolia. Please go here how to resolve [indexing errors](/magento/doc/faq-support-data/#common-errors).

## Indexing queue settings

There are two settings which are taken into account while processing the queue:

### Number of jobs to run each time the cron is run

This number specify how many jobs should should be processed each time the queue runner is launched. The default value is 10, but for you the best value might be different.
To figure out how many jobs can be processed during a single run, you can follow these steps:

1) Turn off queue runner cron job
2) Set the number of jobs to process to 10
3) Manually run a queue runner indexer
4) See how much time it takes
5) If it’s lower than 4 minutes, increase number of jobs to process
6) Repeat from point 3

When the queue runner takes around 4 minutes to process, you have found the right number of jobs to process in a single run. Now you can set up again a cron job to trigger queue runner every 5 minutes.

We are mentioning 4 minutes because it’s a good practice to have some reserve in case the queue runner will be slower (maybe because of higher load on a server or any other circumstances).

### Number of times to retry processing of queued jobs

When a job fails during processing the queue, it'll be re-triggered the next time the queue is processed. In order not to process failing jobs forever, this settings sets how many times the queue should try to trigger the job and then delete it.
