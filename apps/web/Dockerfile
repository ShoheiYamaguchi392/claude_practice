FROM node:22-slim

ARG USER_UID=1000
ARG USER_GID=1000
RUN groupmod -g ${USER_GID} node \
    && usermod -u ${USER_UID} -g ${USER_GID} node

WORKDIR /app

RUN corepack enable

USER node

CMD ["pnpm", "--dir", "apps/web", "dev"]
