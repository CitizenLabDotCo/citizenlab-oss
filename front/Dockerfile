FROM cypress/browsers:node16.14.0-chrome99-ff97

WORKDIR /front

ADD front/package.json front/package-lock.json ./
ADD front/internals internals

RUN npm install

ADD front/. .

CMD ["npm", "start"]
