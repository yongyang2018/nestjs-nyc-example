FROM node:14-alpine
ENV PORT 3000
RUN mkdir -p /app
WORKDIR /app
ADD . /app
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "cov"]