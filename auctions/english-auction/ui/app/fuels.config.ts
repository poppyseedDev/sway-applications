import { createConfig } from 'fuels';

export default createConfig({
  contracts: [
        '../../project/contracts/auction-contract',
  ],
  output: './src/sway-api',
});

/**
 * Check the docs:
 * https://fuellabs.github.io/fuels-ts/guide/cli/config-file
 */
