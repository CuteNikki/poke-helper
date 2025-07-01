import { globby } from 'globby';

export const getFilesFrom = (relativePath: string) => globby([`${relativePath}/**/*{.ts,.js}`], { absolute: true });
