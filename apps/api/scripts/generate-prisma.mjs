import { spawnSync } from 'node:child_process';
import process from 'node:process';

/**
 * Runs `prisma generate` outside the package-manager "postinstall" context.
 *
 * Prisma's `getDefaultOutdir()` has a postinstall-specific branch that writes
* the generated client to `<INIT_CWD>/node_modules/.prisma/client`. Under
 * pnpm that directory is invisible to the runtime: `@prisma/client`
 * resolves its generated client from the pnpm virtual store
 * (`<store>/.../node_modules/.prisma/client`) and falls back to a stub that
 * throws "@prisma/client did not initialize yet". Unsetting the postinstall
 * markers makes Prisma resolve the output to the virtual-store location on
 * every platform (see `prisma generate` output for the resolved path).
 */
delete process.env.INIT_CWD;
delete process.env.npm_lifecycle_event;

const result = spawnSync('prisma', ['generate'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
});

process.exit(result.status ?? 1);