// Copyright 2011 Mark Cavage, Inc.  All rights reserved.
'use strict';

const test = require('tape').test;

////////////////////
// Globals

let ExtensibleFilter;
let filters;

////////////////////
// Tests

test('load library', (t) => {
  filters = require('../../lib/index').filters;
  t.ok(filters);
  ExtensibleFilter = filters.ExtensibleFilter;
  t.ok(ExtensibleFilter);
  t.end();
});

test('Construct no args', (t) => {
  const f = new ExtensibleFilter();
  t.ok(f);
  t.end();
});

test('Construct args', (t) => {
  const f = new ExtensibleFilter({
    matchType: 'foo',
    value: 'bar'
  });
  t.ok(f);
  t.equal(f.matchType, 'foo');
  t.equal(f.value, 'bar');
  t.equal(f.toString(), '(foo:=bar)');
  t.end();
});

test('parse RFC example 1', (t) => {
  const f = filters.parseString('(cn:caseExactMatch:=Fred Flintstone)');
  t.ok(f);
  t.equal(f.matchType, 'cn');
  t.equal(f.matchingRule, 'caseExactMatch');
  t.equal(f.matchValue, 'Fred Flintstone');
  t.notOk(f.dnAttributes);
  t.end();
});

test('parse RFC example 2', (t) => {
  const f = filters.parseString('(cn:=Betty Rubble)');
  t.ok(f);
  t.equal(f.matchType, 'cn');
  t.equal(f.matchValue, 'Betty Rubble');
  t.notOk(f.dnAttributes);
  t.notOk(f.matchingRule);
  t.end();
});

test('parse RFC example 3', (t) => {
  const f = filters.parseString('(sn:dn:2.4.6.8.10:=Barney Rubble)');
  t.ok(f);
  t.equal(f.matchType, 'sn');
  t.equal(f.matchingRule, '2.4.6.8.10');
  t.equal(f.matchValue, 'Barney Rubble');
  t.ok(f.dnAttributes);
  t.end();
});

test('parse RFC example 3', (t) => {
  const f = filters.parseString('(o:dn:=Ace Industry)');
  t.ok(f);
  t.equal(f.matchType, 'o');
  t.notOk(f.matchingRule);
  t.equal(f.matchValue, 'Ace Industry');
  t.ok(f.dnAttributes);
  t.end();
});

test('parse RFC example 4', (t) => {
  const f = filters.parseString('(:1.2.3:=Wilma Flintstone)');
  t.ok(f);
  t.notOk(f.matchType);
  t.equal(f.matchingRule, '1.2.3');
  t.equal(f.matchValue, 'Wilma Flintstone');
  t.notOk(f.dnAttributes);
  t.end();
});

test('parse RFC example 5', (t) => {
  const f = filters.parseString('(:DN:2.4.6.8.10:=Dino)');
  t.ok(f);
  t.notOk(f.matchType);
  t.equal(f.matchingRule, '2.4.6.8.10');
  t.equal(f.matchValue, 'Dino');
  t.ok(f.dnAttributes);
  t.end();
});
