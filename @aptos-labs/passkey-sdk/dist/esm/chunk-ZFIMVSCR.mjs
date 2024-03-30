import{a as h,b as p,c as m}from"./chunk-V6JFR2CB.mjs";import{d as E,f as H,g as K,h as P,i as S,j as f}from"./chunk-LR65XHSF.mjs";import{b as s}from"./chunk-NL72WE3E.mjs";import o from"tweetnacl";var i=class i extends h{constructor(e){super();let t=s.fromHexInput(e);if(t.toUint8Array().length!==i.LENGTH)throw new Error(`PublicKey length should be ${i.LENGTH}`);this.key=t}toUint8Array(){return this.key.toUint8Array()}toString(){return this.key.toString()}verifySignature(e){let{message:t,signature:a}=e,y=s.fromHexInput(t).toUint8Array(),c=a.toUint8Array();return o.sign.detached.verify(y,c,this.key.toUint8Array())}serialize(e){e.serializeBytes(this.key.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new i(t)}static load(e){let t=e.deserializeBytes();return new i(t)}static isPublicKey(e){return e instanceof i}};i.LENGTH=32;var l=i,r=class r extends p{constructor(e){super();let t=s.fromHexInput(e);if(t.toUint8Array().length!==r.LENGTH)throw new Error(`PrivateKey length should be ${r.LENGTH}`);this.signingKeyPair=o.sign.keyPair.fromSeed(t.toUint8Array().slice(0,r.LENGTH))}toUint8Array(){return this.signingKeyPair.secretKey.slice(0,r.LENGTH)}toString(){return s.fromHexInput(this.toUint8Array()).toString()}sign(e){let t=s.fromHexInput(e),a=o.sign.detached(t.toUint8Array(),this.signingKeyPair.secretKey);return new d(a)}serialize(e){e.serializeBytes(this.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new r(t)}static generate(){let e=o.sign.keyPair();return new r(e.secretKey.slice(0,r.LENGTH))}publicKey(){let e=this.signingKeyPair.publicKey;return new l(e)}static fromDerivationPath(e,t){if(!H(e))throw new Error(`Invalid derivation path ${e}`);return r.fromDerivationPathInner(e,f(t))}static fromDerivationPathInner(e,t,a=E){let{key:y,chainCode:c}=K(r.SLIP_0010_SEED,t),x=S(e).map(u=>parseInt(u,10)),{key:z}=x.reduce((u,A)=>P(u,A+a),{key:y,chainCode:c});return new r(z)}static isPrivateKey(e){return e instanceof r}};r.LENGTH=32,r.SLIP_0010_SEED="ed25519 seed";var v=r,n=class n extends m{constructor(e){super();let t=s.fromHexInput(e);if(t.toUint8Array().length!==n.LENGTH)throw new Error(`Signature length should be ${n.LENGTH}`);this.data=t}toUint8Array(){return this.data.toUint8Array()}toString(){return this.data.toString()}serialize(e){e.serializeBytes(this.data.toUint8Array())}static deserialize(e){let t=e.deserializeBytes();return new n(t)}static load(e){let t=e.deserializeBytes();return new n(t)}static isSignature(e){return e instanceof n}};n.LENGTH=64;var d=n;export{l as a,v as b,d as c};
//# sourceMappingURL=chunk-ZFIMVSCR.mjs.map