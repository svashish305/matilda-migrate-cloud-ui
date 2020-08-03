### STAGE 1: Setup ###
FROM nginx:1.13.3-alpine
#RUN rm -rf /etc/nginx/nginx.conf
## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY distcli /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]