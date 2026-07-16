# devtools.germaniii.com

Collection of developer tools — converters, formatters, generators, and more.

## Developing

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
npm run preview
```

## Docker

A production image is built using `Dockerfile.prod`:

```bash
docker build -f Dockerfile.prod -t devtools.germaniii.com .
```

## CI

On push to `master` or a `v*` tag, [GitHub Actions](.github/workflows/docker.yml) builds and pushes the image to `ghcr.io/germaniii-com/devtools.germaniii.com`. Pull requests are built without push to validate the Dockerfile.
