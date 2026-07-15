FROM oven/bun:latest

ARG USER_UID=1000
ARG USER_GID=1000

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates libatomic1 \
    && rm -rf /var/lib/apt/lists/* \
    && groupmod -g ${USER_GID} bun \
    && usermod -u ${USER_UID} -g ${USER_GID} bun

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN mkdir -p ${PNPM_HOME} && chown -R bun:bun ${PNPM_HOME}

WORKDIR /app

USER bun

RUN curl -fsSL https://get.pnpm.io/install.sh | SHELL=/bin/bash sh -

CMD ["sh", "-c", "cd apps/api && bun run dev"]
