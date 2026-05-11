# FitTracker

A full stack fitness tracking application built with Django REST Framework and React. Log your workouts, track your progress, and manage your training sessions.

---

## Tech Stack

**Backend**
- Python / Django
- Django REST Framework
- Simple JWT (authentication)
- SQLite (development database)

**Frontend**
- React (Vite)
- Axios
- React Router DOM

---

## Features

- User registration and login
- JWT authentication (access + refresh tokens)
- Log workouts with exercise, weight, sets, reps, and intensity
- View all your workouts on a personal dashboard
- Delete workouts
- Protected routes — users can only see their own data
- Auto-redirect to login if not authenticated

---

## Project Structure

```
Fitness/
├── accounts/               # User registration + auth endpoints
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── tracker/                # Workout tracking
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── workouts/               # Django project config
│   ├── settings.py
│   └── urls.py
│
└── frontend/               # React app
    ├── src/
    │   ├── api/
    │   │   └── axios.js    # Axios instance + JWT interceptor
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── dashboard.jsx
    │   │   └── WorkoutLog.jsx
    │   └── App.jsx
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
git clone https://github.com/yourusername/fittracker.git
cd fittracker

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate        # Mac/Linux
.venv\Scripts\activate           # Windows

# Install dependencies
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers

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
| POST | `/api/token/refresh/` | Refresh access token |

### Accounts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts/users/` | Register a new user |
| GET | `/api/accounts/me/` | Get current user info |

### Workouts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tracker/workout/` | List all workouts for logged in user |
| POST | `/api/tracker/workout/` | Log a new workout |
| DELETE | `/api/tracker/workout/{id}/` | Delete a workout |

---

## Workout Model

| Field | Type | Description |
|-------|------|-------------|
| exercise | CharField | Name of the exercise |
| weight | IntegerField | Weight used in lbs |
| sets | IntegerField | Number of sets |
| reps | IntegerField | Number of reps |
| intensity | IntegerField | 1 = Easy, 2 = Medium, 3 = Hard |
| user | ForeignKey | Linked to the logged in user |

---

## Environment Variables

Create a `.env` file inside the `frontend/` folder:

```
VITE_API_URL=http://localhost:8000
```

---

## Authentication Flow

```
Register  →  POST /api/accounts/users/
Login     →  POST /api/token/  →  returns access + refresh tokens
              tokens saved to localStorage
Request   →  Authorization: Bearer <access_token> (attached automatically)
Logout    →  tokens removed from localStorage
```

---

## Built By

Christian — to improve fullstack development workflows and understanding
