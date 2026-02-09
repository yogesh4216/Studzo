from google import genai
from google.genai import types
from app.config import settings
from typing import List, Optional
import json
import time
from app.utils.gemini_rate_limiter import with_retry, with_cache
from app.utils.analytics import log_ai_usage


class GeminiService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
            self.model_name = "gemini-2.0-flash" 

    @with_retry(max_retries=0)
    @with_cache(ttl_seconds=3600)
    async def _generate_response(self, prompt: str, model_type: str = 'text', image_data: Optional[bytes] = None) -> str:
        start_time = time.time()
        success = False
        print(f"DEBUG: Generating response with google-genai for model_type={model_type}")
        print(f"DEBUG: Prompt length: {len(prompt)}")
        try:
            if model_type == 'vision' and image_data:
                # Vision implementation for google-genai
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=[
                        types.Content(
                            role="user",
                            parts=[
                                types.Part.from_text(text=prompt),
                                types.Part.from_bytes(data=image_data, mime_type="image/jpeg") 
                            ]
                        )
                    ]
                )
            else:
                # Standard text generation
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=[prompt]
                )
            
            print(f"DEBUG: Gemini Response received. text length={len(response.text)}")
            success = True
            return response.text
        except Exception as e:
            print(f"CRITICAL ERROR generating content: {e}")
            import traceback
            traceback.print_exc()
            return "AI Service Unavailable: " + str(e)
        finally:
             latency = time.time() - start_time
             log_ai_usage("AI_Generation", success, latency)

    def _clean_json(self, text: str) -> Any:
        try:
            clean_text = text.replace('```json', '').replace('```', '').strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"DEBUG: JSON Parse Error: {e}")
            # Try to find the first '{' or '[' and last '}' or ']'
            try:
                start_idx = min(text.find('{') if '{' in text else len(text), text.find('[') if '[' in text else len(text))
                end_idx = max(text.rfind('}') if '}' in text else -1, text.rfind(']') if ']' in text else -1)
                if start_idx < end_idx:
                    return json.loads(text[start_idx:end_idx+1])
            except:
                pass
            return None

    async def match_roommates(self, user_profile: dict, candidates: List[dict]) -> List[dict]:
        # detailed matching with compatibility scores
        candidates_json = json.dumps(candidates)
        prompt = f"""
        You are an expert roommate matcher for students.
        
        User Profile:
        {json.dumps(user_profile)}

        Candidates:
        {candidates_json}

        Task:
        Analyze compatibility for each candidate with the user.
        
        Criteria:
        - Lifestyle (Sleep, Cleanliness, Social vs Study)
        - Habits (Smoking, Drinking, Guests)
        - Cultural comfort & Language
        - Budget alignment
        
        Return ONLY valid JSON in this format:
        [
          {{
            "candidate_id": 123,
            "candidate_name": "Full Name",
            "match_score": 85,
            "match_tier": "Perfect/Great/Good/Fair",
            "why_it_works": "Personalized reason...",
            "potential_conflicts": "Specific area of concern...",
            "conversation_starters": ["Topic 1", "Topic 2"]
          }}
        ]
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, list) else []

    async def search_hostels(self, query: str, filters: dict) -> dict:
        prompt = f"""
        You are a hostel recommendation expert for international students.
        
        Search Query: "{query}"
        Filters: {json.dumps(filters)}
        
        Generate 3-5 realistic hostel/housing options near universities.
        
        For each listing provide JSON structure in a "results" array with these fields:
        - name
        - distance (e.g. "5 mins walk")
        - verified (boolean)
        - price (e.g. "$600/mo")
        - type (e.g. "Shared Room")
        - facilities (list of strings)
        - best_for (short tag)
        - pros (list of strings)
        - cons (list of strings)
        
        Also include a "search_summary" string.
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"results": [], "search_summary": "Unable to find listings"}

    async def analyze_lease(self, text: str) -> dict:
        prompt = f"""
        Analyze this rental contract: "{text}"
        Return JSON in this format:
        {{
            "summary": "...",
            "key_terms": [
                {{"term": "...", "explanation": "..."}}
            ],
            "red_flags": [],
            "rating": "Safe/Caution/Risky",
            "recommendation": "..."
        }}
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"summary": "Error analyzing", "rating": "Unknown"}


    async def community_connect(self, user_profile: dict, query: str = "") -> dict:
        prompt = f"""
        You are a community manager for a global student platform.
        ...
        Return JSON structure with a "results" array.
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"results": [], "analysis_summary": "Error fetching groups"}

    async def ask_community(self, community_context: str, question: str) -> dict:
        prompt = f"""
        ...
        Return JSON with "answer", "confidence", "related_topics".
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"answer": "Error", "confidence": "Low"}

    async def find_jobs(self, user_profile: dict, query: str = "") -> dict:
        prompt = f"""
        ...
        Return JSON with results array.
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"results": [], "summary": "Error searching jobs"}

    async def analyze_job_scam(self, text: str, image_data: Optional[bytes] = None) -> dict:
        prompt = f"""
        ...
        Return JSON with "risk_level", "verdict", "explanation".
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"risk_level": "Unknown", "verdict": "Error"}


    async def cultural_guidance(self, home_country: str, host_country: str, university: str, week: int, challenges: str) -> dict:
        prompt = f"""
        ...
        Return valid JSON only.
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"encouragement": "Stay positive!", "key_differences": []}


    async def cultural_discovery(self, home_country: str, host_country: str, city: str, date_range: str) -> dict:
        prompt = f"""
        You are an AI cultural assistant.

        Given:
        - Host Country: {host_country}
        - Host City: {city}
        - Student's Home Country: {home_country}
        - Date Range: {date_range}

        Identify cultural programs, festivals, and community functions in the host country organized by communities from the student's home country.

        For each event:
        - Provide a short description
        - Cultural significance
        - Expected audience
        - Dress code or behavior notes
        - Accessibility for new international students
        - Trust verification (e.g. University group, registered association)

        Also identify active home-country communities.

        Return JSON:
        {{
          "events": [
            {{
              "title": "Event Name",
              "date": "Date/Time",
              "type": "festival/meetup/religious/cultural_show",
              "description": "Short description",
              "location": "Venue",
              "cultural_significance": "Significance",
              "attendees": "Who attends",
              "dress_code": "Dress code",
              "trust_badge": "Organizer type"
            }}
          ],
          "community_summary": "Summary of community activity",
          "active_groups": ["Group 1", "Group 2"]
        }}
        """
        response = await self._generate_response(prompt)
              
        # Parse JSON from response
        try:
            clean_text = response.replace('```json', '').replace('```', '').strip()
            return json.loads(clean_text)
        except:
             return {"events": [], "community_summary": "Unable to fetch events", "active_groups": []}

    async def financial_guidance(self, data: dict) -> dict:
        prompt = f"""
        ...
        Return JSON with comprehensive financial advice.
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"budget_plan": "Error", "cost_saving_tips": []}


    async def analyze_financial_risk(self, text: str) -> dict:
        prompt = f"""
        You are a financial fraud detection expert for students.
        Analyze this text (email, message, job offer) for scam patterns:
        "{text}"

        Identify:
        - Red flags (upfront fees, urgency, bad grammar, too good to be true).
        - Scam type (phishing, employment scam, rental scam).
        - Risk level (Low/Medium/High/Critical).
        - Immediate advice.

        Return JSON:
        {{
            "risk_level": "High/Medium/Low",
            "scam_type": "string",
            "red_flags": ["flag 1", "flag 2"],
            "analysis": "string",
            "safe_alternative": "string"
        }}
        """
        response = await self._generate_response(prompt)
        try:
            return json.loads(response.replace('```json', '').replace('```', '').strip())
        except:
             return {"risk_level": "Unknown", "analysis": response}

    async def community_recommendations(self, data: dict) -> dict:
        prompt = f"""
        ...
        RESPONSE (JSON format only):
        ...
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"recommended_activities": []}


    async def emergency_support(self, input_text: str, language: str = "en") -> dict:
        prompt = f"""
        ...
        Return JSON for emergency support.
        """
        response = await self._generate_response(prompt)
        parsed = self._clean_json(response)
        return parsed if isinstance(parsed, dict) else {"severity": "HIGH", "message_to_user": "Error assessing situation. Contact security."}


    async def chat_stream(self, message: str, history: List[dict] = []):
        try:
            chat = self.client.chats.create(model=self.model_name, history=history)
            response = chat.send_message_stream(message)
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            print(f"Chat Error: {e}")
            yield "I'm having trouble connecting right now. Please try again."

    async def analyze_health_insurance(self, query: str) -> dict:
        prompt = f"""
        You are an expert health insurance advisor for international students in the US.
        Analyze the following query or policy text:
        "{query}"

        Provide structured advice including:
        1. Key benefits mentioned (or missing).
        2. Potential hidden costs (deductibles, copays).
        3. Recommendation (Is this good for a student?).
        4. Actionable tips.

        Return JSON format:
        {{
            "summary": "string",
            "coverage_details": [
                {{"category": "string", "status": "string", "notes": "string"}}
            ],
            "recommendation": "string",
            "tips": "string"
        }}
        """
        
        try:
            response_text = await self._generate_response(prompt)
            # Clean json
            clean_text = response_text.replace('```json', '').replace('```', '').strip()
            return json.loads(clean_text)
        except Exception as e:
            print(f"Error parsing Health Insurance response: {e}")
            return {
                "summary": "Unable to analyze at this time",
                "coverage_details": [],
                "recommendation": "Please try again",
                "tips": ""
            }

gemini_service = GeminiService()
