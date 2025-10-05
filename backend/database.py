from sqlmodel import create_engine, Session, SQLModel

# Centralized database configuration
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# The single engine instance for the entire application
engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    """
    Initializes the database by creating all tables defined in SQLModel.
    This function should be called once on application startup.
    """
    SQLModel.metadata.create_all(engine)

def get_session():
    """
    FastAPI dependency that provides a database session for each request.
    Ensures that the session is properly closed after the request is handled.
    """
    with Session(engine) as session:
        yield session
