from app.database.supabase_client import supabase_client

def load_cars():
    try:
        response = (
            supabase_client.table("Car")
            .select("brand, model, price, year, mileage, specifications")
            .execute()
        )
        return response.data
    except Exception as e:
        raise RuntimeError(f"Error loading cars from Supabase: {e}")
        