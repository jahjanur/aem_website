# Deployment

The site runs on a self-hosted server via Docker Compose. Deploys are done by
pushing to `main`, then pulling and rebuilding on the server over SSH.

## Server

- **Host:** `root@46.225.122.244`
- **App directory:** `/opt/aem-website`
- **Docker network:** `aem_net`
- **Container:** `aem_web` (listens on port `3000`)

## Deploy steps

### 1. Push your changes (from your local machine)

```bash
git add -A && git commit -m "your message" && git push origin main
```

### 2. SSH into the server

```bash
ssh root@46.225.122.244
```

### 3. Pull, rebuild, and restart

```bash
cd /opt/aem-website
git pull
docker compose up -d --build
```

### 4. Health check

Verify the container responds inside the Docker network:

```bash
docker run --rm --network aem_net curlimages/curl:latest \
  -s -o /dev/null -w "aem_web/en -> HTTP %{http_code}\n" \
  http://aem_web:3000/en
```

Expect `HTTP 200`.

## Notes

- Always `git push` locally **before** `git pull` on the server, or the server
  won't have your latest changes.
- `--build` forces a fresh image build so code changes take effect.
- `-d` runs the containers detached (in the background).
- To view logs: `docker compose logs -f aem_web`
