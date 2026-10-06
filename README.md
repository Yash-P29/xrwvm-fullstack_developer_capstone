# Cars Dealership Full-Stack Capstone

A responsive full-stack Cars Dealership application for a national US dealership network.

## Technology
- React
- Django
- Node.js / Express
- MongoDB / Mongoose
- Flask sentiment-analysis microservice
- SQLite for Django authentication and car catalog data
- Docker / Kubernetes deployment configuration

## Features
- User registration, login and logout
- Dealer directory with state filtering
- Dealer details and customer reviews
- Sentiment analysis for reviews
- Authenticated review submission
- Car make/model selection
- Django admin for car catalog management
- Responsive About Us and Contact Us pages

## Local development

### 1. MongoDB + Node API
```bash
cd server/database
npm install
node app.js
```

### 2. Sentiment service
```bash
cd server/djangoapp/microservices
pip install -r requirements.txt
python app.py
```

### 3. Django
```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The Django application runs on `http://127.0.0.1:8000`.

### 4. React development server
```bash
cd server/frontend
npm install
npm start
```

For the capstone's integrated deployment, Django serves the static frontend entry point and proxies API requests to the Node and sentiment services through the environment variables in `server/djangoapp/.env`.

## Project name
**Cars Dealership**
