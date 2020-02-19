import { App } from './app';

async function main() {
  const app = new App(process.env.PORT || 3000);
  await app.listen();
}

main();
