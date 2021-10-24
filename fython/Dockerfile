FROM python:3.9.7-bullseye

WORKDIR /app

COPY requirements.txt .

RUN pip install --requirement requirements.txt

COPY . .

ENTRYPOINT [ "python3" ]

EXPOSE 3060

CMD ["app.py"]
