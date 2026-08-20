export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function fromCents(cents: number): number {
  return Math.round(cents) / 100;
}

/** Splits `totalCents` into `parts` whole-cent shares that sum back exactly to `totalCents`. */
export function splitEvenlyCents(totalCents: number, parts: number): number[] {
  if (parts <= 0) {
    return [];
  }

  const base = Math.floor(totalCents / parts);
  const remainder = totalCents - base * parts;

  return Array.from({ length: parts }, (_, index) =>
    index < remainder ? base + 1 : base,
  );
}

/** Splits `totalCents` across `weights` proportionally, remainder cents going to the largest shares first. */
export function splitProportionallyCents(
  totalCents: number,
  weights: number[],
): number[] {
  if (weights.length === 0) {
    return [];
  }

  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  if (weightSum <= 0) {
    return splitEvenlyCents(totalCents, weights.length);
  }

  const raw = weights.map((weight) => (totalCents * weight) / weightSum);
  const floors = raw.map((value) => Math.floor(value));
  const distributed = floors.reduce((sum, value) => sum + value, 0);
  let remainder = totalCents - distributed;

  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);

  const result = [...floors];
  for (let i = 0; i < order.length && remainder > 0; i += 1) {
    result[order[i].index] += 1;
    remainder -= 1;
  }

  return result;
}
