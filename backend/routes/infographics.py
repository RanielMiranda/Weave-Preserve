from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from routes.auth import get_current_admin_user
from database_models import Infographic, InfographicCreate, InfographicRead
from database import get_session

router = APIRouter(prefix="/infographics", tags=["Infographics"])

@router.post("/", response_model=InfographicRead)
def create_infographic(
    infographic: InfographicCreate, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_admin_user)
):
    new_infographic = Infographic.from_orm(infographic)
    session.add(new_infographic)
    session.commit()
    session.refresh(new_infographic)
    return new_infographic

@router.get("/", response_model=list[InfographicRead])
def list_infographics(session: Session = Depends(get_session)):
    return session.exec(select(Infographic)).all()

@router.delete("/{infographic_id}")
def delete_infographic(
    infographic_id: int, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_admin_user)
):
    infographic = session.get(Infographic, infographic_id)
    if not infographic:
        raise HTTPException(status_code=404, detail="Infographic not found")
    session.delete(infographic)
    session.commit()
    return {"message": "Infographic deleted"}
