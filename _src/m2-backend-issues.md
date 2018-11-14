---
layout: m2-documentation
title: Backend issues
permalink: /doc/m2/backend-issues/
description: Technical troubleshooting - Backend issues
---

## Make sure that the extension is up-to-date ##

It can happen that you’re facing a known issue that has already been fixed. Unfortunately, if your extension is not up-to-date, you can’t know it. 

So, keeping your extension updated is a very good way to avoid that. Not only you will get all the available fixes but also the latest features provided by the Algolia team.

To be sure to have the latest released version, check our [Github repository](https://github.com/algolia/algoliasearch-magento-2/releases) .

And you can compare the latest release version with the version of your **etc/module.xml file** 

<img src="../../../img/troubleshooting/01-module-version.png" class="img-responsive" alt="Module version">

Or if you prefer, you can also check the used API Clients directly on your dashboard. You can find them in **Monitoring > Operations > API Client**. 

<img src="../../../img/troubleshooting/02-version-dashboard.png" class="img-responsive" alt="version dashboard">

If a new version is available, it will be displayed next to Magento2 1.X.X

<img src="../../../img/troubleshooting/03-version-update.png" class="img-responsive" alt="version update">

If you need to update your extension, please refer to the [documentation](/magento/doc/m2/upgrade/)

 
## Understand how your Magento configuration determines the number of created indices and the indexing of your data ##

The first thing you need to do when installing the extension is to enter your credentials in the configuration.

<img src="../../../img/troubleshooting/04-credentials.png" class="img-responsive" alt="credentials">

Once you save this configuration, if the credentials are correct, the extension will create instantly the needed indices in your Algolia application (those indices will be filled during the indexing afterwards). You can check the indices in your [Algolia dashboard](https://www.algolia.com/dashboard).

By default, the Algolia extension creates 3 different replicas for each product index. Those replicas are directly related to the sorting configuration in the InstantSearch section.

<img src="../../../img/troubleshooting/25-sortings.png" class="img-responsive" alt="sortings">

Adding or removing sortings impacts directly the number of created replicas. If you want to read more about it, you can have a look at the [related FAQ](/magento/faq/#how-many-records-does-the-magento-extension-create). 

Keeping an eye on the Algolia dashboard is very useful, it allows you to make sure that you get the expected number of created indices. 

The indices created this way depend on the extension configuration about products, categories and additional sections. Their name is directly related to the defined index name prefix in Algolia configuration in Magento.

<img src="../../../img/troubleshooting/05-prefix.png" class="img-responsive" alt="Prefix">

You are using Algolia extension on your live website, but you’ll probably have to use it on a staging or dev environment too. Defining meaningful prefixes to immediately identify what index belongs to which environment is a very good practice (“prod_magento_”, “staging_magento_”, “dev_magento_”, etc … ). 

Mastering your Magento / Algolia configuration and knowing how many environments you’re using should be enough to anticipate the number of indices that would be created in your Algolia application. **It’s the first step for a successful indexing**. Don’t hesitate to check this number on [the indices list](https://www.algolia.com/explorer/indices) of your Algolia dashboard. If it’s not correct, that’s probably because you missed something regarding the configuration in Magento.

<img src="../../../img/troubleshooting/06-indices.png" class="img-responsive" alt="Indices">

Here are some examples of Magento configuration that can lead to an unexpected number of created indices:

- **You set a different configuration on a store view or website level**. Magento natively allows its users to define both default configuration and configuration related to a particular store view or a particular website. Some of the Algolia configuration directives are configurable this way. For example, if you have 2 websites, you can decide to use different sortings on both of them, that will end on a different number of created indices for these 2 websites. This kind of specific configuration is easy to forget (especially when there’s more than 1 administrator) as Magento only displays the default configuration when you reach the page. **So, switching from a website / store view configuration to another thanks to the dropdown situated on the top-left corner of the page can be useful to make sure that no unwanted configuration was set**.

<img src="../../../img/troubleshooting/07-store-switcher.png" class="img-responsive" alt="Store switcher">

- **You’re not aware of the configuration on your “All Stores” page** (Stores > Settings > All Stores). This page lists [all the websites / stores / store views that your Magento is managing](https://devdocs.magento.com/guides/v2.2/config-guide/multi-site/ms_websites.html):
**Keep in mind that the Algolia extension will creat a whole set of indices for every active storeviews.** If you have a multilingual website, this number can increase very easily.

<img src="../../../img/troubleshooting/08-all-stores.png" class="img-responsive" alt="all stores">

- **You’re not aware of your configuration regarding customer groups**. You decided to enable the management of customer groups in the “advanced” configuration of the extension. Now it will create a whole set of indices for every customer group in Magento **(Customers > Customer Groups)**. By default, Magento creates 4 customer groups (General, Not logged in, Retailer and Wholesale) but you may use third-party extensions that create their own customer groups. Those extensions can create hundreds of them, so be very careful before enabling customer group management in the extension’s configuration, and check the customer groups page.

<img src="../../../img/troubleshooting/09-customer-groups.png" class="img-responsive" alt="Customer groups">


## Understand why my data updates are not propagated to the Algolia dashboard ##

When your data doesn’t seem to be pushed to Algolia, it can be for 3 reasons:

- There’s an error during the process. ([see the dedicated chapter below](#investigate-the-logs-to-find-if-theres-an-error))
- If the indexing queue is activated: the indexing became asynchronous and the issue should be related to the queue processing. ([see the dedicated chapter below](#figure-out-why-your-queue-may-be-stuck))
- The product/category has a particular status that prevents it from being indexed.

Let’s have a closer look at the third reason which is the easiest one to investigate. The reasons for a product or a category not to be indexed are listed in the [extension documentation](/magento/doc/m2/indexing/#indexable-products). 

First thing you can do is go into your Magento back-office, then on a product / category page and just save it without updating any values. The save event should trigger an automatic reindexing of this particular product / category to the Algolia servers (turn off the indexing queue before if needed).

There are now two interesting things to check on your Algolia dashboard:

- In Monitoring > tab “Logs”  you have the **“Latest operations” panel**. Reindexing a product triggers a POST request that should appear on top of the list with an url which looks like this : /1/indexes/[INDEX_NAME]/batch. 

<img src="../../../img/troubleshooting/10-operations.png" class="img-responsive" alt="Operations">

By clicking on the link, you see all the details related to this request . Check on the “Request body” tab, you should see “AddObject” as action with all the entity attributes. Seeing this ensures that the product / category save in Magento was correctly propagated to Algolia.

<img src="../../../img/troubleshooting/11-request-body.png" class="img-responsive" alt="Request body">

- To make sure that the record related to your product / category was updated, you can go on its index on your dashboard and search for it. Have a look at the record’s attributes and search for  “AlgoliaLastUpdateCET”. This attributes contains the last date and time when the record was updated. _Note: The time is in Central European Time._

<img src="../../../img/troubleshooting/12-last-update-attribute.png" class="img-responsive" alt="Last update attribute">

For some reason, it can happen that your product has been updated in your Algolia dashboard but not with the values you expected. It may be because your product/category has specific store view/website values in Magento. The Algolia extension respects this native configuration and indexes the specific values instead the default ones. To check that, you can use the store switch on the top-left corner of the page.

<img src="../../../img/troubleshooting/13-product-store-switcher.png" class="img-responsive" alt="Product store switcher">

What if your product data is not propagated to the Algolia servers (No query on the “Latest operations” panel and attribute “AlgoliaLastUpdateCET” not being updated)? 

In this case, you should use the [SKU reindexing form](/magento/doc/m2/sku-reindexing-form/). It will give you the reason why the product is not indexed.

Each time a product or a category is saved in a proper Magento way, the save event automatically triggers a reindex to Algolia. But if you use a third-party extension or a custom script to manage your catalog that doesn’t trigger the standard Magento  behaviour (e.g. writes the changes directly to Magento’s database and bypassing the event system), the reindexing of those entities will not happen. 

The Algolia extension relies on the [Magento’s plugin system](https://devdocs.magento.com/guides/v2.2/extension-dev-guide/plugins.html) and adds its custom logic on those 5 classes: 

- Magento\Catalog\Model\ResourceModel\Product
- Magento\Catalog\Model\Product\Action
- Magento\CatalogInventory\Model\ResourceModel\Stock\Item
- Magento\Catalog\Model\ResourceModel\Category
- Magento\Catalog\Model\Category\Action

You have to make sure that your third-party extension or your custom script uses those classes and their save/delete methods for the entity (product / category / …) to be automatically reindexed.


## Investigate the logs to find if there’s an error ##
First thing to do is to figure out if your indexing process generates errors or not. As the process can be asynchronous if the indexing queue is enabled, errors can occur without you being aware of it.

During the asynchronous reindexing process, the extension creates temporary indices suffixed by “_tmp” (for example, if your main product index is “magento_products_default”, the extension creates the temporary index “magento_products_default_tmp”). These indices are filled with the indexed records and replace the real (live) indices at the end of the process before being deleted.  

The temporary indices are created to make the [reindexing atomic](https://www.algolia.com/doc/tutorials/indexing/synchronization/atomic-reindexing/). The other reason is that with temporary indices, the extension doesn't have to delete products from live indices during full reindexing. Only "live" products are indexed to temporary indices and then the production index is replaced at the end of the process and only "live" products will be searchable.

That also means that if an error occurs, the process does not end, and the temporary index is not deleted. **It is something you can use to check if you got errors during your indexing process**. Check the list of your indices in the dashboard, and if you see indices suffixed by “_tmp” in it which haven’t been updated for a long time (10 or more minutes, depending on how often the queue runner is scheduled to run.), this probably means that you have errors.

By default, each error happening in Magento is logged in the files situated in [MAGENTO_PATH]/var/log : 

- system.log
- exception.log

If you want to be sure that the latest errors you see on those files are related to the indexing, you can monitor them during the process.

```sh
tail -f var/log/system.log var/log/exception.log
```

Monitoring these logs will give you the exact error that occured. If you know the error, you'll be much likely to localise the source of the issue and see what is going on in Magento.

The extension has an option to activate **additional logs** during the process (in Stores > Algolia Search > Credentials and Basic Setup > Enable logging) that could be really useful to help you debugging the issue.

In addition to the Magento logs, you can also monitor the **“latest operations” panel** in your [Algolia dashboard](https://algolia.com/dashboard) ([In Monitoring > tab “Logs”](https://www.algolia.com/monitoring/logs)). You can monitor what API calls the extension executes on Algolia.


## Figure out why your queue may be stuck ##

You activated the indexing queue in the extension, now your indexing is asynchronous, but for some reason, your data doesn’t seem to be updated. In such case, you need to verify if your indexing queue is not stuck.

The indexing queue process relies on one of the Magento indexer added by the Algolia’s extension: algolia_queue_runner.

To know more about [Magento indexers](https://devdocs.magento.com/guides/v2.2/extension-dev-guide/indexing.html).

First thing you need to check is if the indexer is “ready”. You can do that with a command:

```sh
php bin/magento indexer:status algolia_queue_runner
```

If the status is “processing” and it seems to be stuck on this status since a long time, you’ll probably have to reset it:

```sh
php bin/magento indexer:reset algolia_queue_runner
```

The version 1.8 of the extension introduced a new feature to help you understand the indexing queue. You can find it in **Stores > Algolia Search > Indexing Queue**. This feature is a grid that displays to the user the contents of the indexing queue. Thanks to this, you can monitor how many jobs the indexing queue contains. 

<img src="../../../img/troubleshooting/15-indexing-page.png" class="img-responsive" alt="Indexing queue page">

On top of the page, you’ll see recommendations that will help you to configure and optimize your indexing queue the best way possible. Thanks to this, you can also monitor the status of the indexer and the last time it was run. 

In addition to these advices, you can also find the details of each job by clicking on the link “view” on the right column. If the job has encountered an error, this error is logged in the “**Error Log**” attribute.

<img src="../../../img/troubleshooting/16-job-detail.png" class="img-responsive" alt="Job details">

If everything looks fine, you can just monitor this page by checking regularly the number of jobs in the grid. If the queue is working, **this number should decrease every 5 minutes**. If not, this probably means that the [processing cron](/magento/doc/m2/indexing-queue/#processing-the-queue) is not set up properly. Keep in mind that you can still monitor the calls to the Algolia API on your dashboard (in the “Monitoring” section). 

Finally, when a failing job reaches its maximum retries number without having being processed, since version 1.8, it is archived in the **algoliasearch_queue_archive** table in the database (with its latest encountered error logged). This can be another useful piece of information to help you to debug.

