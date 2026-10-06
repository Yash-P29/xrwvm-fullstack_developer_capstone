# Cars Dealership Capstone - Submission Checklist

The application code and routes are implemented. Evidence that depends on running the application must be captured from your own environment; this file intentionally does not fabricate terminal output, screenshots, or deployment URLs.

## API evidence

Run Django on port 8000 and the Node API on port 3030.

### Django server
```bash
cd server
python manage.py migrate
python manage.py runserver
```
Save the running-server terminal output as `django_server`.

### Login
First create a Django user:
```bash
cd server
python manage.py createsuperuser
```
Then use:
```bash
curl -X POST http://127.0.0.1:8000/djangoapp/login   -H "Content-Type: application/json"   -d '{"userName":"YOUR_USERNAME","password":"YOUR_PASSWORD"}'
```
Save the real response as `loginuser`.

### Logout
```bash
curl -X GET http://127.0.0.1:8000/djangoapp/logout
```
Save the real response as `logoutuser`.

### Dealer reviews
```bash
curl http://127.0.0.1:8000/djangoapp/reviews/dealer/1
```
Save as `getdealerreviews`.

### All dealers
```bash
curl http://127.0.0.1:8000/djangoapp/get_dealers
```
Save as `getalldealers`.

### Dealer by ID
```bash
curl http://127.0.0.1:8000/djangoapp/dealer/1
```
Save as `getdealerbyid`.

### Kansas dealers
```bash
curl http://127.0.0.1:8000/djangoapp/get_dealers/Kansas
```
Save as `getdealersbyState`.

### Car makes/models
```bash
curl http://127.0.0.1:8000/djangoapp/get_cars
```
Save the real output for the car-make/model task.

### Sentiment
Start the Flask service on port 5050 and run:
```bash
curl http://127.0.0.1:5050/analyze/Fantastic%20services
```
Save as `analyzereview`.

## Screenshots

Capture these from the running application:
- `admin_login.png`
- `admin_logout.png`
- `get_dealers.png`
- `get_dealers_loggedin`
- `dealersbystate.png`
- `dealer_id_reviews`
- `dealership_review_submission`
- `added_review`
- `deployed_landingpage`
- `deployed_loggedin`
- `deployed_dealer_detail`
- `deployed_add_review`

For screenshots that require an endpoint to be visible, keep the browser address bar visible.

## CI/CD

The repository includes `.github/workflows/ci.yml`. After pushing it to GitHub, capture the successful Actions workflow as `CICD`.

## Deployment

Build and deploy the Django image using the course's IBM Cloud Code Engine / Kubernetes workflow. Record the actual resulting public URL as `deploymentURL`. Do not submit a placeholder URL.
