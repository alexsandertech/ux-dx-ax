import test from "node:test";
import assert from "node:assert/strict";
import { calculateTotalInCents } from "../src/pricing.js";

test("calcula em centavos inteiros", () => {
  assert.equal(calculateTotalInCents(1499, 2, 10), 2698);
  assert.equal(Number.isInteger(calculateTotalInCents(1499, 2, 10)), true);
});

test("preserva o preço sem desconto", () => {
  assert.equal(calculateTotalInCents(2500, 3), 7500);
});

test("rejeita entradas monetárias inválidas", () => {
  assert.throws(() => calculateTotalInCents(-1, 1), /unitPriceInCents/);
  assert.throws(() => calculateTotalInCents(10.5, 1), /unitPriceInCents/);
});

test("rejeita quantidade inválida", () => {
  assert.throws(() => calculateTotalInCents(100, 0), /quantity/);
  assert.throws(() => calculateTotalInCents(100, 1.5), /quantity/);
});

test("rejeita desconto fora do domínio", () => {
  assert.throws(() => calculateTotalInCents(100, 1, -1), /discountPercent/);
  assert.throws(() => calculateTotalInCents(100, 1, 101), /discountPercent/);
});

