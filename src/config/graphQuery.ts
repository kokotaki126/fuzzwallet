export const AssetsQuery = `query getAccountCurrentTokens($address: String!, $where: [current_token_ownerships_v2_bool_exp!]!, $offset: Int, $limit: Int) {
  current_token_ownerships_v2(
    where: {owner_address: {_eq: $address}, amount: {_gt: 0}, _or: [{table_type_v1: {_eq: "0x3::token::TokenStore"}}, {table_type_v1: {_is_null: true}}], _and: $where}
    order_by: [{last_transaction_version: desc}, {token_data_id: desc}]
    offset: $offset
    limit: $limit
  ) {
    amount
    current_token_data {
      ...TokenDataFields
    }
    last_transaction_version
    property_version_v1
    token_properties_mutated_v1
    is_soulbound_v2
    is_fungible_v2
  }
  current_token_ownerships_v2_aggregate(
    where: {owner_address: {_eq: $address}, amount: {_gt: 0}}
  ) {
    aggregate {
      count
    }
  }
}

fragment TokenDataFields on current_token_datas_v2 {
  description
  token_uri
  token_name
  token_data_id
  current_collection {
    ...CollectionDataFields
  }
  token_properties
  token_standard
  cdn_asset_uris {
    cdn_image_uri
  }
}

fragment CollectionDataFields on current_collections_v2 {
  uri
  max_supply
  description
  collection_name
  collection_id
  creator_address
  cdn_asset_uris {
    cdn_image_uri
  }
}`;

