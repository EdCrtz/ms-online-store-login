FROM --platform=linux/amd64 node:18
# docker build -t  gcr.io/vibrant-ring-376116/ms-online-login:v.1.1 .
# docker push gcr.io/vibrant-ring-376116/ms-online-login:v.1.1    

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
ENV DATABASE_URL mongodb+srv://syslalo:fk4w94XGjUFVZ3T9@rustcluster.3flwh.mongodb.net/onlinestoredb?retryWrites=true&w=majority
ENV PORT_MS_LOGIN 4000
ENV IP_MS_LOGIN 0.0.0.0

# Creates a "dist" folder with the production build
RUN npm run build
RUN npx prisma generate
# Start the server using the production build
CMD [ "node", "dist/main.js" ]