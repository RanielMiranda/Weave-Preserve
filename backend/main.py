import os
from contextlib import asynccontextmanager
from datetime import timedelta

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, create_engine, SQLModel, select

# UPDATED IMPORT PATH
from database_models import User, UserCreate, UserRead, UserLogin, Token
from auth import get_password_hash, verify_password, create_access_token

# --- Database Setup ---

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}" 

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token expiration time in minutes

# Create the SQLModel engine
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    """Initializes the database and creates all tables defined in SQLModel."""
    SQLModel.metadata.create_all(engine)
    
    # Optional: Create an initial admin user if the table is empty
    with Session(engine) as session:
        # Check if any users exist
        existing_users = session.exec(select(User)).first()
        
        if not existing_users:
            print("--- Creating initial Admin user (admin@weaving.com / adminpass) ---")
            
            # Create a default admin user
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


# Context manager for application lifecycle events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Application startup event
    print("Initializing database...")
    create_db_and_tables()
    yield
    # Application shutdown event (optional)
    print("Application shutting down...")


# --- FastAPI Application Initialization ---

app = FastAPI(
    title="Cordillera Weaving API",
    version="1.0.0",
    description="Backend API for managing weaving products, stories, and community users.",
    lifespan=lifespan
)

# --- CORS Configuration (Crucial for React/Frontend communication) ---
origins = [
    "http://localhost:4000", # Update this if your React app uses a different port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Endpoints ---

@app.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED, tags=["Auth"])
def register_user(*, session: Session = Depends(lambda: Session(engine)), user_in: UserCreate):
    """
    Registers a new Customer user.
    """
    # 1. Check if user already exists
    existing_user = session.exec(select(User).where(User.email == user_in.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    # 2. Hash password and create user object
    hashed_password = get_password_hash(user_in.password)
    
    # By default, new users are NOT admins (is_admin=False)
    db_user = User(
        name=user_in.name,
        email=user_in.email,
        address=user_in.address,
        shipping_info=user_in.shipping_info,
        hashed_password=hashed_password,
        is_admin=False # Enforce that new registrations are not admins
    )
    
    # 3. Save to database
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    
    return db_user

@app.post("/login", response_model=Token, tags=["Auth"])
def login_for_access_token(*, session: Session = Depends(lambda: Session(engine)), login_data: UserLogin):
    """
    Authenticates user and returns an access token (JWT).
    """
    # 1. Retrieve user by email
    user = session.exec(select(User).where(User.email == login_data.email)).first()
    
    if not user or not verify_password(login_data.password, user.hashed_password):
        # 2. Authentication failed (generic message for security)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 3. Authentication successful, create token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Subject ('sub') and admin status are included in the token payload
    access_token = create_access_token(
        data={"sub": user.email, "is_admin": user.is_admin},
        expires_delta=access_token_expires
    )
    
    # 4. Return token
    return Token(access_token=access_token, token_type="bearer")
