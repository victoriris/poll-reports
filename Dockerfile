FROM node:10-alpine

WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm install -g yarn
RUN yarn
COPY . .

# Build for frontend
# RUN cd /usr/src/app/reporting/dashboard-app && yarn build

EXPOSE 4000
CMD [ "yarn", "start" ]