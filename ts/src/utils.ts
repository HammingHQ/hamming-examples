export async function simulateLatency() {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 1000)
  );
}
