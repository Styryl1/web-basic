import { spawnSync } from 'node:child_process';

const hasCloudCredentials = Boolean(
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID &&
    process.env.TINA_TOKEN &&
    process.env.TINA_PUBLIC_IS_LOCAL !== 'true',
);

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const args = hasCloudCredentials
  ? ['tinacms', 'build']
  : ['tinacms', 'build', '--local', '--skip-cloud-checks'];

if (hasCloudCredentials) {
  console.log('Running Tina Cloud build...');
} else {
  console.log(
    'Tina Cloud credentials not found. Running local Tina build (--local --skip-cloud-checks).',
  );
}

const env = hasCloudCredentials
  ? process.env
  : {
      ...process.env,
      TINA_PUBLIC_IS_LOCAL: 'true',
    };

const result = spawnSync(command, args, {
  stdio: 'inherit',
  env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
