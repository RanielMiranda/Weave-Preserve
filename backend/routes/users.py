from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List, Optional

# Import necessary models and dependencies
from database_models import User, UserCreate, UserRead, UserLogin, UserBase
from routes.auth import get_current_admin_user, get_password_hash, get_current_user
from database import get_session

router = APIRouter(prefix="/users", tags=["Users"])

# --- Helper function for password hashing on update ---
def update_user_password(db_user: User, user_in: UserBase):
    """Hashes and sets the password if provided in the update data."""
    if hasattr(user_in, 'password') and user_in.password:
        db_user.hashed_password = get_password_hash(user_in.password)
    
    # Remove password attribute from the dict to avoid setting it as a plain text field
    data_dict = user_in.model_dump(exclude_unset=True)
    if 'password' in data_dict:
        del data_dict['password']
    
    return data_dict

# 1. READ (List All Users)
@router.get("/", response_model=List[UserRead])
def list_users(
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user) # Protect this endpoint for admins only
):
    """Lists all users (Admin only)."""
    # Exclude the initial admin user from the list if desired, or just return all
    return session.exec(select(User)).all()


# 2. CREATE (Add New User)
@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(
    user_in: UserCreate,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """Creates a new user (Admin only)."""
    existing_user = session.exec(select(User).where(User.email == user_in.email)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    db_user = User.model_validate(user_in, update={'hashed_password': get_password_hash(user_in.password)})
    db_user.is_admin = user_in.is_admin # Explicitly set is_admin from input

    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


# 3. UPDATE (Edit User)
@router.put("/{user_id}", response_model=UserRead)
def update_user(
    user_id: int,
    user_in: UserCreate, # Reusing UserCreate for update input
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """Updates an existing user (Admin only)."""
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update fields from the input model
    update_data = user_in.model_dump(exclude_unset=True)
    
    # Handle password update if included
    if 'password' in update_data and update_data['password']:
         db_user.hashed_password = get_password_hash(update_data.pop('password'))
         
    # Apply remaining updates
    db_user.sqlmodel_update(update_data)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


# 4. DELETE (Delete User)
@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def delete_user(
    user_id: int,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin_user)
):
    """Deletes a user (Admin only)."""
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Prevent admin from deleting themselves (optional security measure)
    if admin.id == user_id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account")

    session.delete(db_user)
    session.commit()
    return {"detail": f"User with ID {user_id} deleted"}