// Copyright 2011 Mark Cavage, Inc.  All rights reserved.
'use strict';

const test = require('tape').test;

const asn1 = require('asn1');

////////////////////
// Globals

const BerReader = asn1.BerReader;
const BerWriter = asn1.BerWriter;
let ModifyDNResponse;

////////////////////
// Tests

test('load library', (t) => {
  ModifyDNResponse = require('../../lib/index').ModifyDNResponse;
  t.ok(ModifyDNResponse);
  t.end();
});

test('new no args', (t) => {
  t.ok(new ModifyDNResponse());
  t.end();
});

test('new with args', (t) => {
  const res = new ModifyDNResponse({
    messageID: 123,
    status: 0
  });
  t.ok(res);
  t.equal(res.messageID, 123);
  t.equal(res.status, 0);
  t.end();
});

test('parse', (t) => {
  const ber = new BerWriter();
  ber.writeEnumeration(0);
  ber.writeString('cn=root');
  ber.writeString('foo');

  const res = new ModifyDNResponse();
  t.ok(res._parse(new BerReader(ber.buffer)));
  t.equal(res.status, 0);
  t.equal(res.matchedDN, 'cn=root');
  t.equal(res.errorMessage, 'foo');
  t.end();
});

test('toBer', (t) => {
  const res = new ModifyDNResponse({
    messageID: 123,
    status: 3,
    matchedDN: 'cn=root',
    errorMessage: 'foo'
  });
  t.ok(res);

  const ber = new BerReader(res.toBer());
  t.ok(ber);
  t.equal(ber.readSequence(), 0x30);
  t.equal(ber.readInt(), 123);
  t.equal(ber.readSequence(), 0x6d);
  t.equal(ber.readEnumeration(), 3);
  t.equal(ber.readString(), 'cn=root');
  t.equal(ber.readString(), 'foo');

  t.end();
});
