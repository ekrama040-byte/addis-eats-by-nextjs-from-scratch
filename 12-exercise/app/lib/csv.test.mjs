import test from "node:test";
import assert from "node:assert/strict";
import { escapeCsvValue, toCsv } from "./csv.js";

test("escapes a value containing a comma", () => {
  assert.equal(escapeCsvValue("Addis, Ethiopia"), '"Addis, Ethiopia"');
});

test("escapes and doubles quotation marks", () => {
  assert.equal(
    escapeCsvValue('He said "hello"'),
    '"He said ""hello"""'
  );
});

test("escapes line breaks", () => {
  assert.equal(
    escapeCsvValue("First line\nSecond line"),
    '"First line\nSecond line"'
  );
});

test("exports awkward values as valid CSV fields", () => {
  const csv = toCsv(
    [
      { name: "Addis, Ethiopia", note: 'Customer said "ready"' },
    ],
    [
      { key: "name", label: "Name" },
      { key: "note", label: "Note" },
    ]
  );

  assert.equal(
    csv,
    'Name,Note\r\n"Addis, Ethiopia","Customer said ""ready"""\r\n'
  );
});