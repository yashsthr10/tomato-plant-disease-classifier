FROM python:3.9-slim

WORKDIR /app

COPY requirement.txt .
RUN pip install -r requirement.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn",  "FastAPI:app", "--host", "0.0.0.0", "--port", "8000"]
