import type { Schema, Struct } from '@strapi/strapi';

export interface UserSharedCartItem extends Struct.ComponentSchema {
  collectionName: 'components_user_shared_cart_items';
  info: {
    displayName: 'Cart_Item';
    icon: 'shoppingCart';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer;
  };
}

export interface UserSharedFavoriteItem extends Struct.ComponentSchema {
  collectionName: 'components_user_shared_favorite_items';
  info: {
    displayName: 'Favorite_Item';
    icon: 'heart';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'user-shared.cart-item': UserSharedCartItem;
      'user-shared.favorite-item': UserSharedFavoriteItem;
    }
  }
}
