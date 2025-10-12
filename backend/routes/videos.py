from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from routes.auth import get_current_admin_user
from database_models import Video, VideoCreate, VideoRead
from database import get_session

router = APIRouter(prefix="/videos", tags=["Videos"])

@router.post("/", response_model=VideoRead)
def create_video(
    video: VideoCreate, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_admin_user)
):
    new_video = Video.from_orm(video)
    session.add(new_video)
    session.commit()
    session.refresh(new_video)
    return new_video

@router.get("/", response_model=list[VideoRead])
def list_videos(session: Session = Depends(get_session)):
    return session.exec(select(Video)).all()

@router.delete("/{video_id}")
def delete_video(
    video_id: int, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_admin_user)
):
    video = session.get(Video, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    session.delete(video)
    session.commit()
    return {"message": "Video deleted"}
