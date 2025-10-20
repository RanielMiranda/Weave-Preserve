# routes/donation.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
# Import the necessary models (including Fundraising to update its collected amount)
from database_models import Donation, DonationCreate, DonationRead, Fundraising 
from routes.auth import get_current_user, get_current_admin_user
from database import get_session

router = APIRouter(prefix="/donation", tags=["Donation"])

@router.post("/", response_model=DonationRead, status_code=status.HTTP_201_CREATED)
async def create_donation(
    donation_in: DonationCreate, 
    session: Session = Depends(get_session),
    # Use get_current_user as any logged-in user can donate
    current_user=Depends(get_current_user) 
):

    campaign = session.get(Fundraising, donation_in.campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Fundraising Campaign not found")
        
    if donation_in.amount <= 0:
        raise HTTPException(status_code=400, detail="Donation amount must be positive")
    
    donation_data = donation_in.dict()
    donation_data["customer_id"] = current_user.id 
    donation = Donation.from_orm(donation_data)
    
    campaign.collected_amount += donation.amount
    campaign.supporters += 1
    
    session.add(donation)
    session.add(campaign)
    session.commit()
    session.refresh(donation)
    session.refresh(campaign)
    
    return donation

@router.get("/", response_model=list[DonationRead])
async def list_all_donations(
    session: Session = Depends(get_session),
    current_user=Depends(get_current_admin_user) # Admin only
):
    """Retrieve a list of all donation records (Admin only)."""
    donations = session.exec(select(Donation)).all()
    return donations

@router.get("/user/me", response_model=list[DonationRead])
async def list_my_donations(
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user) # Logged-in user only
):
    """Retrieve a list of donations made by the current user."""
    donations = session.exec(select(Donation).where(Donation.customer_id == current_user.id)).all()
    return donations
    
@router.delete("/{donation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_donation(
    donation_id: int, 
    session: Session = Depends(get_session),
    current_user=Depends(get_current_admin_user) # Admin only
):
    """
    Delete a donation record and reverse its effect on the campaign total (Admin only).
    """
    donation = session.get(Donation, donation_id)
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
        
    # 1. Reverse the collected amount on the campaign
    campaign = session.get(Fundraising, donation.campaign_id)
    if campaign:
        campaign.collected_amount -= donation.amount
        # Ensure collected amount doesn't drop below zero
        if campaign.collected_amount < 0:
             campaign.collected_amount = 0 
        session.add(campaign)
        
    # 2. Delete the donation
    session.delete(donation)
    session.commit()
    return