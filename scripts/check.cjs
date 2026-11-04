const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
assert(scripts.length > 0, 'Application script exists');
scripts.forEach(([, code]) => new vm.Script(code));
const code = scripts.map(([, source]) => source).join('\n');
const start = code.indexOf('const POLICY_CUES =');
const end = code.indexOf('let policyState=', start);
assert(start >= 0 && end > start, 'Embedded model found');
const policy = vm.runInNewContext(code.slice(start, end) + '\n({policyCalculate, POLICY_MESSAGES});');
const calculate = policy.policyCalculate;
// Independently hand-counted columns: TP, FN, FP, TN, cost (miss = 5, interrupt = 1).
const expected = [
  [4,0,4,0,4], [4,0,3,1,3], [4,0,2,2,2], [3,1,2,2,7],
  [3,1,1,3,6], [2,2,1,3,11], [2,2,0,4,10],
  [2,2,0,4,10], [1,3,0,4,15], [1,3,0,4,15], [0,4,0,4,20]
];
let previousWarnings = 9;
expected.forEach((wanted, threshold) => {
  const result = calculate(threshold);
  assert.deepEqual([result.tp,result.fn,result.fp,result.tn,result.cost], wanted, `Threshold ${threshold}`);
  assert.equal(result.tp + result.fn, 4);
  assert.equal(result.fp + result.tn, 4);
  assert(result.warnings <= previousWarnings);
  assert(result.fp + result.fn > 0, 'No perfect separation in the authored batch');
  previousWarnings = result.warnings;
});
assert.equal(calculate(4).rows.find(row => row.id === 'P3').warn, true);
assert.equal(calculate(4,10,1).cost, 11);
assert.deepEqual(Array.from(calculate(4,10,1).rows, r => r.outcome), Array.from(calculate(4).rows, r => r.outcome));
for (const threshold of [-1, 11, 2.5, NaN]) assert.throws(() => calculate(threshold));
for (const cost of [0, 11, 1.5, NaN]) assert.throws(() => calculate(4, cost, 1));
console.log('PASS: application syntax; 11 hand-calculated threshold cases; totals; monotonicity; boundary; costs; invalid inputs.');
