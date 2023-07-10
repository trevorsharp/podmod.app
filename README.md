# podmod.app

Modify any podcast feed with custom filters, artwork, titles, and more!

## Self-Hosted Setup Using Docker

Prerequisites:

- Ensure Docker is set up and running on your machine (https://docs.docker.com/get-docker)

To run this application using Docker:

1. Create the `docker-compose.yml` file as described below
2. Run `docker-compose up -d` in the folder where your `docker-compose.yml` lives
3. Check the logs using `docker-compose logs -f` to see if there are any errors in your configuration
4. Access the UI on port 80

### docker-compose.yml

```
version: '3'
services:
  podmod:
    image: trevorsharp/podmod.app:latest
    container_name: podmod
    restart: unless-stopped
    ports:
      - 80:3000
```

Create a file named `docker-compose.yml` with the contents above.
