import chalk from 'chalk';

export async function measure<T>(label: string, fn: () => Promise<T>, indent = 0): Promise<T> {
  const pad = ' '.repeat(indent);
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  const duration = (end - start).toFixed(2);
  console.log(`${pad}${chalk.green('✔')} ${chalk.cyan(label)} ${chalk.gray(`(${duration}ms)`)}`);

  return result;
}
