import type { Schema, Struct } from '@strapi/strapi';

export interface BrandStat extends Struct.ComponentSchema {
  collectionName: 'components_brand_stats';
  info: {
    description: '';
    displayName: 'stat';
    icon: 'chart-pie';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'brand.stat': BrandStat;
    }
  }
}
