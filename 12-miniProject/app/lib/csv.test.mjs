import test from "node:test";
import assert from "node:assert/strict";
import { escapeCsvValue, toCsv } from "./csv.js";

test("quotes commas", () => {
  assert.equal(escapeCsvValue("Addis, Ethiopia"), '"Addis, Ethiopia"');
});

test("doubles quotation marks", () => {
  assert.equal(
    escapeCsvValue('Customer said "ready"'),
    '"Customer said ""ready"""'
  );
});

test("quotes newlines", () => {
  assert.equal(
    escapeCsvValue("First line\nSecond line"),
    '"First line\nSecond line"'
  );
});

test("exports awkward values correctly", () => {
  const csv = toCsv(
    [{ name: "Addis, Ethiopia", note: 'Customer said "ready"' }],
    [{ key: "name", label: "Name" }, { key: "note", label: "Note" }]
  );

  assert.equal(
    csv,
    'Name,Note\r\n"Addis, Ethiopia","Customer said ""ready"""\r\n'
  );
});