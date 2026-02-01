CREATE EXTENSION IF NOT EXISTS vector;

DROP TABLE IF EXISTS car_vector CASCADE;

CREATE TABLE car_vector (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

                            car_id UUID NOT NULL,
                            chunk_index INTEGER NOT NULL,
                            content TEXT NOT NULL,
                            embedding VECTOR(384),

                            created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                            CONSTRAINT fk_car_vector_car
                                FOREIGN KEY (car_id)
                                    REFERENCES car(id)
                                    ON DELETE CASCADE
);

CREATE INDEX idx_car_vector_car_id
    ON car_vector (car_id);

CREATE UNIQUE INDEX uniq_car_vector_car_chunk
    ON car_vector (car_id, chunk_index);
