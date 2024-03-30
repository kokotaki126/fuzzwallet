import{b as m}from"./chunk-VO2CATMP.mjs";import{a as h}from"./chunk-QKTV6AZ7.mjs";import{b as t}from"./chunk-F7CR75CJ.mjs";import{a as u}from"./chunk-N4RBQZ2B.mjs";var o=class i extends u{constructor(e,s,a,n,d,l,_){super();this.sender=e,this.sequence_number=s,this.payload=a,this.max_gas_amount=n,this.gas_unit_price=d,this.expiration_timestamp_secs=l,this.chain_id=_}serialize(e){this.sender.serialize(e),e.serializeU64(this.sequence_number),this.payload.serialize(e),e.serializeU64(this.max_gas_amount),e.serializeU64(this.gas_unit_price),e.serializeU64(this.expiration_timestamp_secs),this.chain_id.serialize(e)}static deserialize(e){let s=t.deserialize(e),a=e.deserializeU64(),n=m.deserialize(e),d=e.deserializeU64(),l=e.deserializeU64(),_=e.deserializeU64(),b=h.deserialize(e);return new i(s,a,n,d,l,_,b)}},c=class extends u{static deserialize(r){let e=r.deserializeUleb128AsU32();switch(e){case 0:return p.load(r);case 1:return y.load(r);default:throw new Error(`Unknown variant index for RawTransactionWithData: ${e}`)}}},p=class i extends c{constructor(e,s){super();this.raw_txn=e,this.secondary_signer_addresses=s}serialize(e){e.serializeU32AsUleb128(0),this.raw_txn.serialize(e),e.serializeVector(this.secondary_signer_addresses)}static load(e){let s=o.deserialize(e),a=e.deserializeVector(t);return new i(s,a)}},y=class i extends c{constructor(e,s,a){super();this.raw_txn=e,this.secondary_signer_addresses=s,this.fee_payer_address=a}serialize(e){e.serializeU32AsUleb128(1),this.raw_txn.serialize(e),e.serializeVector(this.secondary_signer_addresses),this.fee_payer_address.serialize(e)}static load(e){let s=o.deserialize(e),a=e.deserializeVector(t),n=t.deserialize(e);return new i(s,a,n)}};export{o as a,c as b,p as c,y as d};
//# sourceMappingURL=chunk-YVSIS6BA.mjs.map