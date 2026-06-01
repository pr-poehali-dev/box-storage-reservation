import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на бронирование на почту владельца"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))

    name = body.get('name', '—')
    phone = body.get('phone', '—')
    email = body.get('email', '—')
    tariff = body.get('tariff', '—')
    date = body.get('date', '—')
    comment = body.get('comment', '—')

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'Nikita_sviridov3110@mail.ru'
    to_email = 'Nikita_sviridov3110@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на хранение — {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0a1628; padding: 24px; text-align: center;">
        <h1 style="color: #F59E0B; margin: 0; font-size: 24px; letter-spacing: 2px;">ХЛАМ НАМ</h1>
        <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">Новая заявка на бронирование</p>
      </div>
      <div style="padding: 32px; background: #f9fafb; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 140px;">Имя</td><td style="padding: 10px 0; color: #111827; font-weight: 600;">{name}</td></tr>
          <tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Телефон</td><td style="padding: 10px 0; color: #111827; font-weight: 600;">{phone}</td></tr>
          <tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 10px 0; color: #111827; font-weight: 600;">{email}</td></tr>
          <tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Тариф</td><td style="padding: 10px 0; color: #111827; font-weight: 600;">{tariff}</td></tr>
          <tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Дата начала</td><td style="padding: 10px 0; color: #111827; font-weight: 600;">{date}</td></tr>
          <tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Комментарий</td><td style="padding: 10px 0; color: #111827;">{comment}</td></tr>
        </table>
      </div>
      <div style="padding: 16px 32px; background: #0a1628; text-align: center;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">Хлам Нам · Тула</p>
      </div>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
