FROM oven/bun:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates libatomic1 \
    && rm -rf /var/lib/apt/lists/*

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN curl -fsSL https://get.pnpm.io/install.sh | SHELL=/bin/bash sh -

WORKDIR /app

CMD ["sh", "-c", "cd apps/api && bun run dev"]
