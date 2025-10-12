from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database_models import Product, ProductCreate, ProductRead
from routes.auth import get_current_admin_user
from database import get_session

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=list[ProductRead])
def list_available_products(session: Session = Depends(get_session)):
    # This filters out any product where is_archived is True
    statement = select(Product).where(Product.is_archived == False) 
    return session.exec(statement).all()

@router.get("/all", response_model=list[ProductRead])
def list_all_products(
    session: Session = Depends(get_session), 
    admin=Depends(get_current_admin_user) # Keep the admin dependency for security
):
    # This returns everything in the table
    return session.exec(select(Product)).all()

@router.post("/", response_model=ProductRead)
def create_product(
    product: ProductCreate,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    db_item = Product.from_orm(product)
    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    product: ProductCreate,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    db_item = session.get(Product, product_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Product not found")

    for key, value in product.dict().items():
        setattr(db_item, key, value)

    session.add(db_item)
    session.commit()
    session.refresh(db_item)
    return db_item

@router.delete("/{product_id}")
def archive_product( # Renamed function for clarity
    product_id: int,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """Archives a product by setting its status and archived flag."""
    db_item = session.get(Product, product_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Product not found")

    db_item.is_archived = True
    db_item.status = "Archived" # Update status field as well
    
    session.add(db_item) # Persist the changes (update)
    session.commit()
    session.refresh(db_item)
    
    return {"detail": "Product archived successfully"}