from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from database_models import Fundraising, FundraisingCreate, FundraisingRead
from auth import get_current_admin_user
from database import get_session

router = APIRouter(prefix="/fundraising", tags=["Fundraising"])

@router.post("/", response_model=FundraisingRead, status_code=status.HTTP_201_CREATED)
def create_campaign(
    fundraising_in: FundraisingCreate, 
    session: Session = Depends(get_session),
    current_user=Depends(get_current_admin_user)
):
    campaign = Fundraising.from_orm(fundraising_in)
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign

@router.get("/", response_model=list[FundraisingRead])
def list_campaigns(session: Session = Depends(get_session)):
    campaigns = session.exec(select(Fundraising)).all()
    return campaigns

@router.put("/{campaign_id}", response_model=FundraisingRead)
def update_campaign(
    campaign_id: int, 
    fundraising_in: FundraisingCreate, 
    session: Session = Depends(get_session),
    current_user=Depends(get_current_admin_user)
):
    campaign = session.get(Fundraising, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    for key, value in fundraising_in.dict().items():
        setattr(campaign, key, value)
        
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign

@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_campaign(
    campaign_id: int, 
    session: Session = Depends(get_session),
    current_user=Depends(get_current_admin_user)
):
    campaign = session.get(Fundraising, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    session.delete(campaign)
    session.commit()
    return
