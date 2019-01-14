---
layout: m2-documentation
title: Help & Support page
permalink: /doc/m2/support-page/
description: Learn how to troubleshoot and sort our the issues you may experience
---

Help & Support page allows you to troubleshoot potential issues with using the Algolia extension. 
It can be found in Magento administration in **Stores > Configuration > Algolia Search > Help & Support**.

<figure>
    <img src="../../../img/support-page.png" class="img-responsive" alt="Help & Support page">
    <figcaption>Help & Support page</figcaption>
</figure>

In default view, the support page offers the most visited documentation pages and forum topics.
Next to that it shows tutorial videos, which guide new users through the extension and reveal advanced features of the extension.

## Searching for help

On the top of the page is displayed a search box, which allows you to search through official extension's documentation and community forum topics to solve the issue you experience:

<figure>
    <img src="../../../img/support-page-search.png" class="img-responsive" alt="Search for help">
    <figcaption>Search for help</figcaption>
</figure>

## Contact form

If the Algolia plan used in Magento is [eligible for a direct e-mail support](https://www.algolia.com/pricing), the page displays "Contact Us" link on the bottom of the page. The link leads to a page with with a form via which you can contact Algolia's support directly:

<figure>
    <img src="../../../img/support-page-contact.png" class="img-responsive" alt="Contact Algolia support">
    <figcaption>Contact Algolia support</figcaption>
</figure>

When typing to "Subject" field, related docs pages are suggested / searched on the right side of the page, which might help you to faster solve the issue.

When the form is sent data from the form are enriched by anonimized data from Magento and sent to Algolia engineers. The additional data helps Algolia's engineers to better understand the issue abd to sort out the issue faster. 

Pushed data:

- Extension version
- Magento version
- Magento edition
- No. of jobs in indexing queue
- Date and time of creation of the oldest job in indexing queue
- Last 20 rows from Indexing queue archive table (failed jobs)
- Complete configuration of Algolia extension (except Admin API key)

You can opt-in for pushing additional data to the ticket. Additional data are:

- Catalog size
- List of installed 3rd party modules
