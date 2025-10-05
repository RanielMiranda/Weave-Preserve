from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from pydantic import EmailStr

# Base model for creating or updating a user (used in API requests)
class UserBase(SQLModel):
    # Email is used as the unique identifier for login
    email: EmailStr = Field(unique=True, index=True)
    name: str
    
    # Customer specific fields from UML
    address: Optional[str] = None
    shipping_info: Optional[str] = None # Can store a JSON string or descriptive text
    
    # Role flag
    is_admin: bool = False

# Model for registration requests (includes plain password)
class UserCreate(UserBase):
    password: str

# Model for response (omits the hashed password)
class UserRead(UserBase):
    id: int
    
# Model for login requests
class UserLogin(SQLModel):
    email: str
    password: str

# Database table model
class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Stored, hashed password (MUST NOT be included in responses)
    hashed_password: str

# Token models for JWT
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"
    
class TokenData(SQLModel):
    email: Optional[str] = None
    is_admin: bool = False
