from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict

class InstitutionSchema(BaseModel):
    institutionName: str
    institutionType: str
    autonomousStatus: Optional[str] = None
    yearEstablished: int
    naacGrade: str
    officialEmail: str
    universityName: Optional[str] = None
    degrees: List[str]
    departments: List[str]
    personalInfo: Dict
    contacts: Dict
    address: Dict
    socialLinks: Dict
    documents: Optional[Dict[str, str]] = None