FROM node:16

WORKDIR /usr/src/workdir
COPY . .
RUN ["npm", "i"]
EXPOSE 3000

ENV REACT_APP_SOCKETAPIBASEURL=https://socket-server-checkers-1222.herokuapp.com
ENV REACT_APP_BASEURL=https://checkers-login-server-12343211.herokuapp.com

CMD ["npm", "start"]