// math.test.js - Pruebas unitarias con Jest

const {
  sum,
  subtract,
  multiply,
  divide,
} = require("../../src/backend/test_ci.js");

test("suma 1 + 2 para obtener 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("resta 5 - 2 para obtener 3", () => {
  expect(subtract(5, 2)).toBe(3);
});

test("multiplica 3 * 4 para obtener 12", () => {
  expect(multiply(3, 4)).toBe(12);
});

test("divide 10 / 2 para obtener 5", () => {
  expect(divide(10, 2)).toBe(5);
});

test("lanzar error al dividir por cero", () => {
  expect(() => divide(10, 0)).toThrow("No se puede dividir por cero");
});
