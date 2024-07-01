# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.17
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link frontend/bun.lockb frontend/package.json ./frontend/
RUN cd frontend && bun install --ci

# Copy application code
COPY --link . .

# Change to frontend directory and build the frontend app
RUN cd frontend && bun run build

# Remove all files in frontend except for the dist folder
RUN find frontend -mindepth 1 -maxdepth 1 -type d -not -name dist -exec rm -rf {} \;

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
