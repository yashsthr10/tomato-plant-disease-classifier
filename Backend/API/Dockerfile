FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN pip install -r requirement.txt

EXPOSE 9000
CMD ["uvicorn",  "app:app", "--host", "0.0.0.0", "--port", "9000", "--reload"]
