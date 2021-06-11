FROM node as build

ARG REACT_APP_SERVICES_HOST=/services/m

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install
COPY . .
RUN yarn build


FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
