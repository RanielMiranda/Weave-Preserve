from typing import Optional
from sqlmodel import Field, SQLModel
from pydantic import EmailStr

# This file should only contain the data model definitions.
# The database engine and connection logic have been moved to database.py.

# -----------------------
# USER MODELS
# -----------------------

class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True)
    name: str
    address: Optional[str] = None
    shipping_info: Optional[str] = None
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

class UserLogin(SQLModel):
    email: str
    password: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class LoginResponse(Token):
    user_id: int
    is_admin: bool
    
class TokenData(SQLModel):
    email: Optional[str] = None
    is_admin: bool = False

# -----------------------
# PRODUCT MODELS
# -----------------------

class ProductBase(SQLModel):
    name: str
    price: float
    status: str = "Available"
    description: str | None = None
    image: str | None = None

class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int

# ------------------------------
# VIDEOS MODEL
# ------------------------------

class VideoBase(SQLModel):
    title: str
    description: str
    filepath: str

class Video(VideoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class VideoCreate(VideoBase):
    pass

class VideoRead(VideoBase):
    id: int

# ------------------------------
# INFOGRAPHICS MODEL
# ------------------------------

class InfographicBase(SQLModel):
    title: str
    image_path: str

class Infographic(InfographicBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class InfographicCreate(InfographicBase):
    pass

class InfographicRead(InfographicBase):
    id: int

# ------------------------------
# FUNDRAISING MODELS
# ------------------------------

class FundraisingBase(SQLModel):
    title: str
    goal_amount: float
    description: str | None = None
    status: str = "Active"
    collected_amount: float = 0.0

class Fundraising(FundraisingBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class FundraisingCreate(FundraisingBase):
    pass

class FundraisingRead(FundraisingBase):
    id: int

# ------------------------------
# ORDER MODELS
# ------------------------------

class ShippingInfoBase(SQLModel):
    shipping_type: str
    shipping_cost: float
    shipping_address: str

class ShippingInfo(ShippingInfoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ShippingInfoCreate(ShippingInfoBase):
    pass

class ShippingInfoRead(ShippingInfoBase):
    id: int

class OrderBase(SQLModel):
    customer_id: int
    customer_name: str
    shipping_id: int
    status: str = "Pending"

class Order(OrderBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class OrderCreate(OrderBase):
    pass

class OrderRead(OrderBase):
    id: int

class OrderDetailBase(SQLModel):
    order_id: int
    product_id: int
    product_name: str
    unit_cost: float
    quantity: int

class OrderDetail(OrderDetailBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class OrderDetailCreate(OrderDetailBase):
    pass

class OrderDetailRead(OrderDetailBase):
    id: int

# ------------------------------
# DONATION MODEL
# ------------------------------

class DonationBase(SQLModel):
    campaign_id: int
    title: str
    goal_amount: float
    collected_amount: float = 0.0

class Donation(DonationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_id: int

class DonationCreate(DonationBase):
    customer_id: int

class DonationRead(DonationBase):
    id: int
    customer_id: int

# ------------------------------
# CART MODEL
# ------------------------------

class CartBase(SQLModel):
    customer_id: int
    product_id: int
    quantity: int
    date_added: str | None = None

class Cart(CartBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class CartCreate(CartBase):
    pass

class CartRead(CartBase):
    id: int

# ------------------------------
# PAYMENT MODEL
# ------------------------------

class PaymentBase(SQLModel):
    order_id: int
    amount: float
    payment_method: str

class Payment(PaymentBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class PaymentCreate(PaymentBase):
    pass

class PaymentRead(PaymentBase):
    id: int
