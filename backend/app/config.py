from typing import List, Union, Any
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "HomeHub Global"
    
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    BACKEND_CORS_ORIGINS: List[str] = []

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)


    POSTGRES_SERVER: str | None = None
    POSTGRES_USER: str | None = None
    POSTGRES_PASSWORD: str | None = None
    POSTGRES_DB: str | None = None
    GEMINI_API_KEY: str = "" # Set via environment variable
    DATABASE_URL: str = "sqlite:///./homehub.db"

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: str | None, values: Any) -> Any:
        if isinstance(v, str):
            return v
        # In Pydantic v2, 'values' in mode='before' isn't fully populated with other fields easily without ValidationInfo
        # Simpler approach: If DATABASE_URL is not set, we return None and let the app fail if needed, 
        # OR we rely on the fact that we can't easily construct it here without complicating imports.
        # However, looking at the previous code, it constructed the URL from components.
        # Let's try to construct it if we can, but safely.
        # Actually, best practice in v2 is to use a computed_field or asking the user to provide the full URL.
        # For this fix, let's keep it simple: Just return v. 
        # If the user provides components in docker-compose (which they do: DATABASE_URL is set in docker-compose.yml),
        # then we don't need to construct it! 
        # The docker-compose.yml sets DATABASE_URL=postgresql://user:password@db:5432/homehub
        # So we can remove this complex validator logic entirely which was likely legacy.
        return v
    
    # Removed duplicate GEMINI_API_KEY

    model_config = {
        "case_sensitive": True,
        "env_file": ".env"
    }

settings = Settings()
