# main.py

from contextlib import asynccontextmanager
from datetime import timedelta
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

# Centralized database imports
from database import create_db_and_tables, get_session, engine

from database_models import User, UserCreate, UserRead, UserLogin, Token, LoginResponse, Fundraising, Product
from routes.auth import get_password_hash, verify_password, create_access_token

# Route Imports
from routes.products import router as products_router
from routes.videos import router as videos_router
from routes.infographics import router as infographics_router
from routes.fundraising import router as fundraising_router
from routes.orders import router as orders_router
from routes.users import router as users_router 
from routes.donations import router as donations_router

ACCESS_TOKEN_EXPIRE_MINUTES = 30

# --- INITIAL DATA DEFINITIONS ---

INITIAL_CAMPAIGN_DATA = [
    {
        "title": "Emergency Support for Weaver Families",
        "description": "Help provide immediate assistance to weaver families affected by recent natural disasters in the region.",
        "collected_amount": 125000, 
        "goal_amount": 200000,
        "supporters": 89,
        "days_left": 15,
        "image": "https://www.lakwatsero.com/wp-content/uploads/2021/11/Cordillera-Weaves-06.jpg",
        "is_urgent": True
    },
    {
        "title": "Traditional Loom Restoration Project",
        "description": "Restore and maintain traditional looms to ensure the continuation of authentic weaving techniques.",
        "collected_amount": 85000,
        "goal_amount": 150000,
        "supporters": 67,
        "days_left": 28,
        "image": "https://www.textileschool.com/wp-content/uploads/2025/03/traditional-weavers-working-on-handlooms-in-a-rural-setting.jpg",
        "is_urgent": False
    },
    {
        "title": "Youth Weaving Education Program",
        "description": "Fund educational programs to teach traditional weaving skills to the next generation of artisans.",
        "collected_amount": 45000,
        "goal_amount": 100000,
        "supporters": 34,
        "days_left": 42,
        "image": "https://www.sapiens.org/app/uploads/2020/08/06_Paulette.Crespillo-Cuison_compressed.jpg",
        "is_urgent": False
    }
]

INITIAL_PRODUCT_DATA = [
    {
        "name": "Cordillera Wall Hanging",
        "price": 595.00,
        "description": "Handwoven Wall Decor handmade by our Baguio Locals.",
        "image": "https://files.catbox.moe/yaap40.jpg",
        "is_archived": False
    },
    {
        "name": "Inabel Super Brocade Twin Blanket",
        "price": 8107.81,
        "description": "Inabel, sometimes referred to as Abel Iloco or simply Abel, is a weaving tradition native to the Ilocano people of Northern Luzon in the Philippines. The textile it produces is sought after in the fashion and interior design industries due to its softness, durability, suitability in tropical climates, and for its austere design patterns.",
        "image": "https://files.catbox.moe/wnw7it.webp",
        "is_archived": False
    },
    {
        "name": "Ikat Weave on Bamboo Table Runner - Red",
        "price": 2313.62,
        "description": "These ikat weave bamboo table runners were handcrafted by independent Balinese artisans. Ikat dyeing is a traditional technique that has been passed down through generations. Add these trendy runners to your table for a pop of colour. (Specifications: Handcrafted in Bali, Cotton weave on bamboo, 180 CM L)",
        "image": "https://files.catbox.moe/hvwfrc.webp",
        "is_archived": False
    },
    {
        "name": "VMWI1 - Kalinga Infinity Scarf",
        "price": 3600,
        "description": "From Makabayan Wear, this is a more modern scarf design using traditional fabric hand woven by the renowned indigenous weavers of kalinga, Philipipnes",
        "image": "https://files.catbox.moe/wnfxbd.png"
    }
]

# --- INITIALIZATION FUNCTIONS ---

def create_initial_admin(session: Session):
    """Checks for users and creates an initial admin if none exist."""
    existing_users = session.exec(select(User)).first()
    if not existing_users:
        admin_user = User(
            name="Admin User",
            email="admin@weaving.com",
            is_admin=True,
            hashed_password=get_password_hash("adminpass"),
            address="Cordillera HQ",
        )
        session.add(admin_user)
        session.commit()
        print("Initial Admin created.")

    def create_initial_products(session: Session):
        """Inserts initial product data if the products table is empty."""
        existing_products = session.exec(select(Product)).first()
        if not existing_products:
            print("Inserting initial product data...")
            for data in INITIAL_PRODUCT_DATA:
                product = Product(**data)
                session.add(product)
            session.commit()
            print(f"Successfully inserted {len(INITIAL_PRODUCT_DATA)} products.")

def create_initial_campaigns(session: Session):
    """Inserts initial campaign data if the campaigns table is empty."""
    existing_campaigns = session.exec(select(Fundraising)).first() 
    if not existing_campaigns:
        print("Inserting initial campaign data...")
        for data in INITIAL_CAMPAIGN_DATA:
            # Explicitly cast collected_amount/goal_amount to float if not already done
            campaign = Fundraising(**data) 
            session.add(campaign)
        session.commit()
        print(f"Successfully inserted {len(INITIAL_CAMPAIGN_DATA)} campaigns.")

def create_initial_products(session: Session):
    """Inserts initial product data if the products table is empty."""
    existing_products = session.exec(select(Product)).first()
    if not existing_products:
        print("Inserting initial product data...")
        for data in INITIAL_PRODUCT_DATA:
            product = Product(**data)
            session.add(product)
        session.commit()
        print(f"Successfully inserted {len(INITIAL_PRODUCT_DATA)} products.")

# --- LIFESPAN CONTEXT MANAGER ---

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    print("Initializing database...")
    create_db_and_tables()
    
    # Create a session specifically for the startup event
    with Session(engine) as session:
        create_initial_admin(session)
        create_initial_campaigns(session)
        create_initial_products(session) # Call the new product initialization
    
    yield
    print("Application shutting down...")

# --- FASTAPI APP SETUP ---

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
app.include_router(donations_router)

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