function o(a,i,e){let r=e.value;return e.value=async function(...t){let[n]=t;if(n.transaction.feePayerAddress&&!n.feePayerAuthenticator)throw new Error("You are submitting a Fee Payer transaction but missing the feePayerAuthenticator");return r.apply(this,t)},e}function u(a,i,e){let r=e.value;return e.value=async function(...t){let[n]=t;if(n.transaction.feePayerAddress&&!n.feePayerPublicKey)throw new Error("You are simulating a Fee Payer transaction but missing the feePayerPublicKey");return r.apply(this,t)},e}export{o as a,u as b};
//# sourceMappingURL=chunk-6EMN3BOV.mjs.map