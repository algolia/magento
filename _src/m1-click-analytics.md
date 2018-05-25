---
layout: m1-documentation
title: Click & Conversion Analytics
permalink: /doc/m1/click-analytics/
description: Learn how to track Click & Conversion analytics in Algolia extension for Magento
---

This feature of the extension allows you to analyse how your customers are behaving on your website using [Algolia’s Click & Conversion Analytics](https://www.algolia.com/doc/guides/analytics/click-analytics/) .
 
You can track which products are clicked more, and which search queries leads to more conversions. Note: this feature is not available on all plans, please refer to [Algolia's pricing page](https://www.algolia.com/pricing/) for more details.


## Configuration

The analytics feature has four configuration variables:

<figure>
    <img src="../../../img/cc_config_m1.png" class="img-responsive" alt="Settings of click & conversion analytics feature">
    <figcaption>Settings of click & conversion analytics feature</figcaption>
</figure>

<table>
  <tr>
    <td>Enable Click Analytics</td>
    <td>Enables the Click Analytics feature if set to “yes” and if your current plan allows it. <br/>Default value : No</td>
  </tr>
  <tr>
    <td>DOM selector of a result container on instant search page</td>
    <td>Only displayed if the Click Analytics is enabled.<br/>Defines the DOM selector that will trigger the click tracking. Note that this selector must contains both “data-objectid” (unique identifier of your product) and “data-position” (its position in the list) attributes to send needed data.<br/>Default value : “.ais-infinite-hits--item a.result, .ais-hits a.result”<br/>(The default value allows you to track clicks on your product lists whether or not the infinite scrolling is enabled)</td>
  </tr>
  <tr>
    <td>Conversion Analytics mode</td>
    <td>Possible values : “Disabled”, “Add to cart”, “Place Order”<br/>Enables the Conversion Analytics feature and defines which action triggers the conversion tracking.<br/>If set to “Add to cart”, the conversion will be triggered by both instantsearch product listing and product page “add to cart” buttons.<br/>If set to “Place Order”, the conversion will be triggered on the Magento checkout success page.<br/>Default value : “Disabled” </td>
  </tr>
  <tr>
    <td>DOM selector of a "Add to Cart" buttons</td>
    <td>Defines the DOM selector that will trigger the conversion tracking. Note that this selector must contains “data-objectid” (unique identifier of your product) attribute to send needed data.<br/>Default value : “.add-to-cart-buttons .btn-cart, .hit-addtocart”<br/>(The default value allows you to track conversion on both instantsearch result page and Magento product page)</td>
  </tr>
</table>

## Conversion rules

To be considered as “converted”, a product has to be tracked as “clicked” before. 
It means that if a user go directly to a product page without clicking on it in the autocomplete menu or in an instant search product listing page and add it to the cart (or place order with it), it won’t be tracked as “converted” .

If conversion analytics mode is set to “Add to cart” and the user click on the “Add to cart” button of the instant search product listing, the clicked product is both tracked as “clicked” and “converted” at the same time.

If conversion analytics mode is set to “Place order”, the event is triggered on the Magento checkout success page, it means that the conversion will be tracked only if the order submitting is successful (i.e. if the payment process is finalized without any errors) .



