FROM python:3.10-slim

WORKDIR /app

COPY requirement.txt .
RUN pip install -r requirement.txt

COPY . .

EXPOSE 9000
CMD ["uvicorn",  "app:app", "--host", "0.0.0.0", "--port", "9000"]
