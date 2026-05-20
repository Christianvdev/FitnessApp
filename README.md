# FitTrack

A full stack fitness tracking web application built with Django REST Framework and React. Log your workouts by day, track weekly progress, and manage your training sessions from anywhere.

**Live App:** [fitness-app-ten-nu.vercel.app](https://fitness-app-ten-nu.vercel.app/home)  
**API:** [fitnessapp-production-402a.up.railway.app](https://fitnessapp-production-402a.up.railway.app)  
**GitHub:** [github.com/Christianvdev/FitnessApp](https://github.com/Christianvdev/FitnessApp)

---

## Tech Stack

**Backend**
- Python / Django
- Django REST Framework
- Simple JWT (authentication)
- SQLite (development) / Railway (production)
- Gunicorn (production server)

**Frontend**
- React (Vite)
- Axios + interceptors
- React Router DOM
- CSS (custom, no framework)

**Deployment**
- Backend → Railway
- Frontend → Vercel

---

## Features

- User registration and login
- JWT authentication with automatic token refresh
- Log workouts organized by day of the week
- View workouts per day with intensity color coding
- Edit and delete individual workouts
- Weekly stats — total workouts and total sets
- Recently done section showing latest workout
- Empty state with contextual day message
- Protected routes — users only see their own data
- Mobile responsive
- Auto-redirect to login if token expired or missing

---

## Project Structure

```
FitnessApp/
├── Fitness/                    # Django project root
│   ├── accounts/               # User registration + /me/ endpoint
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── tracker/                # Workout tracking
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── workouts/               # Django project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── Procfile
│
└── frontend/                   # React app
    ├── src/
    │   ├── api/
    │   │   └── axios.js        # Axios instance + JWT interceptor + refresh logic
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── WorkoutDay.jsx
    │   │   └── WorkoutLog.jsx
    │   ├── styles/
    │   └── App.jsx
    ├── vercel.json
    └── .env
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- pip
- npm

---

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/Christianvdev/FitnessApp.git
cd FitnessApp/Fitness

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate        # Mac/Linux
.venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create a superuser (optional)
python manage.py createsuperuser

# Start the server
python manage.py runserver
```

Django runs on `http://localhost:8000`

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start the dev server
npm run dev
```

React runs on `http://localhost:5173`

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/` | Login — returns access + refresh tokens |
| POST | `/api/token/refresh/` | Refresh expired access token |

### Accounts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts/users/` | Register a new user |
| GET | `/api/accounts/me/` | Get current logged in user info |

### Workouts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tracker/workout/` | List all workouts for logged in user |
| GET | `/api/tracker/workout/?day=Friday` | Filter workouts by day |
| POST | `/api/tracker/workout/` | Log a new workout |
| PUT | `/api/tracker/workout/{id}/` | Update an existing workout |
| DELETE | `/api/tracker/workout/{id}/` | Delete a workout |

---

## Workout Model

| Field | Type | Options | Description |
|-------|------|---------|-------------|
| exercise | CharField | any string | Name of the exercise |
| weight | IntegerField | any number | Weight used in lbs |
| sets | IntegerField | any number | Number of sets |
| reps | IntegerField | any number | Number of reps |
| intensity | IntegerField | 1, 2, 3 | 1=Easy, 2=Medium, 3=Hard |
| days | IntegerField | 1-7 | 1=Monday through 7=Sunday |
| user | ForeignKey | — | Auto-linked to logged in user |

---

## Authentication Flow

```
Register  →  POST /api/accounts/users/  →  account created
Login     →  POST /api/token/           →  access + refresh tokens returned
                                            tokens saved to localStorage
Request   →  Authorization: Bearer <access_token>
                                            attached automatically via axios interceptor
Token expires  →  interceptor catches 401
               →  POST /api/token/refresh/ with refresh token
               →  new access token saved
               →  original request retried automatically
Logout    →  tokens removed from localStorage  →  redirect to login
```

---

## Security

- Passwords hashed using Django's built-in `create_user()`
- JWT access tokens expire after 60 minutes
- JWT refresh tokens expire after 7 days
- Every endpoint requires authentication (IsAuthenticated)
- get_queryset() filters all data by request.user — users can only access their own data
- perform_create() automatically links new workouts to the logged in user
- CORS configured to only allow requests from the live frontend URL

---

## Environment Variables

**Frontend** — create `.env` inside `frontend/`:
```
VITE_API_URL=http://localhost:8000
```

**Backend (Railway)** — set these in Railway dashboard:
```
SECRET_KEY=your-production-secret-key
DEBUG=False
```
