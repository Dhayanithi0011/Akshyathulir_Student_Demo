from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router as InstitutionRouter

app = FastAPI(title="Incubation Center API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes
app.include_router(InstitutionRouter, prefix="/api/institution", tags=["Institution"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)