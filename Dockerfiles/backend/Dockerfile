FROM node:20-slim

COPY ./src/components/part2/db.json db.json

EXPOSE 3001

CMD [ "npx", "json-server", "--host", "0.0.0.0", "--port", "3001", "db.json" ]