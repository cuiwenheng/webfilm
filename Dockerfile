# This will prepare a xiaochengxu service.

FROM node:9.8.0

MAINTAINER CUI

ENV NAME ELEM

# add more DNS
RUN echo "nameserver 8.8.8.8" >> /etc/resolv.conf
RUN echo "nameserver 114.114.114.114" >> /etc/resolv.conf

EXPOSE 5757

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/server


CMD [ "node", "app" ]

