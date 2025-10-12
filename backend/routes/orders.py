from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from database_models import Order, OrderCreate, OrderRead, OrderDetail, OrderDetailCreate
from routes.auth import get_current_admin_user
from database import get_session

router = APIRouter(prefix="/orders", tags=["Orders"])

# CRUD for Orders
@router.post("/", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def create_order(order_in: OrderCreate, session: Session = Depends(get_session)):
    order = Order.from_orm(order_in)
    session.add(order)
    session.commit()
    session.refresh(order)
    return order

@router.get("/", response_model=list[OrderRead])
def list_orders(
    session: Session = Depends(get_session), 
    current_user=Depends(get_current_admin_user)
):
    orders = session.exec(select(Order)).all()
    return orders

@router.put("/{order_id}", response_model=OrderRead)
def update_order(
    order_id: int, 
    order_in: OrderCreate, 
    session: Session = Depends(get_session), 
    current_user=Depends(get_current_admin_user)
):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    for key, value in order_in.dict().items():
        setattr(order, key, value)
        
    session.add(order)
    session.commit()
    session.refresh(order)
    return order

@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(
    order_id: int, 
    session: Session = Depends(get_session), 
    current_user=Depends(get_current_admin_user)
):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    session.delete(order)
    session.commit()
    return

# CRUD for Order Details
@router.post("/{order_id}/details", response_model=OrderDetail)
def add_order_detail(
    order_id: int, 
    detail_in: OrderDetailCreate, 
    session: Session = Depends(get_session)
):
    detail = OrderDetail.from_orm(detail_in)
    # Ensure the detail is associated with the correct order
    detail.order_id = order_id 
    session.add(detail)
    session.commit()
    session.refresh(detail)
    return detail

@router.get("/{order_id}/details", response_model=list[OrderDetail])
def list_order_details(order_id: int, session: Session = Depends(get_session)):
    details = session.exec(select(OrderDetail).where(OrderDetail.order_id == order_id)).all()
    return details
