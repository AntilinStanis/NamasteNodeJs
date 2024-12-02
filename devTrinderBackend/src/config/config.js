const CONFIG={};

CONFIG.FORGET_PASSWORD_MAIL = {
    subject : "Here is your OTP",
    text :"OTP",
    html : '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Forgot Password - OTP</title> <style> body { font-family: Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; } .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 25px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); } .header { text-align: center; background-color: #4f46e5; padding: 15px; border-radius: 8px 8px 0 0; } .header h1 { font-size: 26px; color: #ffffff; margin: 0; } .content { margin: 20px 0; line-height: 1.8; color: #374151; } .content p { margin: 12px 0; } .otp { font-size: 24px; font-weight: bold; color: #4f46e5; text-align: center; margin: 25px 0; padding: 10px; background-color: #f3f4f6; border: 1px dashed #4f46e5; display: inline-block; } .footer { text-align: center; font-size: 14px; color: #9ca3af; margin-top: 25px; padding-top: 10px; border-top: 1px solid #e5e7eb; } .footer a { color: #4f46e5; text-decoration: none; } </style> </head> <body> <div class="email-container"> <div class="header"> <h1>Password Reset Request</h1> </div> <div class="content"> <p>Hi <strong>${UserName}</strong>,</p> <p>You requested to reset your password. Use the OTP below to reset your password. This OTP is valid for the next <strong>2 minutes</strong>:</p> <div class="otp">${OTP}</div> <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p> </div> <div class="footer"> <p>© 2024 Dev Tinder. All rights reserved.</p> <p>Need help? <a href="mailto:support@yourcompany.com">Contact Support</a></p> </div> </div> </body> </html>'
};

CONFIG.FORGET_PASSWORD_SECRET_KEY = "mysecretkey";

module.exports = CONFIG;