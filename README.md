# NestJS Service Template

Opinionated template for new services based on NestJS with the Best Practices and Ready for Production (YMMV\*)

## What is including this template?

1. Dockerized service ready for development and production environments with the best practices for docker, providing a
   performant and small image just with the output of the build needed in the production environment.
2. [SWC](https://swc.rs/) for compiling and running the tests of the service. As commented in the own [NestJS docs](https://docs.nestjs.com/recipes/swc) a better typescript compiler than the default.
3. [Fastify](https://fastify.dev/) as Web Framework. By default, [NestJS is using Express](https://docs.nestjs.com/techniques/performance) because is the most widely-used framework for working with NodeJS, however, this does not imply is the one is going to give us the most performance. Also, NestJS is fully compatible with Fastify, so we are providing this integration by default. Check [here](https://github.com/fastify/benchmarks#benchmarks) comparison between different web frameworks.
4. [Husky](https://typicode.github.io/husky/) to ensure we have good quality and conventions while we are developing like:
   - Running the linter over the files that have been changed
   - Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure our commits have a convention.
   - Run the tests automatically.
   - Check if the project does not have type errors with Typescript.
5. Separate tests over production code. By default, NestJS is combining in the same folder, the `src`, the unit tests
   and the code we are developing for production. This is something I personallys don't like so here I am separating this and having a dedicated folder for the unit tests.
6. Testing: [Vitest](https://vitest.dev/) and [supertest](https://github.com/ladjs/supertest) for unit and e2e tests.
7. Performance testing using [k6](https://grafana.com/oss/k6/).
8. Combine unit and e2e test coverage. In the services we may have both type of tests, unit and e2e tests.
9. Custom path aliases, where you can define your own paths (you will be able to use imports like `@shared/logger` instead of `../../../src/shared/logger`).
10. CI/CD using GitHub Actions, helping ensure a good quality of our code and providing useful insights about dependencies, security vulnerabilities and others.

## Development

First, we will need to create a `.env` file, we can create a copy from the example one:

```bash
cp .env.example .env
```

The project is fully dockerized, if we want to start the app in **development mode**, we just need to run:

```bash
docker-compose up -d service-dev
```

This development mode will work in **hot-module-reload** mode, and expose a **debug port**, port `8888`, so later you can connect to it from your editor.

Now, you should be able to start debugging configuring using your IDE. For example, if you are using vscode, you can create a `.vscode/launch.json` file with the following configuration:

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to dockerized service",
      "restart": true,
      "port": 8888,
      "remoteRoot": "/app"
    }
  ]
}
```

Also, if you want to run the **production mode**, you can run:

```bash
docker-compose up -d service-production
```

This service is providing just a health endpoint which you can call to verify the service is working as expected:

```bash
curl --request GET \
  --url http://localhost:3000/health
```

If you want to stop developing, you can stop the service running:

```bash
docker-compose down
```

## Building

```bash
npm run build
```

## Testing

The service provide different scripts for running the tests, to run all of them you can run:

```bash
npm run test
```

If you are interested just in the unit tests, you can run:

```bash
npm run test:unit
```

Or if you want e2e tests, you can execute:

```bash
npm run test:e2e
```

We also have performance testing with [k6](https://k6.io/), if you want to run it via docker, execute:

```bash
docker-compose up k6
```

Or if you want to run it from your machine, execute:

```bash
brew install k6 # For MacOS with homebrew (https://brew.sh) installed
npm run test:perf
```

## Linting

To run the linter you can execute:

```bash
npm run lint
```

And for trying to fix lint issues automatically, you can run:

```bash
npm run lint:fix
```

## Special thanks

Based on the work from [Alberto Hernandez](https://github.com/AlbertHernandez/nestjs-service-template)
