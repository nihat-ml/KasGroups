export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px; }
        .container { max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; }
        .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Verification</h2>
        <p>Thank you for registering! Please verify your email by clicking the button below:</p>
        <a href="{{verification_link}}" class="button">Verify Email</a>
        <p>If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>`


export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Your Password</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px; }
        .container { max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; }
        .otp { font-size: 24px; font-weight: bold; color: #333; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Use the following OTP to proceed:</p>
        <p class="otp">{{otp_code}}</p>
        <p>If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>`