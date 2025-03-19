# Reviews Architecture

## Overview

The site uses a single content type for reviews. Reviews can include recommendation metadata to indicate which products are recommended and in use.

## Content Structure

All reviews are stored as markdown files with additional metadata:

```yaml
---
# Standard review fields
id: "product-id"
slug: "product-review-slug"
title: "Product Name: A Review"
excerpt: "Short description..."
rating: 4.5
# etc...

# Recommendation metadata
isRecommended: true          # Whether I recommend this product
isCurrentlyUsed: true        # Whether I'm currently using this product
status: "current"            # One of: "current", "previous", or "heard"
---
```

## URL Structure

- All content lives under the `/reviews/*` path
- Recommended products are accessible via filters: `/reviews?recommended=true`

## Filtering

The reviews page supports filtering by:
- Category
- Status (current, previous, heard)
- Recommendation status

## Related Items

Reviews can reference other reviews using the `relatedRecommendations` field, which contains an array of review slugs.

## Development Notes

When creating new reviews, use the appropriate front matter fields to indicate recommendation status. The UI will automatically display the appropriate badges and include the item in filtered views. 