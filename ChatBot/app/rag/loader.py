from app.database.supabase_client import supabase_client

def load_data(table_name: str):
    try:
        response = supabase_client.from_(table_name).select('*').execute()
        return response.data
    except Exception as e:
        raise RuntimeError(f"Error loading data from {table_name}: {e}")
    
load_data("cars")