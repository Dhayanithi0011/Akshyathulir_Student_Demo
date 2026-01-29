from fastapi import APIRouter, HTTPException
from models import InstitutionSchema
import crud

router = APIRouter()

@router.post("/register")
async def register_institution(payload: InstitutionSchema):
    try:
        # payload.dict() will capture all nested objects and blob strings
        data = payload.dict()
        new_id = await crud.create_institution(data)
        return {"message": "Successfully submitted", "id": new_id}
    except Exception as e:
        # This will help you see the exact error in your terminal
        print(f"Error occurred: {str(e)}") 
        raise HTTPException(status_code=500, detail="Failed to store data")