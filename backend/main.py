from contextlib import asynccontextmanager
from datetime import timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

# Centralized database imports
from database import create_db_and_tables, get_session, engine

# Model and Auth imports
from database_models import User, UserCreate, UserRead, UserLogin, Token, LoginResponse
from routes.auth import get_password_hash, verify_password, create_access_token

# Route Imports
from routes.products import router as products_router
from routes.videos import router as videos_router
from routes.infographics import router as infographics_router
from routes.fundraising import router as fundraising_router
from routes.orders import router as orders_router
from routes.users import router as users_router 

ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_initial_admin(session: Session):
    """Checks for users and creates an initial admin if none exist."""
    existing_users = session.exec(select(User)).first()
    if not existing_users:
        print("--- Creating initial Admin user (admin@weaving.com / adminpass) ---")
        admin_user = User(
            name="Admin User",
            email="admin@weaving.com",
            is_admin=True,
            hashed_password=get_password_hash("adminpass"),
            address="Cordillera HQ",
        )
        session.add(admin_user)
        session.commit()
        print("--- Initial Admin created successfully. ---")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    print("Initializing database...")
    create_db_and_tables()
    
    # Create a session specifically for the startup event
    with Session(engine) as session:
        create_initial_admin(session)
    
    yield
    print("Application shutting down...")

app = FastAPI(
    title="Cordillera Weaving API",
    version="1.0.0",
    description="Backend API for managing weaving products, stories, and community users.",
    lifespan=lifespan
)

origins = ["http://localhost:4000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include Routers ---
app.include_router(products_router)
app.include_router(videos_router)
app.include_router(infographics_router)
app.include_router(fundraising_router)
app.include_router(orders_router)
app.include_router(users_router)

# --- Authentication Endpoints ---

@app.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED, tags=["Auth"])
def register_user(user_in: UserCreate, session: Session = Depends(get_session)):
    """Registers a new Customer user."""
    existing_user = session.exec(select(User).where(User.email == user_in.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    hashed_password = get_password_hash(user_in.password)
    db_user = User(
        name=user_in.name,
        email=user_in.email,
        address=user_in.address,
        shipping_info=user_in.shipping_info,
        hashed_password=hashed_password,
        is_admin=False  # New registrations are never admins
    )
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@app.post("/login", response_model=LoginResponse, tags=["Auth"])
def login_for_access_token(login_data: UserLogin, session: Session = Depends(get_session)):
    """Authenticates user and returns a JWT access token."""
    user = session.exec(select(User).where(User.email == login_data.email)).first()
    
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "is_admin": user.is_admin, "user_id": user.id},
        expires_delta=access_token_expires
    )
    
    # Ensure user.id is present (narrow Optional[int] -> int for the type checker)
    assert user.id is not None, "User ID missing"
    
    return LoginResponse(
        access_token=access_token, 
        token_type="bearer",
        user_id=user.id,
        is_admin=user.is_admin,
    )

