import{a as i,b as t,c as n,d as o}from"./chunk-4WCTIZDQ.mjs";import{a as s}from"./chunk-4HULEADT.mjs";var r=class{constructor(e){this.config=e}async getFungibleAssetMetadata(e){return await s({config:this.config,minimumLedgerVersion:e?.minimumLedgerVersion,processorType:"fungible_asset_processor"}),i({aptosConfig:this.config,...e})}async getFungibleAssetMetadataByAssetType(e){return await s({config:this.config,minimumLedgerVersion:e?.minimumLedgerVersion,processorType:"fungible_asset_processor"}),(await i({aptosConfig:this.config,options:{where:{asset_type:{_eq:e.assetType}}}}))[0]}async getFungibleAssetActivities(e){return await s({config:this.config,minimumLedgerVersion:e?.minimumLedgerVersion,processorType:"fungible_asset_processor"}),t({aptosConfig:this.config,...e})}async getCurrentFungibleAssetBalances(e){return await s({config:this.config,minimumLedgerVersion:e?.minimumLedgerVersion,processorType:"fungible_asset_processor"}),n({aptosConfig:this.config,...e})}async transferFungibleAsset(e){return o({aptosConfig:this.config,...e})}};export{r as a};
//# sourceMappingURL=chunk-CN7VJIK5.mjs.map